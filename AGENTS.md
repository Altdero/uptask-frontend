<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project

UpTask is a Jira-like project management app. Users create, update, and delete tasks organized by project. Each task has a status: `pending`, `onHold`, `inProgress`, `underReview`, `completed`. The app covers auth (login, register, confirm account, forgot/reset password), project CRUD, task CRUD with drag-and-drop by status, notes per task, team management per project, and user profile/password editing.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5 (strict)
- **Styling:** Tailwind CSS 4
- **Package manager:** yarn
- **Data fetching:** SWR + native Fetch API (no axios)
- **Forms:** react-hook-form + @hookform/resolvers + Zod v4
- **State:** MobX 6 + mobx-react-lite (class stores + makeAutoObservable + React Context)
- **UI:** @headlessui/react, @heroicons/react, sonner, input-otp
- **Drag & drop:** @dnd-kit/core + @dnd-kit/sortable + @dnd-kit/utilities
- **Linting:** ESLint 9 (flat config)
- **Formatting:** Prettier + prettier-plugin-tailwindcss
- **Git hooks:** Husky + lint-staged

Reference `package.json` for exact versions. Always consult `node_modules/next/dist/docs/` before implementing features.

## Project Structure

```
app/
├── layout.tsx                    # Root layout — providers + Toaster
├── globals.css
├── not-found.tsx                 # Global 404
├── (app)/                        # Protected route group (no URL segment)
│   ├── layout.tsx                # App shell — Navbar + auth guard
│   ├── page.tsx                  # Dashboard (/)
│   ├── projects/
│   │   ├── create/
│   │   │   └── page.tsx
│   │   └── [projectId]/
│   │       ├── page.tsx          # Project details
│   │       ├── edit/
│   │       │   └── page.tsx
│   │       └── team/
│   │           └── page.tsx
│   └── profile/
│       ├── layout.tsx            # Profile tab layout
│       ├── page.tsx
│       └── password/
│           └── page.tsx
└── auth/
    ├── layout.tsx                # Auth shell — centered, logo
    ├── login/page.tsx
    ├── register/page.tsx
    ├── confirm-account/page.tsx
    ├── request-code/page.tsx
    ├── forgot-password/page.tsx
    └── reset-password/page.tsx

components/
├── ui/
│   ├── icons/
│   ├── Navbar.tsx
│   └── ErrorMessage.tsx
├── auth/
├── projects/
├── tasks/
├── notes/
├── team/
└── profile/

src/
├── api/
│   ├── AuthAPI.ts
│   ├── ProjectAPI.ts
│   ├── TaskAPI.ts
│   ├── NoteAPI.ts
│   ├── TeamAPI.ts
│   └── ProfileAPI.ts
├── constants/
│   └── taskStatus.ts
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── schemas/
│   │   ├── authSchema.ts
│   │   ├── projectSchema.ts
│   │   ├── taskSchema.ts
│   │   ├── noteSchema.ts
│   │   └── teamSchema.ts
│   └── utils/
│       ├── fetcher.ts            # SWR GET fetcher
│       ├── apiFetch.ts           # Mutation helper (POST/PUT/DELETE)
│       └── validateAPIData.ts
├── providers/
│   ├── swr.provider.tsx
│   └── auth.provider.tsx
├── stores/
│   └── AuthStore.ts
└── types/
    └── index.ts                  # Re-exports all inferred Zod types

public/

.env.example
eslint.config.mjs
prettier.config.mjs
lint-staged.config.mjs
.prettierignore
```

## Naming Conventions

| Thing      | Convention                    | Example             |
| ---------- | ----------------------------- | ------------------- |
| Components | PascalCase                    | `TaskCard.tsx`      |
| Hooks      | camelCase prefixed `use`      | `useAuth.ts`        |
| Providers  | camelCase + `Provider` suffix | `auth.provider.tsx` |
| Schemas    | camelCase + `Schema` suffix   | `authSchema.ts`     |
| Stores     | PascalCase + `Store` suffix   | `AuthStore.ts`      |
| Types      | PascalCase + `Type` suffix    | `TaskStatusType`    |
| Interfaces | PascalCase prefixed `I`       | `IAuthState`        |
| Constants  | SCREAMING_SNAKE_CASE          | `TASK_STATUSES`     |
| Util files | camelCase                     | `fetcher.ts`        |
| API files  | PascalCase + `API` suffix     | `AuthAPI.ts`        |

## Architectural Decisions

**CSR only — no SSR for authenticated data**
Auth token lives in `localStorage` (unavailable on server). All data-fetching components must be client components. SWR handles caching and revalidation on the client.

**MobX for auth state only**
`AuthStore` holds the current user. It is the only global client state needed — SWR manages server state. Pattern: `class` + `makeAutoObservable` → `useState(() => new Store())` in provider → React Context → custom hook with guard.

**SWR + Fetch API for all data fetching**
`fetcher.ts` handles GET requests (reads `AUTH_TOKEN` from localStorage, adds Bearer header). `apiFetch.ts` handles mutations (POST/PUT/DELETE). SWR keys are API path strings (base URL added by fetcher).

**Route groups for layouts**
`(app)/` groups all protected routes under a shared shell (Navbar, auth guard) without adding a URL segment. `auth/` has its own centered shell.

**Zod schemas drive types**
Define schemas in `src/lib/schemas/`, infer types with `z.infer<>`, re-export from `src/types/index.ts`. No manual type duplication.

## Coding Conventions

**TypeScript**

- Strict mode enabled
- Use `@/*` path alias for all imports
- `.tsx` for files with JSX, `.ts` for logic-only files
- Import types with `import type` when the import is type-only
- Derive union types from constant objects with `keyof typeof`

**Styling**

- Tailwind CSS utility-first; avoid custom CSS
- Dynamic colors must use `style={{ ... }}` — never interpolate values into Tailwind class strings

**React Patterns**

- Server Components by default; add `"use client"` only when necessary (interactivity, hooks, browser APIs)
- Push `"use client"` to the leaves — pages and layouts stay as Server Components; extract only the interactive parts (forms, controlled inputs) into dedicated Client Components under `components/`
- Never call `setState` synchronously inside a `useEffect` body
- Never call `router.push/replace` during render — use event handlers or `useEffect`

**Forms**

- react-hook-form for all form state
- Zod schemas for validation via `@hookform/resolvers/zod`
- Schemas colocated in `src/lib/schemas/`

**Toast Notifications**

- Sonner for all user-facing feedback
- `toast.error()` for API failures
- Call inside event handlers or `useEffect` — never during render

**ESLint / Prettier**

- Flat config (ESLint v9+)
- `yarn lint` to check, `yarn format` to auto-fix
- Husky runs lint-staged on `git commit`, `yarn validate` on `git push`

## API Endpoints (from reference backend)

| Domain   | Method | Path                                        |
| -------- | ------ | ------------------------------------------- |
| Auth     | POST   | `/auth/create-account`                      |
| Auth     | POST   | `/auth/confirm-account`                     |
| Auth     | POST   | `/auth/login`                               |
| Auth     | POST   | `/auth/request-code`                        |
| Auth     | POST   | `/auth/forgot-password`                     |
| Auth     | POST   | `/auth/validate-token`                      |
| Auth     | POST   | `/auth/update-password/:token`              |
| Auth     | GET    | `/auth/user`                                |
| Auth     | PUT    | `/auth/profile`                             |
| Auth     | POST   | `/auth/update-password`                     |
| Auth     | POST   | `/auth/check-password`                      |
| Projects | GET    | `/projects`                                 |
| Projects | POST   | `/projects`                                 |
| Projects | GET    | `/projects/:id`                             |
| Projects | PUT    | `/projects/:id`                             |
| Projects | DELETE | `/projects/:id`                             |
| Tasks    | POST   | `/projects/:id/tasks`                       |
| Tasks    | GET    | `/projects/:id/tasks/:taskId`               |
| Tasks    | PUT    | `/projects/:id/tasks/:taskId`               |
| Tasks    | DELETE | `/projects/:id/tasks/:taskId`               |
| Tasks    | POST   | `/projects/:id/tasks/:taskId/status`        |
| Notes    | POST   | `/projects/:id/tasks/:taskId/notes`         |
| Notes    | DELETE | `/projects/:id/tasks/:taskId/notes/:noteId` |
| Team     | GET    | `/projects/:id/team`                        |
| Team     | POST   | `/projects/:id/team/find`                   |
| Team     | POST   | `/projects/:id/team`                        |
| Team     | DELETE | `/projects/:id/team/:userId`                |

## Environment Variables

```
API_URL=http://localhost:4000/api
```

## Development Workflow

```bash
yarn dev          # Start dev server at http://localhost:3000
yarn build        # Build for production
yarn start        # Run production server
yarn lint         # ESLint (reports only)
yarn format       # Prettier + Tailwind class sorting
yarn typecheck    # Type-check without building
yarn validate     # lint + typecheck + build
yarn prepare      # Set up Husky git hooks
```

**Pre-commit:** Husky runs lint-staged — catches ESLint violations and formatting issues.
**Pre-push:** Husky runs `yarn validate` — ensures lint, typecheck, and build all pass.

## Rules for Agents

1. **Read `AGENTS.md` first.** Do not assume conventions from training data.
2. **Read the relevant files before editing them.** Never modify based only on prompt context.
3. **Never create files outside the established structure.** Ask first if a new directory seems necessary.
4. **Follow naming conventions exactly.**
5. **Do not add `"use client"` without justification.** Server Components are the default.
6. **Do not introduce new dependencies without asking.**
7. **Always run `yarn validate` before considering a task done.**
8. **Fix any errors introduced before responding.** Do not hand back broken code.
