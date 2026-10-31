import { FUNDING_PROGRAMS } from "@/lib/data/funding";
import { CONDITIONS, SERVICE_GROUPS, SERVICES } from "@/lib/data/services";
import type { Filters } from "@/lib/search";
import type { ServiceGroup } from "@/lib/types";

const field = "mt-1 block w-full min-h-11 rounded-lg border border-line bg-card px-3 text-ink";
const label = "block text-sm font-bold";

export function ServiceOptions() {
  return (Object.keys(SERVICE_GROUPS) as ServiceGroup[]).map((group) => (
    <optgroup key={group} label={SERVICE_GROUPS[group].name}>
      {SERVICES.filter((s) => s.group === group).map((s) => (
        <option key={s.slug} value={s.slug}>
          {s.name}
        </option>
      ))}
    </optgroup>
  ));
}

/** Plain GET form so filtering works before (and without) JavaScript. */
export function FilterForm({ filters }: { filters: Filters }) {
  return (
    <form action="/search" className="space-y-4 rounded-2xl border border-line bg-card p-5">
      <div>
        <label htmlFor="q" className={label}>
          Search
        </label>
        <input id="q" name="q" defaultValue={filters.q} placeholder="e.g. AAC, sensory gym" className={field} />
      </div>
      <div>
        <label htmlFor="service" className={label}>
          Type of care
        </label>
        <select id="service" name="service" defaultValue={filters.service ?? ""} className={field}>
          <option value="">Any type of care</option>
          <ServiceOptions />
        </select>
      </div>
      <div>
        <label htmlFor="where" className={label}>
          City, county or ZIP
        </label>
        <input id="where" name="where" defaultValue={filters.where} placeholder="e.g. Tampa" className={field} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="age" className={label}>
            Child&apos;s age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            inputMode="numeric"
            min={0}
            max={99}
            defaultValue={filters.age}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="funding" className={label}>
            Paying with
          </label>
          <select id="funding" name="funding" defaultValue={filters.funding ?? ""} className={field}>
            <option value="">Any</option>
            {FUNDING_PROGRAMS.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="condition" className={label}>
          Diagnosis or need
        </label>
        <select id="condition" name="condition" defaultValue={filters.condition ?? ""} className={field}>
          <option value="">Any</option>
          {CONDITIONS.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <fieldset className="space-y-1">
        <legend className={label}>Only show</legend>
        {(
          [
            ["accepting", "Accepting new patients"],
            ["telehealth", "Offers telehealth"],
            ["inHome", "Comes to your home"],
          ] as const
        ).map(([name, text]) => (
          <label key={name} className="flex min-h-11 items-center gap-3">
            <input
              type="checkbox"
              name={name}
              value="1"
              defaultChecked={filters[name]}
              className="h-5 w-5 accent-night"
            />
            {text}
          </label>
        ))}
      </fieldset>
      <div className="flex gap-3">
        <button type="submit" className="min-h-11 flex-1 rounded-full bg-night px-5 font-bold text-white hover:bg-night-2">
          Show results
        </button>
        <a href="/search" className="flex min-h-11 items-center rounded-full px-4 font-bold text-sky-text hover:underline">
          Clear
        </a>
      </div>
    </form>
  );
}
