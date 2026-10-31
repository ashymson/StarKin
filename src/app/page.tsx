import Link from "next/link";
import { AcceptingBadge, FundingBadges, WaitlistChip } from "@/components/Badges";
import { ServiceOptions } from "@/components/FilterForm";
import { HeartIcon, MoonIcon, SkyDecor } from "@/components/icons";
import { SERVICE_GROUPS, SERVICES } from "@/lib/data/services";
import { searchHref } from "@/lib/search";
import { SITE } from "@/lib/site";
import type { ServiceGroup } from "@/lib/types";

const STEPS = [
  {
    title: "Find care that fits",
    text: "Search by type of care, your child's age, where you live and how you're paying.",
  },
  {
    title: "Build your village",
    text: "Save the providers you like to one list: therapists, doctors and support, all together.",
  },
  {
    title: "Use the funding you have",
    text: "See who accepts scholarships like FES-UA, Medicaid or your insurance before you call.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <SkyDecor />
        <MoonIcon className="pointer-events-none absolute -right-4 top-3 h-20 w-20 text-moon opacity-90 sm:right-10 sm:top-6 sm:h-40 sm:w-40" />
        <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-12 sm:pt-16">
          <p className="font-bold text-moon">For parents and guardians of children with disabilities</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {SITE.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Therapies, doctors, complementary care and family support in one place, starting in Florida.
          </p>

          <form action="/search" className="mt-8 grid max-w-3xl gap-3 rounded-2xl bg-white p-3 text-ink sm:grid-cols-[1fr_1fr_auto]">
            <label className="block">
              <span className="sr-only">Type of care</span>
              <select name="service" defaultValue="" className="min-h-12 w-full rounded-lg border border-line bg-card px-3">
                <option value="">Any type of care</option>
                <ServiceOptions />
              </select>
            </label>
            <label className="block">
              <span className="sr-only">City, county or ZIP</span>
              <input
                name="where"
                placeholder="City, county or ZIP"
                className="min-h-12 w-full rounded-lg border border-line px-3"
              />
            </label>
            <button type="submit" className="min-h-12 rounded-full bg-moon px-6 font-bold text-night hover:brightness-95">
              Find care
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-display text-3xl font-semibold">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-line bg-card p-5">
              <span className="font-display text-3xl font-semibold text-moon-text">{i + 1}</span>
              <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
              <p className="text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl border border-line bg-card p-5">
          <h3 className="font-bold">What the badges mean</h3>
          <ul className="mt-3 space-y-3">
            <li className="flex flex-wrap items-center gap-3">
              <AcceptingBadge accepting /> <span className="text-muted">The provider is taking new patients.</span>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <FundingBadges funding={["fes-ua"]} />
              <span className="text-muted">Accepts a scholarship program&apos;s funds.</span>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <WaitlistChip waitlist="under-1-month" />
              <span className="text-muted">How long families are waiting to start.</span>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 font-bold text-rose-text">
                <HeartIcon filled /> Saved
              </span>
              <span className="text-muted">In your village, so you can find it again.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-3xl font-semibold">Browse by type of care</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {(Object.keys(SERVICE_GROUPS) as ServiceGroup[]).map((group) => (
            <div key={group} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="text-lg font-bold">{SERVICE_GROUPS[group].name}</h3>
              <p className="text-[15px] text-muted">{SERVICE_GROUPS[group].blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SERVICES.filter((s) => s.group === group).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={searchHref({ service: s.slug })}
                      className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-[15px] hover:border-ink"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-2xl bg-night p-6 text-white sm:p-8">
          <SkyDecor />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-2xl font-semibold">Paying for care in Florida?</h2>
            <p className="mt-2 text-white/85">
              The FES-UA scholarship, Medicaid and private insurance can each cover different things. We explain
              them in plain language and show which providers accept each one.
            </p>
            <Link
              href="/funding"
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-moon px-5 font-bold text-night"
            >
              Learn about funding
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
