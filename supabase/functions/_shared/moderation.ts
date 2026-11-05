import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-moderation-event",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};
export const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});
export function adminDb() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Missing Supabase server secrets");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
export async function getUser(req: Request, db: ReturnType<typeof adminDb>) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return null;
  const { data, error } = await db.auth.getUser(token);
  return error ? null : data.user;
}
export async function moderate(args: {
  db: ReturnType<typeof adminDb>; scope: "forum" | "chan"; actorId: string | null;
  ipHash: string | null; action: string; content: string; eventKey: string;
}) {
  const { data, error } = await args.db.rpc("moderation_process", {
    p_scope: args.scope, p_actor_id: args.actorId, p_ip_hash: args.ipHash,
    p_action: args.action, p_content: args.content, p_event_key: args.eventKey,
  });
  if (error) throw new Error(`Moderation database error: ${error.message}`);
  return data as Record<string, unknown>;
}
export async function ipDigest(req: Request) {
  // Only enable IP enforcement after confirming these headers are overwritten by the trusted edge proxy.
  // Never trust a client-supplied X-Forwarded-For value without proxy guarantees.
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "";
  const secret = Deno.env.get("MODERATION_IP_HASH_SECRET") || "";
  if (!ip || !secret) return null;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip.trim()));
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2,"0")).join("");
}
