import type { FundingProgram } from "../types";

// Program descriptions are kept general on purpose. Before launch, check each
// one against the official source and link families there for the details.
export const FUNDING_PROGRAMS: FundingProgram[] = [
  {
    slug: "fes-ua",
    name: "Family Empowerment Scholarship for Students with Unique Abilities",
    shortName: "FES-UA",
    kind: "scholarship",
    state: "FL",
    administrator: "Step Up For Students",
    description:
      "A Florida education scholarship for students with eligible disabilities. Families can use the funds for approved services such as therapies, tutoring and specialized programs from approved providers.",
    officialUrl: "https://www.stepupforstudents.org/",
    badgeLabel: "Accepts FES-UA",
  },
  {
    slug: "fl-medicaid",
    name: "Florida Medicaid",
    shortName: "Medicaid",
    kind: "public-insurance",
    state: "FL",
    description:
      "Public health coverage that can pay for medically necessary therapies and doctor visits for eligible children.",
    officialUrl: "https://ahca.myflorida.com/medicaid",
    badgeLabel: "Accepts Medicaid",
  },
  {
    slug: "private-insurance",
    name: "Private insurance",
    shortName: "Insurance",
    kind: "private-insurance",
    state: null,
    description:
      "Employer or marketplace health plans. Check each provider's list of plans and ask about your deductible.",
    badgeLabel: "Takes insurance",
  },
  {
    slug: "self-pay",
    name: "Self-pay",
    shortName: "Self-pay",
    kind: "self-pay",
    state: null,
    description: "Paying the provider directly. Some offer sliding-scale fees.",
    badgeLabel: "Self-pay",
  },
];

export const fundingBySlug = new Map(FUNDING_PROGRAMS.map((f) => [f.slug, f]));
