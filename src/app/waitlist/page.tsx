import type { Metadata } from "next";
import Link from "next/link";
import { AcceptingBadge, FundingBadges, WaitlistChip } from "@/components/Badges";
import { HeartIcon, MoonIcon, SkyDecor } from "@/components/icons";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: `${SITE.name} is coming to Polk County, Florida. Join the waitlist to be first to know.`,
};

const FEATURES = [
  {
    title: "The whole village in one search",
    text: "Speech, OT, PT, ABA and feeding therapy, developmental pediatricians and evaluations, respite care and IEP advocates, all in one place.",
    example: null,
  },
  {
    title: "See who has openings before you call",
    text: "A gold star means a provider is taking new patients, and every listing shows how long families are waiting to start.",
    example: "openings",
  },
  {
    title: "Know who takes how you pay",
    text: "Filter by the FES-UA scholarship, Medicaid or your insurance, so you only call providers who accept it.",
    example: "funding",
  },
  {
    title: "Save your village, and hear when a spot opens",
    text: "Keep your favorite providers on one list. We’re building alerts that tell you when one of them starts taking new patients.",
    example: "saved",
  },
] as const;

const PROMISES = [
  "Early access when we open in Polk County, Florida, then across the state.",
  "A few emails about our launch. No spam, ever.",
  "If you’d like, a short conversation so you can help shape what we build.",
  "Free for families, always. You will never pay to search.",
];

const FAQ = [
  {
    q: "Where and when will StarKin launch?",
    a: "We’re starting in Polk County, Florida (Lakeland, Winter Haven and nearby), then growing across Florida. Waitlist members hear first.",
  },
  {
    q: "Does it cost anything?",
    a: "No. StarKin is free for families, always. Providers get a free basic listing too.",
  },
  {
    q: "What do you do with my information?",
    a: "We use your email only to tell you about StarKin, and your ZIP code to decide where to launch. We never sell it, and you can ask us to remove you at any time.",
  },
  {
    q: "I’m a therapist, doctor or practice. Can I join?",
    a: "Yes, please. Choose “Provider or practice” on the form, and we’ll reach out when you can claim your free listing.",
  },
];

export default function WaitlistPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <SkyDecor />
        <MoonIcon className="pointer-events-none absolute right-10 top-6 hidden h-36 w-36 text-moon opacity-90 sm:block" />
        <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-12 sm:pt-16">
          <p className="font-bold text-moon">Coming first to Polk County, Florida</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            We’re building the place we wished we had.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {SITE.name} will be one place to find therapies, doctors and support for your child, and to see who is
            taking new patients and accepts your insurance or scholarship, before you make a single call.
          </p>
          <a
            href="#join"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-moon px-6 font-bold text-night hover:brightness-95"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="font-display text-3xl font-semibold">Why we’re building it</h2>
        <div className="mt-4 space-y-4 text-lg">
          <p>
            Two years ago, I felt my son should be speaking more. A speech evaluation showed he was
            speech-delayed, and that the things I thought were cute were signs of autism.
          </p>
          <p>
            With my head reeling, I tried to find every doctor, therapy and resource we might need. It was so
            hard to find anyone who took our insurance, or didn’t have a waitlist into next year.
          </p>
          <p>
            Two years later, it’s no easier. I help other parents search every week. So I decided to build the
            solution.
          </p>
        </div>
        <p className="mt-4 font-bold text-muted">— Founder of {SITE.name}, and a mom</p>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-3xl font-semibold">What you’ll be able to do</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <li key={f.title} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="text-muted">{f.text}</p>
              {f.example === "openings" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <AcceptingBadge accepting /> <WaitlistChip waitlist="under-1-month" />
                </div>
              )}
              {f.example === "funding" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <FundingBadges funding={["fes-ua", "fl-medicaid", "private-insurance"]} />
                </div>
              )}
              {f.example === "saved" && (
                <p className="mt-3 inline-flex items-center gap-1 font-bold text-rose-text">
                  <HeartIcon filled /> Saved to my village
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-muted">
          Want a peek? Try the{" "}
          <Link href="/search" className="font-bold text-sky-text underline">
            early preview
          </Link>
          . Its listings are samples, not real providers yet.
        </p>
      </section>

      <section id="join" className="mx-auto mt-12 max-w-5xl scroll-mt-4 px-4">
        <div className="grid gap-8 rounded-2xl bg-night p-6 text-white sm:p-8 md:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold">Join the waitlist</h2>
            <p className="mt-2 text-white/85">When you join, you’ll get:</p>
            <ul className="mt-4 space-y-3">
              {PROMISES.map((p) => (
                <li key={p} className="flex gap-3">
                  <MoonIcon className="mt-1 h-5 w-5 shrink-0 text-moon" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="font-display text-3xl font-semibold">Questions</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-2xl border border-line bg-card p-5">
              <summary className="cursor-pointer text-lg font-bold">{item.q}</summary>
              <p className="mt-2 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
