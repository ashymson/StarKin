export type ServiceGroup = "therapy" | "medical" | "complementary" | "support";

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  /** One plain-language sentence a parent new to this would understand. */
  blurb: string;
};

export type Condition = {
  slug: string;
  name: string;
};

export type FundingKind = "scholarship" | "public-insurance" | "private-insurance" | "self-pay";

export type FundingProgram = {
  slug: string;
  name: string;
  shortName: string;
  kind: FundingKind;
  /** Two-letter state code, or null for programs that apply everywhere. */
  state: string | null;
  administrator?: string;
  description: string;
  officialUrl?: string;
  /** Text on the provider badge. Our own wording, never a program's logo. */
  badgeLabel: string;
};

export type Waitlist = "none" | "under-1-month" | "1-3-months" | "3-plus-months" | "unknown";

export type Provider = {
  slug: string;
  name: string;
  kind: "clinic" | "individual" | "organization";
  description: string;
  services: string[];
  conditions: string[];
  ages: { min: number; max: number };
  location: {
    city: string;
    county: string;
    state: string;
    zip: string;
  };
  telehealth: boolean;
  inHome: boolean;
  acceptingNewPatients: boolean;
  waitlist: Waitlist;
  funding: string[];
  insurers: string[];
  languages: string[];
  phone?: string;
  website?: string;
  /** When and how the listing's details were last confirmed. */
  verified?: { date: string; method: "provider" | "official-list" | "phone" };
  /** Fictional listing used while the prototype has no real data. */
  sample: boolean;
};
