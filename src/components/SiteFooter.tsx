import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-card">
      <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-sm text-muted">
        <p>
          <strong className="text-ink">
            {SITE.name}
            {SITE.workingName && " (working name)"}
          </strong>{" "}
          is built by a parent of a child on the spectrum, for every family putting together a village of
          care.
        </p>
        <p>
          Prototype: every listing is sample data, not a real provider. Nothing here is medical advice.
          Funding program names belong to their programs; we are not affiliated with Step Up For Students or
          any state agency. Always confirm eligibility with the program.
        </p>
      </div>
    </footer>
  );
}
