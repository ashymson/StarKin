"use client";

import { useSyncExternalStore } from "react";

// "My village" lives in this browser only for now. Accounts come later.
const KEY = "starkin:village:v1";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: { raw: string | null; slugs: string[] } = { raw: null, slugs: EMPTY };

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cache.raw) return cache.slugs;
  let slugs = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) slugs = parsed.filter((s): s is string => typeof s === "string");
  } catch {}
  cache = { raw, slugs };
  return slugs;
}

function write(slugs: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => e.key === KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useVillage() {
  const slugs = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    slugs,
    has: (slug: string) => slugs.includes(slug),
    toggle: (slug: string) =>
      write(slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug]),
  };
}
