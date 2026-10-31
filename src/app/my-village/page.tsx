import type { Metadata } from "next";
import { VillageList } from "./VillageList";

export const metadata: Metadata = {
  title: "My village",
};

export default function MyVillagePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">My village</h1>
      <p className="mt-3 text-lg">
        Everyone helping your child, in one list. Save providers while you search and they&apos;ll show up here.
      </p>
      <p className="mt-1 text-[15px] text-muted">For now your village is saved in this browser only.</p>
      <VillageList />
    </div>
  );
}
