"use client";

import { useVillage } from "@/lib/village";
import { HeartIcon } from "./icons";

export function SaveButton({ slug, name }: { slug: string; name: string }) {
  const { has, toggle } = useVillage();
  const saved = has(slug);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from my village` : `Save ${name} to my village`}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-sm font-bold transition-colors ${
        saved
          ? "border-rose-text bg-rose-bg text-rose-text"
          : "border-line bg-card text-ink hover:border-ink"
      }`}
    >
      <HeartIcon filled={saved} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
