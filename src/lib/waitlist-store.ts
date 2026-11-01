import "server-only";
import type { WaitlistSignup } from "./waitlist";

export type SaveResult = "saved" | "already-joined" | "not-configured" | "error";

// The StarKin Supabase project. A publishable key is meant to be public: row-level
// security only lets it add waitlist rows, never read them. Production builds (including
// Vercel previews) fall back to these, so no host settings are needed; the
// SUPABASE_URL / SUPABASE_ANON_KEY environment variables override them.
const STARKIN_SUPABASE = {
  url: "https://mvzalxwonwhmmeqaluof.supabase.co",
  publishableKey: "sb_publishable_xr-M-YOilM02NOdPX1hunw_eDCFZKPJ",
};

/**
 * Saves a sign-up to the Supabase `waitlist` table (supabase/migrations/0002_waitlist.sql)
 * through Supabase's REST API.
 */
export async function saveSignup(signup: WaitlistSignup): Promise<SaveResult> {
  // Local development doesn't write to the real list unless the env vars are set.
  const isProduction = process.env.NODE_ENV === "production";
  const url = process.env.SUPABASE_URL || (isProduction ? STARKIN_SUPABASE.url : undefined);
  const key = process.env.SUPABASE_ANON_KEY || (isProduction ? STARKIN_SUPABASE.publishableKey : undefined);

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
        // Legacy anon keys are JWTs and also go in Authorization; new sb_publishable_ keys don't.
        ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
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
