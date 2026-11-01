import { describe, expect, it } from "vitest";
import { parseWaitlistForm } from "./waitlist";

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

describe("parseWaitlistForm", () => {
  it("accepts a valid sign-up and normalizes it", () => {
    expect(
      parseWaitlistForm(form({ email: "  Mom@Example.com ", role: "parent", zip: "33801-1234", okToContact: "yes" })),
    ).toEqual({
      ok: true,
      signup: { email: "mom@example.com", role: "parent", zip: "33801", okToContact: true },
    });
  });

  it("defaults okToContact to false", () => {
    const result = parseWaitlistForm(form({ email: "a@b.co", role: "provider", zip: "33880" }));
    expect(result).toMatchObject({ ok: true, signup: { okToContact: false } });
  });

  it("reports each invalid field", () => {
    expect(parseWaitlistForm(form({ email: "not-an-email", role: "admin", zip: "338" }))).toEqual({
      ok: false,
      errors: {
        email: expect.any(String),
        role: expect.any(String),
        zip: expect.any(String),
      },
    });
  });

  it("treats missing fields as invalid", () => {
    const result = parseWaitlistForm(new FormData());
    expect(result.ok).toBe(false);
    expect(result).toHaveProperty("errors.email");
  });

  it("flags a filled honeypot as spam", () => {
    expect(
      parseWaitlistForm(form({ email: "a@b.co", role: "parent", zip: "33801", website: "http://spam" })),
    ).toEqual({ ok: false, spam: true });
  });
});
