# MPturai

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · deployed on Vercel.

Frontend only for now — data comes from `src/lib/data.ts`. Server logic and a
database get added later without touching the pages.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | What it does                           |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Dev server with hot reload             |
| `npm run build`     | Production build (same as Vercel runs) |
| `npm run start`     | Serve the production build             |
| `npm run lint`      | ESLint                                 |
| `npm run typecheck` | TypeScript, no output                  |
| `npm run format`    | Prettier, writes changes               |

Run `npm run lint && npm run typecheck` before every push — CI runs the same
checks and will block the PR otherwise.

## Structure

```
src/
  app/                 routes — folder + page.tsx = a URL
    layout.tsx         shell: header + footer, wraps every page
    page.tsx           /
    dashboard/page.tsx /dashboard
    about/page.tsx     /about
    error.tsx          shown when a page throws
    loading.tsx        shown while a page's data loads
    not-found.tsx      404
    globals.css        design tokens + Tailwind import
  components/
    ui/                button, card, container
    layout/            site header, site footer
  lib/
    config.ts          app name, description, nav links
    data.ts            temporary mock data (swap for a real backend here)
    utils.ts           cn(), formatDate()
  types/               shared TypeScript types
```

## Adding a page

Create `src/app/settings/page.tsx`:

```tsx
export default function SettingsPage() {
  return <div>Settings</div>;
}
```

That's it — `/settings` now exists. Add it to `nav` in `src/lib/config.ts` to
put it in the header.

## Styling

Colors are CSS variables in `src/app/globals.css`, exposed to Tailwind through
`@theme inline`. Use `bg-surface`, `text-muted`, `border-border` and friends.
Don't hardcode hex values in components — add a token instead, and dark mode
keeps working for free.

## Deployment

Every push to a branch gets a Vercel **preview URL** on its pull request.
Merging to `main` deploys to production. Environment variables are set in the
Vercel dashboard — `.env.local` is local-only and never committed.

## Team

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch/PR workflow.
