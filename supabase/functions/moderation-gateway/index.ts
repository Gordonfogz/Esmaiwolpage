import { adminDb, corsHeaders, getUser, json, moderate } from "../_shared/moderation.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Invalid request" }, 400);
    body = parsed as Record<string, unknown>;
  } catch { return json({ error: "Invalid JSON" }, 400); }

  try {
    const db = adminDb();
    const user = await getUser(req, db);
    if (!user) return json({ error: "You must sign in again." }, 401);
    const eventKey = typeof body.event_key === "string" ? body.event_key : crypto.randomUUID();
    const action = body.action;

    if (action === "create_thread") {
      const boardId = body.board_id;
      const title = typeof body.title === "string" ? body.title.trim() : "";
      const content = typeof body.body === "string" ? body.body.trim() : "";
      const attachments = Array.isArray(body.attachments) ? body.attachments : [];
      if (typeof boardId !== "string" || !title || title.length > 120 || !content || content.length > 50000 || attachments.length > 10)
        return json({ error: "Invalid thread data." }, 400);
      const verdict = await moderate({ db, scope: "forum", actorId: user.id, ipHash: null, action: "forum_thread", content: `${title}\n${content}`, eventKey });
      if (verdict.allowed !== true) return json({ error: "Moderation blocked this publication.", moderation: verdict }, 403);
      const { data, error } = await db.from("forum_threads").insert({ board_id: boardId, user_id: user.id, title, body: content, attachments }).select("id").single();
      if (error) throw error;
      return json({ data }, 201);
    }

    if (action === "create_reply") {
      const threadId = body.thread_id;
      const content = typeof body.body === "string" ? body.body.trim() : "";
      const attachments = Array.isArray(body.attachments) ? body.attachments : [];
      const quotePostId = body.quote_post_id ?? null;
      const quoteAuthorId = body.quote_author_id ?? null;
      if (typeof threadId !== "string" && typeof threadId !== "number") return json({ error: "Invalid thread." }, 400);
      if (!content || content.length > 50000 || attachments.length > 10) return json({ error: "Invalid reply data." }, 400);
      const verdict = await moderate({ db, scope: "forum", actorId: user.id, ipHash: null, action: "forum_reply", content, eventKey });
      if (verdict.allowed !== true) return json({ error: "Moderation blocked this publication.", moderation: verdict }, 403);
      const { data, error } = await db.from("forum_posts").insert({ thread_id: threadId, user_id: user.id, body: content, attachments, quote_post_id: quotePostId, quote_author_id: quoteAuthorId }).select("id").single();
      if (error) throw error;
      return json({ data }, 201);
    }

    if (action === "save_profile") {
      const username = typeof body.username === "string" ? body.username.trim() : "";
      const displayName = typeof body.display_name === "string" ? body.display_name.trim() : "";
      const bio = typeof body.bio === "string" ? body.bio.trim() : "";
      if (!/^[A-Za-z0-9_]{3,24}$/.test(username) || displayName.length > 48 || bio.length > 500)
        return json({ error: "Invalid profile fields." }, 400);
      const verdict = await moderate({ db, scope: "forum", actorId: user.id, ipHash: null, action: "profile_update", content: `${username}\n${displayName}\n${bio}`, eventKey });
      if (verdict.allowed !== true) return json({ error: "Moderation blocked this profile update.", moderation: verdict }, 403);
      const payload: Record<string, unknown> = { id: user.id, username, display_name: displayName || username, bio: bio || null };
      // Media URL fields are intentionally excluded here until the profile storage schema is confirmed.
      const { data, error } = await db.from("profiles").upsert(payload).select("id,username,display_name,bio").single();
      if (error) throw error;
      return json({ data });
    }

    return json({ error: "Unknown action." }, 400);
  } catch (error) {
    console.error("moderation-gateway error", error);
    return json({ error: "Server error while processing this request." }, 500);
  }
});
