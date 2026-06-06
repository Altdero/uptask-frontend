# UpTask

A Jira-like project management application built with **Next.js 16**, **React 19**, and **TypeScript** — personal portfolio project for learning and practice.

## Features

- User authentication — register, login, confirm account, forgot/reset password
- Project CRUD — create, edit, and delete projects with client and description
- Task management — create, edit, delete, and update task status per project
- Drag-and-drop — reorder tasks across status columns
- Notes — add and delete notes per task
- Team management — invite and remove team members per project
- Profile — edit name, email, and password

## Task Statuses

`Pending` → `On Hold` → `In Progress` → `Under Review` → `Completed`

## Tech Stack

| Layer         | Library                    | Version |
| ------------- | -------------------------- | ------- |
| Framework     | Next.js (App Router)       | 16.x    |
| UI            | React                      | 19.x    |
| Language      | TypeScript (strict)        | 5.x     |
| Styling       | Tailwind CSS               | 4.x     |
| State         | MobX + mobx-react-lite     | 6.x     |
| Data fetching | SWR + Fetch API            | 2.x     |
| Forms         | react-hook-form + Zod      | latest  |
| UI Components | Headless UI + Heroicons    | latest  |
| PIN input     | input-otp                  | latest  |
| Drag & drop   | @dnd-kit                   | latest  |
| Toast         | Sonner                     | latest  |
| Linting       | ESLint (flat config)       | 9.x     |
| Formatting    | Prettier + Tailwind plugin | —       |
| Git hooks     | Husky + lint-staged        | —       |

## Quick Start

### Prerequisites

- Node.js 18+
- yarn

### Installation

```bash
yarn install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable                    | Description           | Example                     |
| --------------------------- | --------------------- | --------------------------- |
| `API_URL`                   | Backend API URL       | `http://localhost:4000/api` |
| `NEXT_PUBLIC_DEMO_EMAIL`    | Demo account email    | `demo@uptask.com`           |
| `NEXT_PUBLIC_DEMO_PASSWORD` | Demo account password | `demo12345678`              |

### Run

```bash
yarn dev       # http://localhost:3000
```

## Project Structure

```
app/
├── layout.tsx                    # Root layout — providers + Toaster
├── globals.css
├── not-found.tsx
├── (app)/                        # Protected routes
│   ├── layout.tsx                # App shell — Navbar
│   ├── page.tsx                  # Dashboard
│   ├── projects/
│   │   ├── create/page.tsx
│   │   └── [projectId]/
│   │       ├── page.tsx          # Project details
│   │       ├── edit/page.tsx
│   │       └── team/page.tsx
│   └── profile/
│       ├── layout.tsx            # Tab layout
│       ├── page.tsx
│       └── password/page.tsx
└── auth/
    ├── layout.tsx
    ├── login/page.tsx
    ├── register/page.tsx
    ├── confirm-account/page.tsx
    ├── request-code/page.tsx
    ├── forgot-password/page.tsx
    └── new-password/page.tsx

components/
├── ui/                           # Shared UI (Navbar, NavMenu, ErrorMessage, icons)
├── app/                          # Feature components for protected routes
│   ├── notes/
│   ├── profile/
│   ├── projects/
│   ├── tasks/
│   └── team/
└── auth/                         # Auth form components

src/
├── api/                          # Fetch-based API functions per domain
├── constants/                    # App-wide constants
├── hooks/                        # useAuth, useGetData, useCanEdit
├── lib/
│   ├── schemas/                  # Zod schemas
│   └── utils/                    # fetcher, apiFetch, errors, formatDate
├── providers/                    # SWR and auth providers
├── stores/                       # MobX AuthStore
└── types/                        # Inferred TypeScript types
```

## Development Commands

```bash
yarn dev          # Start dev server (http://localhost:3000)
yarn build        # Build for production
yarn start        # Run production server
yarn lint         # Run ESLint
yarn format       # Prettier + Tailwind class sorting
yarn typecheck    # Type-check without building
yarn validate     # lint + typecheck + build
yarn prepare      # Set up Husky git hooks
```

## License

This project is part of a personal portfolio.
