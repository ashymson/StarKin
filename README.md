# StarKin (working name)

One place for parents and guardians of children with disabilities to find
therapies, doctors, complementary care and family support, and the funding
programs that pay for them. Starting in Florida, with badges for providers who
accept the FES-UA scholarship.

**Status:** prototype. All provider listings are fictional sample data.

## What's here

| Page | What it does |
| --- | --- |
| `/` | Home: search box, how it works, badge legend, browse by type of care |
| `/search` | Filter by type of care, location, age, funding, diagnosis, telehealth, in-home, accepting new patients. Plain GET form, works without JavaScript |
| `/providers/[slug]` | Provider details, ways to pay, last-verified date |
| `/funding` | Plain-language guide to FES-UA, Medicaid, insurance and self-pay |
| `/my-village` | The providers a parent saved (stored in the browser for now) |
| `/for-providers` | Pitch for providers to claim their listing, with the waitlist form (role preset to provider) |
| `/waitlist` | What we're building, the founder's story, and the waitlist sign-up (email, role, ZIP) |

Badges: a gold **star** means accepting new patients; a **moon** means the
provider accepts a scholarship program. These are our own badges, never a
program's logo.

## Run it

```
npm install
npm run dev      # http://localhost:3000
npm test         # search/filter unit tests
npm run build
```

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4.

## Where things live

- `src/lib/site.ts`: the name and tagline. Renaming the product starts here.
- `src/lib/data/`: services, conditions, funding programs and sample providers.
- `src/lib/search.ts`: filtering and ranking (accepting first, then shortest waitlist).
- `src/lib/village.ts`: "My village" saved list.
- `supabase/migrations/0001_init.sql`: database schema for when real data moves to Supabase.
- `src/lib/waitlist.ts`, `src/lib/waitlist-store.ts`, `src/app/waitlist/`: waitlist validation, saving and page.

## Connect the waitlist to Supabase

1. In a Supabase project, run `supabase/migrations/0002_waitlist.sql` (SQL Editor, or `supabase db push`).
2. Set two environment variables (in `.env.local`, and in your host's settings when deployed):
   ```
   SUPABASE_URL=https://<project>.supabase.co
   SUPABASE_ANON_KEY=<the project's anon / publishable key>
   ```
3. Sign-ups appear in the `waitlist` table (Table Editor). The site's key can only add rows, never read them.

Without these variables, `npm run dev` prints each sign-up to the terminal instead of saving it, and a
production build shows visitors a "couldn't save" message, so connect Supabase before sharing the link.
- `docs/ROADMAP.md`: what's next, including legal checks before launch.
