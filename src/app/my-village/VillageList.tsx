"use client";

import Link from "next/link";
import { ProviderCard } from "@/components/ProviderCard";
import { StarIcon } from "@/components/icons";
import { providerBySlug } from "@/lib/data/providers";
import { serviceBySlug } from "@/lib/data/services";
import { useVillage } from "@/lib/village";

export function VillageList() {
  const { slugs } = useVillage();
  const providers = slugs.map((s) => providerBySlug.get(s)).filter((p) => p !== undefined);

  if (providers.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-line bg-card p-6 text-center">
        <StarIcon className="mx-auto h-8 w-8 text-moon" />
        <p className="mt-2 font-bold">Your village is empty, for now.</p>
        <Link
          href="/search"
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-night px-5 font-bold text-white"
        >
          Find care
        </Link>
      </div>
    );
  }

  const covered = new Set(providers.flatMap((p) => p.services));
  return (
    <>
      <p className="mt-6 font-bold">
        {providers.length} saved · covering{" "}
        {[...covered].map((s) => serviceBySlug.get(s)?.name.toLowerCase() ?? s).join(", ")}
      </p>
      <ul className="mt-4 space-y-4">
        {providers.map((p) => (
          <li key={p.slug}>
            <ProviderCard provider={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
