"use client";

import { useActionState } from "react";
import { joinWaitlist, type JoinState } from "@/app/waitlist/actions";
import { WAITLIST_ROLES, type WaitlistRole } from "@/lib/waitlist";
import { StarIcon } from "./icons";

const initialState: JoinState = { status: "idle" };

const field = "min-h-12 w-full rounded-lg border border-line bg-card px-3 text-ink";

/** Works before JavaScript loads: the Server Action handles a plain form post. */
export function WaitlistForm({ defaultRole = "parent" }: { defaultRole?: WaitlistRole }) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  if (state.status === "joined") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-card p-6 text-ink">
        <p className="flex items-center gap-2 font-display text-2xl font-semibold">
          <StarIcon className="h-6 w-6 text-moon" />
          {state.alreadyJoined ? "You’re already on the list" : "You’re on the list"}
        </p>
        <p className="mt-2 text-muted">
          Thank you. We’ll email you when StarKin opens in your area. In the meantime, you’re welcome to try
          the preview with sample listings.
        </p>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};

  return (
    <form action={formAction} noValidate className="space-y-5 rounded-2xl border border-line bg-card p-6 text-ink">
      <div>
        <label htmlFor="wl-email" className="block font-bold">
          Email
        </label>
        <input
          id="wl-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "wl-email-error" : undefined}
          className={`mt-1 ${field}`}
        />
        {errors.email && (
          <p id="wl-email-error" className="mt-1 text-[15px] font-bold text-rose-text">
            {errors.email}
          </p>
        )}
      </div>

      <fieldset aria-describedby={errors.role ? "wl-role-error" : undefined}>
        <legend className="font-bold">I am a…</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {(Object.entries(WAITLIST_ROLES) as [WaitlistRole, string][]).map(([value, label]) => (
            <label
              key={value}
              className="flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border border-line px-3 has-[:checked]:border-night has-[:checked]:bg-star-bg"
            >
              <input type="radio" name="role" value={value} defaultChecked={value === defaultRole} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.role && (
          <p id="wl-role-error" className="mt-1 text-[15px] font-bold text-rose-text">
            {errors.role}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="wl-zip" className="block font-bold">
          ZIP code
        </label>
        <p id="wl-zip-hint" className="text-[15px] text-muted">
          So we know where families need us first.
        </p>
        <input
          id="wl-zip"
          name="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={10}
          required
          aria-invalid={errors.zip ? true : undefined}
          aria-describedby={errors.zip ? "wl-zip-hint wl-zip-error" : "wl-zip-hint"}
          className={`mt-1 max-w-[12rem] ${field}`}
        />
        {errors.zip && (
          <p id="wl-zip-error" className="mt-1 text-[15px] font-bold text-rose-text">
            {errors.zip}
          </p>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input type="checkbox" name="okToContact" value="yes" className="mt-1.5 h-5 w-5" />
        <span>
          I’m happy to have a short conversation to help shape StarKin.{" "}
          <span className="text-muted">(Optional)</span>
        </span>
      </label>

      {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "failed" && (
        <p role="alert" className="font-bold text-rose-text">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 w-full rounded-full bg-moon px-6 font-bold text-night hover:brightness-95 disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Joining…" : "Join the waitlist"}
      </button>

      <p className="text-[15px] text-muted">
        We only ask for your email and ZIP code. We’ll never ask about your child’s diagnosis here, and we
        never sell your information.
      </p>
    </form>
  );
}
