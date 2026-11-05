-- ESMAIWOL.ZN moderation foundation
-- Run in Supabase SQL Editor. Does not modify existing content tables or their RLS policies.
create extension if not exists pgcrypto;

create table if not exists public.moderation_terms (
  term text primary key,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.moderation_terms(term) values
 ('yaoih'),('lgbt'),('futanari'),('edgy'),('amor es amor'),('femboy'),('femboys'),
 ('fnaf'),('no mames'),('wey'),('groomer'),('childporn'),('lesbian'),('whitetrash'),
 ('astolfo'),('gays'),('hazbin hotel'),('digital circus'),('steven universe')
on conflict (term) do nothing;

create table if not exists public.moderation_strikes (
  id bigint generated always as identity primary key,
  scope text not null check (scope in ('forum','chan')),
  actor_id uuid,
  ip_hash text,
  strike_number integer not null check (strike_number between 1 and 3),
  matched_terms text[] not null default '{}',
  event_key text not null unique,
  created_at timestamptz not null default now(),
  check ((scope = 'forum' and actor_id is not null) or (scope = 'chan' and ip_hash is not null))
);

create table if not exists public.moderation_bans (
  id bigint generated always as identity primary key,
  scope text not null check (scope in ('forum','chan')),
  actor_id uuid,
  ip_hash text,
  strike_number integer not null check (strike_number between 1 and 3),
  reason text not null default 'Community rules violation',
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  permanent boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  check ((scope = 'forum' and actor_id is not null) or (scope = 'chan' and ip_hash is not null))
);
create index if not exists moderation_bans_lookup on public.moderation_bans(scope, actor_id, ip_hash, active, expires_at);

create table if not exists public.moderation_events (
  id bigint generated always as identity primary key,
  scope text not null check (scope in ('forum','chan')),
  event_key text not null unique,
  actor_id uuid,
  ip_hash text,
  action_name text not null,
  matched_terms text[] not null default '{}',
  strike_number integer,
  created_at timestamptz not null default now()
);

alter table public.moderation_terms enable row level security;
alter table public.moderation_strikes enable row level security;
alter table public.moderation_bans enable row level security;
alter table public.moderation_events enable row level security;
-- No client policies are created: these tables are server-only.
revoke all on public.moderation_terms, public.moderation_strikes, public.moderation_bans, public.moderation_events from anon, authenticated;

create or replace function public.moderation_normalize(input_text text)
returns text language sql immutable parallel safe as $$
  select trim(regexp_replace(
    translate(lower(coalesce(input_text,'')),
      'áàäâãåéèëêíìïîóòöôõúùüûñç',
      'aaaaaaeeeeiiiiooooouuuunc'),
    '[^a-z0-9]+', ' ', 'g'));
$$;

create or replace function public.moderation_check_ban(
  p_scope text, p_actor_id uuid default null, p_ip_hash text default null
) returns jsonb language plpgsql security definer set search_path = public as $$
declare b public.moderation_bans%rowtype;
begin
  select * into b from public.moderation_bans
   where active and scope = p_scope
     and ((p_scope='forum' and actor_id=p_actor_id) or (p_scope='chan' and ip_hash=p_ip_hash))
     and (permanent or expires_at > now())
   order by permanent desc, expires_at desc nulls first limit 1;
  if not found then return jsonb_build_object('banned',false); end if;
  return jsonb_build_object('banned',true,'permanent',b.permanent,'expires_at',b.expires_at,'strike',b.strike_number);
end $$;

create or replace function public.moderation_process(
  p_scope text, p_actor_id uuid, p_ip_hash text, p_action text,
  p_content text, p_event_key text
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  normalized text;
  matched text[];
  prior public.moderation_events%rowtype;
  strike_count integer;
  duration interval;
  expiry timestamptz;
  ban_permanent boolean;
begin
  if p_scope not in ('forum','chan') then raise exception 'Invalid moderation scope'; end if;
  if p_event_key is null or length(p_event_key) < 8 or length(p_event_key) > 160 then raise exception 'Invalid event key'; end if;
  if (p_scope='forum' and p_actor_id is null) or (p_scope='chan' and coalesce(p_ip_hash,'')='') then
    raise exception 'Missing moderation identity';
  end if;
  -- Serialize strike counting per account/IP to avoid simultaneous requests skipping a level.
  perform pg_advisory_xact_lock(hashtextextended(p_scope || ':' || coalesce(p_actor_id::text,p_ip_hash), 0));

  select * into prior from public.moderation_events where event_key=p_event_key;
  if found then
    return jsonb_build_object('allowed',false,'duplicate',true,'strike',prior.strike_number,'matched_terms',prior.matched_terms);
  end if;

  if (public.moderation_check_ban(p_scope,p_actor_id,p_ip_hash)->>'banned')::boolean then
    return public.moderation_check_ban(p_scope,p_actor_id,p_ip_hash) || jsonb_build_object('allowed',false);
  end if;

  normalized := ' ' || public.moderation_normalize(p_content) || ' ';
  select coalesce(array_agg(t.term order by length(t.term) desc), '{}') into matched
    from public.moderation_terms t
   where t.enabled
     and position(' ' || public.moderation_normalize(t.term) || ' ' in normalized) > 0;

  if coalesce(array_length(matched,1),0)=0 then
    insert into public.moderation_events(scope,event_key,actor_id,ip_hash,action_name,matched_terms)
    values(p_scope,p_event_key,p_actor_id,p_ip_hash,p_action,'{}');
    return jsonb_build_object('allowed',true,'matched_terms','[]'::jsonb);
  end if;

  select count(*) + 1 into strike_count from public.moderation_strikes
   where scope=p_scope and ((p_scope='forum' and actor_id=p_actor_id) or (p_scope='chan' and ip_hash=p_ip_hash));
  strike_count := least(strike_count,3);
  duration := case strike_count when 1 then interval '48 hours' when 2 then interval '7 days' else null end;
  ban_permanent := strike_count >= 3;
  expiry := case when ban_permanent then null else now()+duration end;

  insert into public.moderation_strikes(scope,actor_id,ip_hash,strike_number,matched_terms,event_key)
  values(p_scope,p_actor_id,p_ip_hash,strike_count,matched,p_event_key);
  insert into public.moderation_bans(scope,actor_id,ip_hash,strike_number,expires_at,permanent,active)
  values(p_scope,p_actor_id,p_ip_hash,strike_count,expiry,ban_permanent,true);
  insert into public.moderation_events(scope,event_key,actor_id,ip_hash,action_name,matched_terms,strike_number)
  values(p_scope,p_event_key,p_actor_id,p_ip_hash,p_action,matched,strike_count);

  return jsonb_build_object('allowed',false,'violation',true,'strike',strike_count,
    'duration_hours',case strike_count when 1 then 48 when 2 then 168 else null end,
    'permanent',ban_permanent,'expires_at',expiry,'matched_terms',to_jsonb(matched));
end $$;

revoke all on function public.moderation_process(text,uuid,text,text,text,text) from public, anon, authenticated;
revoke all on function public.moderation_check_ban(text,uuid,text) from public, anon, authenticated;
grant execute on function public.moderation_process(text,uuid,text,text,text,text) to service_role;
grant execute on function public.moderation_check_ban(text,uuid,text) to service_role;
