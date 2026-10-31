"use server";

import { parseWaitlistForm, type WaitlistFieldErrors } from "@/lib/waitlist";
import { saveSignup } from "@/lib/waitlist-store";

export type JoinState =
  | { status: "idle" }
  | { status: "joined"; alreadyJoined: boolean }
  | { status: "invalid"; errors: WaitlistFieldErrors }
  | { status: "failed"; message: string };

// Public, unauthenticated by design: anyone may join. Inputs are validated and the
// return value carries only what the form shows, never the stored row.
export async function joinWaitlist(_prev: JoinState, formData: FormData): Promise<JoinState> {
  const parsed = parseWaitlistForm(formData);
  // Bots get the same success screen so they learn nothing.
  if (!parsed.ok && "spam" in parsed) return { status: "joined", alreadyJoined: false };
  if (!parsed.ok) return { status: "invalid", errors: parsed.errors };

  const result = await saveSignup(parsed.signup);
  if (result === "saved") return { status: "joined", alreadyJoined: false };
  if (result === "already-joined") return { status: "joined", alreadyJoined: true };
  return {
    status: "failed",
    message: "Sorry, we couldn’t save your sign-up just now. Please try again in a few minutes.",
  };
}
