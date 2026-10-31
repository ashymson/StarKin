import type { Metadata } from "next";
import Link from "next/link";
import { FundingBadges } from "@/components/Badges";
import { FUNDING_PROGRAMS } from "@/lib/data/funding";
import { PROVIDERS } from "@/lib/data/providers";
import { searchHref } from "@/lib/search";

export const metadata: Metadata = {
  title: "Paying for care",
  description: "Plain-language guide to scholarships, Medicaid and insurance for therapies and care.",
};

export default function FundingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Paying for care</h1>
      <p className="mt-3 text-lg">
        Many families pay for different therapies in different ways. Here&apos;s a plain-language overview of
        each option, and a quick way to find providers who accept it.
      </p>
      <p className="mt-3 text-[15px] text-muted">
        Programs change, and eligibility depends on your child and family. Always confirm the details with the
        program itself. We&apos;ll add other states&apos; scholarship and education savings account programs as
        we grow.
      </p>

      <ul className="mt-8 space-y-5">
        {FUNDING_PROGRAMS.map((f) => {
          const count = PROVIDERS.filter((p) => p.funding.includes(f.slug)).length;
          return (
            <li key={f.slug} id={f.slug} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-semibold">{f.name}</h2>
                <FundingBadges funding={[f.slug]} />
              </div>
              {(f.state || f.administrator) && (
                <p className="mt-1 text-[15px] text-muted">
                  {f.state && `${f.state === "FL" ? "Florida" : f.state} program`}
                  {f.administrator && ` · Administered by ${f.administrator}`}
                </p>
              )}
              <p className="mt-3">{f.description}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={searchHref({ funding: f.slug })}
                  className="inline-flex min-h-11 items-center rounded-full bg-night px-5 font-bold text-white hover:bg-night-2"
                >
                  {count} providers accept {f.shortName}
                </Link>
                {f.officialUrl && (
                  <a
                    href={f.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center px-2 font-bold text-sky-text hover:underline"
                  >
                    Official site ↗
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
