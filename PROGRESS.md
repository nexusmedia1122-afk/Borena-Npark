# Borana National Park — PROGRESS.md

## Sprint Status: Day 1 Complete — Next.js Migration + Public Homepage + Admin CMS Scaffold

### Completed
- Migrated from Vite + React to Next.js 15 + TypeScript + App Router
- Installed and configured: Tailwind CSS, shadcn/ui components, Lucide icons, Motion, Leaflet, React Hook Form, Zod
- Custom design tokens in `tailwind.config.ts` (forest, charcoal, earth, sand, ivory, gold palette)
- Global layout: `src/app/layout.tsx` with Inter font, AuthProvider, offline indicators, install prompt, data saver toggle
- SiteHeader with responsive mobile nav and CTA
- SiteFooter with contact info and social links
- Homepage with all sections: Hero, Explore (Wildlife/Culture/Conservation/Experiences), Wildlife highlights, Landscape storytelling, Experiences, Culture, Conservation, Stories, Gallery, Plan Your Visit CTA
- Public pages: Wildlife (list + detail), Stories (list + detail), Gallery with lightbox, Map with Leaflet + category filters, Contact form, About, Culture, Conservation, Experiences, Offline fallback
- Supabase client with env-based configuration
- Database schema in `supabase/migrations/20240101_initial_schema.sql` with RLS policies
- Auth context with role-based access (admin/editor/viewer)
- Admin layout with sidebar, auth guard, responsive mobile support
- Admin pages: Dashboard (stats + activity), Wildlife CRUD, Stories CRUD, Gallery/Media management, Locations CRUD, Messages, Settings
- `OptimizedImage` component with Next.js Image, fill, lazy loading
- Offline components: status indicator, back-online indicator, install prompt, save-for-offline modal, data saver toggle
- `useDataSaver` hook with localStorage persistence
- Production build passes cleanly (14 static pages + 9 dynamic admin routes)

### Key Decisions
- Stack: Next.js 15 + TypeScript + Tailwind + shadcn/ui
- Database: Supabase Postgres with RLS
- Auth: Supabase Auth with role-based access
- Images: External Unsplash placeholders for demo; CMS-ready for Supabase Storage
- Maps: Leaflet + OpenStreetMap (no token required)
- Admin layout split into server wrapper (`layout.tsx` with `dynamic = 'force-dynamic'`) + client component (`admin-layout-client.tsx`) to avoid prerender errors
- Supabase client gracefully handles missing env vars; `.env` and `.env.local` with placeholders committed for build

### Placeholders Requiring Real Data
- Wildlife species: [INSERT VERIFIED WILDLIFE INFORMATION]
- GPS coordinates: [VERIFY GPS COORDINATES]
- Park area, fees, hours, contacts: [VERIFY OFFICIAL PARK DATA]
- Cultural content: [NEEDS COMMUNITY/OFFICIAL REVIEW]
- Photos: Replace placeholder Unsplash URLs with official park photography

### Demo Content Volume (fixed)
- 8–10 wildlife species
- 3–4 stories
- 12–15 gallery images
- 6–8 map locations

### What's Next (Day 2)
1. Connect real Supabase project and run migration SQL
2. Seed demo content (wildlife, stories, gallery images, map locations)
3. Test CMS end-to-end: Admin adds wildlife → publishes → appears on public /wildlife
4. PWA setup: next-pwa for production service worker
5. Image optimization: blur placeholders, responsive sizes, AVIF/WebP
6. Performance audit: Lighthouse targets, bundle analysis
7. Mobile responsiveness testing
8. Accessibility pass: focus states, alt text, semantic headings

### Current Blockers
- Supabase project not connected (using placeholders)
- Real content not loaded
- PWA service worker not yet configured for Next.js
