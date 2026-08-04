# Working together

Three people, one repo. These rules exist so we never overwrite each other.

## Golden rules

1. **Never push to `main` directly.** Everything goes through a pull request.
2. **One branch per task.** Small and short-lived beats big and long-lived.
3. **Pull before you start.** `git checkout main && git pull` every single time.
4. **Claim your area.** Agree who owns which folders/pages so two people don't
   edit the same file on the same day.

## Daily flow

```bash
git checkout main
git pull
git checkout -b feat/login-form
# ...work...
npm run lint && npm run typecheck
git add -A
git commit -m "feat: add login form"
git push -u origin feat/login-form
```

Then open a PR on GitHub. Vercel posts a preview link on the PR — open it and
check the change actually works before asking for review.

After merge:

```bash
git checkout main
git pull
git branch -d feat/login-form
```

## Branch names

| Prefix      | Use for                        | Example               |
| ----------- | ------------------------------ | --------------------- |
| `feat/`     | new feature                    | `feat/user-profile`   |
| `fix/`      | bug fix                        | `fix/header-overflow` |
| `chore/`    | config, deps, tooling          | `chore/upgrade-next`  |
| `refactor/` | restructuring, no new behavior | `refactor/card-props` |

## Commit messages

`type: short description in present tense`

```
feat: add project status badges
fix: stop header from covering content on mobile
chore: add prettier config
```

## Reviews

- Every PR needs **one approval** from another teammate before merge.
- Reviewer checks: does it build, does the preview look right, is anything
  hardcoded that shouldn't be.
- Use **Squash and merge** so `main` history stays one commit per PR.

## Merge conflicts

Don't panic and don't force-push over someone's work.

```bash
git checkout main
git pull
git checkout your-branch
git merge main
# fix the conflicted files, then:
git add -A
git commit
git push
```

## Where things go

| Path                     | What belongs there                               |
| ------------------------ | ------------------------------------------------ |
| `src/app/`               | Pages and routes. A folder + `page.tsx` = a URL. |
| `src/components/ui/`     | Generic reusable pieces (button, card, input).   |
| `src/components/layout/` | Header, footer, sidebars.                        |
| `src/lib/`               | Helpers, config, data access.                    |
| `src/types/`             | Shared TypeScript types.                         |
| `public/`                | Static files (images, icons) served as-is.       |

If you need a new shared component, put it in `src/components/ui/` and tell the
others in chat so nobody builds a second version of it.
