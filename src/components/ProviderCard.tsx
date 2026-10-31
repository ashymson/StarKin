import Link from "next/link";
import { serviceBySlug } from "@/lib/data/services";
import { agesLabel } from "@/lib/search";
import type { Provider } from "@/lib/types";
import { AcceptingBadge, FundingBadges, SampleTag, WaitlistChip } from "./Badges";
import { SaveButton } from "./SaveButton";

export function ProviderCard({ provider: p }: { provider: Provider }) {
  const services = p.services.map((s) => serviceBySlug.get(s)?.name ?? s);
  return (
    <article className="rounded-2xl border border-line bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          {p.sample && <SampleTag />}
          <h3 className="mt-1 font-display text-xl font-semibold">
            <Link href={`/providers/${p.slug}`} className="hover:underline">
              {p.name}
            </Link>
          </h3>
          <p className="text-muted">
            {p.location.city}, {p.location.state} · {agesLabel(p.ages)}
            {p.telehealth && " · Telehealth"}
            {p.inHome && " · In-home"}
          </p>
        </div>
        <SaveButton slug={p.slug} name={p.name} />
      </div>
      <p className="mt-2 text-[15px] font-bold text-sky-text">{services.join(" · ")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <AcceptingBadge accepting={p.acceptingNewPatients} />
        <WaitlistChip waitlist={p.waitlist} />
        <FundingBadges funding={p.funding} onlyScholarships />
      </div>
    </article>
  );
}
