import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AcceptingBadge, FundingBadges, SampleTag, WaitlistChip } from "@/components/Badges";
import { SaveButton } from "@/components/SaveButton";
import { PROVIDERS, providerBySlug } from "@/lib/data/providers";
import { conditionBySlug, serviceBySlug } from "@/lib/data/services";
import { agesLabel, searchHref } from "@/lib/search";

export function generateStaticParams() {
  return PROVIDERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/providers/[slug]">): Promise<Metadata> {
  const provider = providerBySlug.get((await params).slug);
  return provider ? { title: provider.name, description: provider.description } : {};
}

const VERIFIED_METHOD = {
  provider: "confirmed by the provider",
  "official-list": "checked against an official program list",
  phone: "confirmed by phone",
};

export default async function ProviderPage({ params }: PageProps<"/providers/[slug]">) {
  const p = providerBySlug.get((await params).slug);
  if (!p) notFound();

  const services = p.services.map((s) => serviceBySlug.get(s)).filter((s) => s !== undefined);
  const hasComplementary = services.some((s) => s.group === "complementary");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/search" className="font-bold text-sky-text hover:underline">
        ← Back to results
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          {p.sample && <SampleTag />}
          <h1 className="mt-1 font-display text-3xl font-semibold sm:text-4xl">{p.name}</h1>
          <p className="text-muted">
            {p.location.city}, {p.location.state} {p.location.zip} · {p.location.county} County
          </p>
        </div>
        <SaveButton slug={p.slug} name={p.name} />
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        <AcceptingBadge accepting={p.acceptingNewPatients} />
        <WaitlistChip waitlist={p.waitlist} />
      </div>

      <p className="mt-6 text-lg">{p.description}</p>

      <dl className="mt-8 grid gap-6 rounded-2xl border border-line bg-card p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="font-bold">Services</dt>
          <dd>
            <ul className="mt-1 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={searchHref({ service: s.slug })} className="font-bold text-sky-text hover:underline">
                    {s.name}
                  </Link>
                  <span className="text-muted">: {s.blurb}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-bold">Who they see</dt>
          <dd className="text-muted">
            {agesLabel(p.ages)}
            <br />
            {p.conditions.map((c) => conditionBySlug.get(c)?.name ?? c).join(", ")}
          </dd>
        </div>
        <div>
          <dt className="font-bold">Where</dt>
          <dd className="text-muted">
            {[ "In clinic", p.inHome && "In your home", p.telehealth && "Telehealth"].filter(Boolean).join(" · ")}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-bold">Ways to pay</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            <FundingBadges funding={p.funding} />
          </dd>
          {p.insurers.length > 0 && (
            <dd className="mt-2 text-muted">Insurance plans: {p.insurers.join(", ")}</dd>
          )}
          <dd className="mt-2 text-sm text-muted">
            Always confirm coverage with the provider and your plan or program before starting.{" "}
            <Link href="/funding" className="font-bold text-sky-text hover:underline">
              How funding works
            </Link>
          </dd>
        </div>
        <div>
          <dt className="font-bold">Languages</dt>
          <dd className="text-muted">{p.languages.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-bold">Contact</dt>
          <dd className="text-muted">
            {p.phone ? (
              <a href={`tel:${p.phone.replace(/\D/g, "")}`} className="font-bold text-sky-text hover:underline">
                {p.phone}
              </a>
            ) : (
              "Not listed"
            )}
            {p.sample && <span className="block text-sm">Sample listing: this number is not real.</span>}
          </dd>
        </div>
      </dl>

      {hasComplementary && (
        <p className="mt-6 rounded-2xl bg-star-bg p-4 text-[15px]">
          Complementary and alternative care is listed so you can see every option. We don&apos;t endorse
          specific treatments. Please talk with your child&apos;s doctor about what&apos;s right for them.
        </p>
      )}

      <p className="mt-6 text-sm text-muted">
        {p.verified
          ? `Details last ${VERIFIED_METHOD[p.verified.method]} on ${new Date(`${p.verified.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`
          : "These details haven't been verified yet."}{" "}
        Is something wrong? Providers can claim and update their listing soon.
      </p>
    </div>
  );
}
