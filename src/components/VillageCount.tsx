"use client";

import { useVillage } from "@/lib/village";

export function VillageCount() {
  const { slugs } = useVillage();
  if (slugs.length === 0) return null;
  return (
    <span className="ml-1 rounded-full bg-moon px-2 text-sm font-bold text-night">
      {slugs.length}
      <span className="sr-only"> saved</span>
    </span>
  );
}
