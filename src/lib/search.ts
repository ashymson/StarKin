import type { Provider, Waitlist } from "./types";

export type Filters = {
  q?: string;
  service?: string;
  condition?: string;
  where?: string;
  age?: number;
  funding?: string;
  telehealth?: boolean;
  inHome?: boolean;
  accepting?: boolean;
};

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  const trimmed = v?.trim();
  return trimmed ? trimmed : undefined;
}

/** Turns URL search params into filters, ignoring anything malformed. */
export function parseFilters(params: RawParams): Filters {
  const age = Number(first(params.age));
  return {
    q: first(params.q),
    service: first(params.service),
    condition: first(params.condition),
    where: first(params.where),
    age: Number.isInteger(age) && age >= 0 && age <= 99 ? age : undefined,
    funding: first(params.funding),
    telehealth: first(params.telehealth) === "1" || undefined,
    inHome: first(params.inHome) === "1" || undefined,
    accepting: first(params.accepting) === "1" || undefined,
  };
}

/** Builds a /search URL from filters, dropping empty values. */
export function searchHref(filters: Filters): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === false || value === "") continue;
    params.set(key, value === true ? "1" : String(value));
  }
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

const WAITLIST_RANK: Record<Waitlist, number> = {
  none: 0,
  "under-1-month": 1,
  "1-3-months": 2,
  "3-plus-months": 3,
  unknown: 4,
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchesWhere(provider: Provider, where: string): boolean {
  const needle = normalize(where);
  const { city, county, zip } = provider.location;
  return [city, county, `${county} county`, zip].some((field) => normalize(field).includes(needle));
}

function matchesText(provider: Provider, q: string): boolean {
  const haystack = normalize(
    [provider.name, provider.description, ...provider.services, ...provider.conditions].join(" "),
  );
  return normalize(q)
    .split(" ")
    .every((word) => haystack.includes(word));
}

/**
 * Filters providers and sorts the ones families can actually get into first:
 * accepting new patients, then shortest waitlist, then name.
 */
export function searchProviders(providers: Provider[], f: Filters): Provider[] {
  return providers
    .filter((p) => !f.service || p.services.includes(f.service))
    .filter((p) => !f.condition || p.conditions.includes(f.condition))
    .filter((p) => !f.funding || p.funding.includes(f.funding))
    .filter((p) => f.age === undefined || (p.ages.min <= f.age && f.age <= p.ages.max))
    .filter((p) => !f.telehealth || p.telehealth)
    .filter((p) => !f.inHome || p.inHome)
    .filter((p) => !f.accepting || p.acceptingNewPatients)
    .filter((p) => !f.where || matchesWhere(p, f.where))
    .filter((p) => !f.q || matchesText(p, f.q))
    .sort(
      (a, b) =>
        Number(b.acceptingNewPatients) - Number(a.acceptingNewPatients) ||
        WAITLIST_RANK[a.waitlist] - WAITLIST_RANK[b.waitlist] ||
        a.name.localeCompare(b.name),
    );
}

export const WAITLIST_LABEL: Record<Waitlist, string> = {
  none: "No waitlist",
  "under-1-month": "Waitlist under 1 month",
  "1-3-months": "Waitlist 1–3 months",
  "3-plus-months": "Waitlist 3+ months",
  unknown: "Waitlist unknown",
};

export function agesLabel({ min, max }: { min: number; max: number }): string {
  const fmt = (n: number) => (n === 0 ? "birth" : String(n));
  if (max >= 99) return `Ages ${fmt(min)}+`;
  return `Ages ${fmt(min)}–${max}`;
}
