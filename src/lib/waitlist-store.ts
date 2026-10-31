import "server-only";
import type { WaitlistSignup } from "./waitlist";

export type SaveResult = "saved" | "already-joined" | "not-configured" | "error";

/**
 * Saves a sign-up to the Supabase `waitlist` table (supabase/migrations/0002_waitlist.sql)
 * through Supabase's REST API. Uses the project's public (anon / publishable) key: row-level
 * security only lets that key insert, never read the list back.
 */
export async function saveSignup(signup: WaitlistSignup): Promise<SaveResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without a Supabase project: show the sign-up in the terminal
      // so the form can still be tried end to end.
      console.info("[waitlist] Supabase not configured; would save:", signup);
      return "saved";
    }
    console.error("[waitlist] SUPABASE_URL or SUPABASE_ANON_KEY is not set");
    return "not-configured";
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: signup.email,
        role: signup.role,
        zip: signup.zip,
        ok_to_contact: signup.okToContact,
      }),
      cache: "no-store",
    });
    if (res.ok) return "saved";
    // 409 = unique violation on the email: they're already on the list.
    if (res.status === 409) return "already-joined";
    console.error("[waitlist] Supabase insert failed:", res.status, await res.text());
    return "error";
  } catch (err) {
    console.error("[waitlist] Supabase request failed:", err);
    return "error";
  }
}
