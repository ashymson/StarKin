import Link from "next/link";
import { MoonIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <MoonIcon className="mx-auto h-12 w-12 text-moon" />
      <h1 className="mt-4 font-display text-3xl font-semibold">We couldn&apos;t find that page</h1>
      <p className="mt-2 text-muted">It may have moved, or the listing may no longer be available.</p>
      <Link href="/search" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-night px-5 font-bold text-white">
        Find care
      </Link>
    </div>
  );
}
