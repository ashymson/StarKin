import type { Metadata } from "next";
import { Suspense } from "react";
import { FilterForm } from "@/components/FilterForm";
import { ProviderCard } from "@/components/ProviderCard";
import { PROVIDERS } from "@/lib/data/providers";
import { serviceBySlug } from "@/lib/data/services";
import { parseFilters, searchProviders } from "@/lib/search";

export const metadata: Metadata = {
  title: "Find care",
};

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold">Find care</h1>
      <Suspense fallback={<p className="mt-6 text-muted">Loading providers…</p>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Results({ searchParams }: Pick<PageProps<"/search">, "searchParams">) {
  const filters = parseFilters(await searchParams);
  const results = searchProviders(PROVIDERS, filters);
  const serviceName = filters.service && serviceBySlug.get(filters.service)?.name;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[300px_1fr]">
      <aside>
        <details className="md:hidden" open={false}>
          <summary className="min-h-11 cursor-pointer rounded-full border border-line bg-card px-4 py-2 font-bold">
            Filters
          </summary>
          <div className="mt-3">
            <FilterForm filters={filters} />
          </div>
        </details>
        <div className="hidden md:block">
          <FilterForm filters={filters} />
        </div>
      </aside>
      <section aria-live="polite">
        <p className="mb-4 text-muted">
          {results.length === 1 ? "1 provider" : `${results.length} providers`}
          {serviceName && ` for ${serviceName.toLowerCase()}`}
          {filters.where && ` near ${filters.where}`}. Providers taking new patients are shown first.
        </p>
        {results.length === 0 ? (
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="font-bold">No providers match all of those filters yet.</p>
            <p className="text-muted">
              Try removing a filter, searching a nearby county, or turning on telehealth.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {results.map((p) => (
              <li key={p.slug}>
                <ProviderCard provider={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
