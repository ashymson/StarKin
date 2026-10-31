// Waitlist sign-up: validation is pure so it can be unit-tested; saving lives in
// waitlist-store.ts. We collect only what we need to plan a launch (email, role,
// ZIP). Never ask about a child's diagnosis here: see docs/ROADMAP.md (privacy).

export const WAITLIST_ROLES = {
  parent: "Parent or guardian",
  provider: "Provider or practice",
  other: "Someone else",
} as const;

export type WaitlistRole = keyof typeof WAITLIST_ROLES;

export type WaitlistSignup = {
  email: string;
  role: WaitlistRole;
  zip: string;
  okToContact: boolean;
};

export type WaitlistFieldErrors = Partial<Record<"email" | "role" | "zip", string>>;

export type WaitlistResult =
  | { ok: true; signup: WaitlistSignup }
  | { ok: false; errors: WaitlistFieldErrors }
  // A filled-in honeypot field: almost certainly a bot.
  | { ok: false; spam: true };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP = /^\d{5}$/;

function text(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function parseWaitlistForm(formData: FormData): WaitlistResult {
  if (text(formData, "website") !== "") return { ok: false, spam: true };

  const email = text(formData, "email").toLowerCase();
  const role = text(formData, "role");
  // Accept ZIP+4 and keep the first five digits.
  const zip = text(formData, "zip").replace(/-\d{4}$/, "");

  const errors: WaitlistFieldErrors = {};
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Please enter a valid email address.";
  if (!(role in WAITLIST_ROLES)) errors.role = "Please choose the option that fits you best.";
  if (!ZIP.test(zip)) errors.zip = "Please enter a 5-digit ZIP code.";
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    signup: { email, role: role as WaitlistRole, zip, okToContact: formData.get("okToContact") === "yes" },
  };
}
