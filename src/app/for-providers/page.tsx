import type { Metadata } from "next";
import { AcceptingBadge, FundingBadges, WaitlistChip } from "@/components/Badges";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "For providers",
};

const POINTS = [
  {
    title: "A free listing, always",
    text: "Every provider who serves children with disabilities gets a basic listing at no cost. Families need a complete directory.",
  },
  {
    title: "Show families when you have openings",
    text: "Update your new-patient status and waitlist in seconds, so you hear from families you can actually help.",
  },
  {
    title: "Show the funding you accept",
    text: "Scholarships like FES-UA, Medicaid and insurance plans appear as badges families can filter by.",
  },
];

export default function ForProvidersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">For providers</h1>
      <p className="mt-3 text-lg">
        For families, the hardest part often isn&apos;t finding a name. It&apos;s finding someone who is taking new
        patients, sees their child&apos;s age and accepts how they pay. Help them find you.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <AcceptingBadge accepting />
        <WaitlistChip waitlist="none" />
        <FundingBadges funding={["fes-ua"]} />
      </div>
      <ul className="mt-8 space-y-4">
        {POINTS.map((p) => (
          <li key={p.title} className="rounded-2xl border border-line bg-card p-5">
            <h2 className="text-lg font-bold">{p.title}</h2>
            <p className="text-muted">{p.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-2xl bg-night p-6 text-white">
        <h2 className="font-display text-2xl font-semibold">Claim your listing</h2>
        <p className="mt-2 text-white/85">
          Provider sign-up opens soon, starting in Polk County, Florida. Join the waitlist and we’ll reach out
          when you can claim your free listing. Families never pay to search.
        </p>
        <div className="mt-5">
          <WaitlistForm defaultRole="provider" />
        </div>
      </div>
    </div>
  );
}
