import Link from "next/link";
import { SITE } from "@/lib/site";
import { MoonIcon } from "./icons";
import { VillageCount } from "./VillageCount";

const NAV = [
  { href: "/search", label: "Find care" },
  { href: "/funding", label: "Funding" },
  { href: "/for-providers", label: "For providers" },
];

export function SiteHeader() {
  return (
    <header className="bg-night text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-semibold">
          <MoonIcon className="h-6 w-6 text-moon" />
          {SITE.name}
        </Link>
        <nav aria-label="Main" className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px]">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="py-2 hover:text-moon">
              {item.label}
            </Link>
          ))}
          <Link
            href="/my-village"
            className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
          >
            My village <VillageCount />
          </Link>
        </nav>
      </div>
    </header>
  );
}
