import { fundingBySlug } from "@/lib/data/funding";
import { WAITLIST_LABEL } from "@/lib/search";
import type { Provider } from "@/lib/types";
import { MoonIcon, StarIcon } from "./icons";

const chip = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-bold";

/** Gold star: the provider is taking new patients. */
export function AcceptingBadge({ accepting }: { accepting: boolean }) {
  return accepting ? (
    <span className={`${chip} bg-star-bg text-moon-text`}>
      <StarIcon /> Accepting new patients
    </span>
  ) : (
    <span className={`${chip} bg-rose-bg text-rose-text`}>Not accepting new patients</span>
  );
}

/** Moon: a scholarship program the provider accepts. Our own badge, never a program logo. */
export function FundingBadges({ funding, onlyScholarships = false }: { funding: string[]; onlyScholarships?: boolean }) {
  const programs = funding
    .map((slug) => fundingBySlug.get(slug))
    .filter((p) => p !== undefined)
    .filter((p) => !onlyScholarships || p.kind === "scholarship");
  return programs.map((p) =>
    p.kind === "scholarship" ? (
      <span key={p.slug} className={`${chip} bg-night text-white`}>
        <MoonIcon className="h-4 w-4 text-moon" /> {p.badgeLabel}
      </span>
    ) : (
      <span key={p.slug} className={`${chip} border border-line bg-card text-muted`}>
        {p.badgeLabel}
      </span>
    ),
  );
}

export function WaitlistChip({ waitlist }: { waitlist: Provider["waitlist"] }) {
  const quick = waitlist === "none" || waitlist === "under-1-month";
  return (
    <span className={`${chip} ${quick ? "bg-mint-bg text-mint-text" : "bg-paper text-muted"}`}>
      {WAITLIST_LABEL[waitlist]}
    </span>
  );
}

export function SampleTag() {
  return (
    <span className="rounded border border-dashed border-muted px-1.5 text-xs font-bold uppercase tracking-wide text-muted">
      Sample listing
    </span>
  );
}
