import { describe, expect, it } from "vitest";
import { PROVIDERS } from "./data/providers";
import { agesLabel, parseFilters, searchHref, searchProviders } from "./search";

describe("parseFilters", () => {
  it("reads known params and drops malformed ones", () => {
    expect(
      parseFilters({ service: "speech-therapy", age: "abc", accepting: "1", telehealth: "yes", where: "  " }),
    ).toEqual({
      q: undefined,
      service: "speech-therapy",
      condition: undefined,
      where: undefined,
      age: undefined,
      funding: undefined,
      telehealth: undefined,
      inHome: undefined,
      accepting: true,
    });
  });

  it("uses the first value of repeated params", () => {
    expect(parseFilters({ age: ["4", "9"] }).age).toBe(4);
  });
});

describe("searchHref", () => {
  it("round-trips through parseFilters", () => {
    const href = searchHref({ service: "aba-therapy", age: 5, accepting: true, q: undefined });
    expect(href).toBe("/search?service=aba-therapy&age=5&accepting=1");
    const params = Object.fromEntries(new URL(href, "http://x").searchParams);
    expect(parseFilters(params)).toMatchObject({ service: "aba-therapy", age: 5, accepting: true });
  });
});

describe("searchProviders", () => {
  it("combines filters", () => {
    const results = searchProviders(PROVIDERS, { service: "speech-therapy", funding: "fes-ua", age: 3 });
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      expect(p.services).toContain("speech-therapy");
      expect(p.funding).toContain("fes-ua");
      expect(p.ages.min).toBeLessThanOrEqual(3);
      expect(p.ages.max).toBeGreaterThanOrEqual(3);
    }
  });

  it("matches location by city, county or zip", () => {
    const byCounty = searchProviders(PROVIDERS, { where: "Hillsborough" });
    const byCity = searchProviders(PROVIDERS, { where: "tampa" });
    const byZip = searchProviders(PROVIDERS, { where: "33606" });
    expect(byCounty.map((p) => p.slug)).toEqual(byCity.map((p) => p.slug));
    expect(byZip.map((p) => p.slug)).toEqual(["little-lantern-speech"]);
  });

  it("lists providers accepting new patients before ones that are not", () => {
    const results = searchProviders(PROVIDERS, {});
    const firstClosed = results.findIndex((p) => !p.acceptingNewPatients);
    expect(results.slice(firstClosed).every((p) => !p.acceptingNewPatients)).toBe(true);
  });
});

describe("agesLabel", () => {
  it("formats ranges", () => {
    expect(agesLabel({ min: 0, max: 21 })).toBe("Ages birth–21");
    expect(agesLabel({ min: 3, max: 99 })).toBe("Ages 3+");
  });
});
