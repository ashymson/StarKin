# Roadmap

Living checklist. Check items off as they land.

## Now: prototype
- [x] Next.js site, mobile-first, accessible font and contrast
- [x] Search and filters, provider pages, funding guide, "My village"
- [x] Star / moon badge system (our own badges, no program logos)
- [x] Sample data clearly labeled; database schema drafted
- [ ] Deploy a private preview (Vercel or Cloudflare)
- [ ] Pick a name; check domain, USPTO trademark and Sunbiz

## Validate (before building much more)
- [ ] Write the founder's own timeline: first concern → evaluation → diagnosis → therapies → funding → school
- [ ] Interview 10 parents (Florida special-needs and autism groups)
- [ ] List every directory parents already use and what each gets wrong
- [ ] Landing page with a waitlist sign-up

## Real data (one metro first)
- [ ] Choose the launch metro
- [ ] Collect real providers for speech, OT, PT and ABA in that metro
- [ ] Verify FES-UA acceptance against official sources; store how and when each was verified
- [ ] Move data to Supabase (apply `supabase/migrations/0001_init.sql`), read it from the site
- [ ] Location search by distance (ZIP → lat/lng)

## Providers
- [ ] Claim-your-listing flow (Supabase Auth magic link)
- [ ] Providers update accepting / waitlist status themselves
- [ ] Keep verification fields admin-only (the draft update policy lets a claimed provider edit every column)

## Families
- [ ] Accounts so "My village" follows a parent across devices
- [ ] Email alerts when a saved provider starts accepting new patients
- [ ] Other states' scholarship / ESA programs as funding records

## Before launch: legal and trust
- [ ] Healthcare attorney: confirm pricing complies with Florida's Patient Brokering Act and the federal Anti-Kickback Statute (flat fees only, never per referral)
- [ ] Step Up For Students: we use our own "Accepts FES-UA" wording and no logo; consider asking about a partnership
- [ ] Privacy policy; keep child health information to a minimum (FTC Health Breach Notification Rule)
- [ ] Complementary-care disclaimer reviewed
- [ ] Separate LLC owns the code, name and data
