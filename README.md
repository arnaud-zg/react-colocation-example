# React Object Calisthenics Demo

This is a **demo repository** illustrating **Object Calisthenics principles** in React using Bun.

It demonstrates how keeping objects small, simple, and focused makes your React code easier to understand and maintain.

<!-- - **Article:** [Designing React Apps with Object Calisthenics](https://your-article-link.com) -->

- **Live Demo:** [React Object Calisthenics Demo](https://arnaud-zg.github.io/react-object-calisthenics/)

## What is it?

This site is a hands-on demo showing how to apply **Object Calisthenics** in a front-end app. You'll see how:

- Keeping objects small, simple, and focused makes React code more maintainable.
- Reactive UI can be achieved with TanStack Router and Zustand.
- Frontend architecture can be organized around **value objects** and single-responsibility principles.

Take a few moments to explore the interactive experience, then dive into the code to see these principles in action.

## Implementations

- **Welcome Survey**
  - Object Calisthenics applied with `WelcomeSurvey`
  - Persistent state with **local storage**, **TanStack Router**, and **Zustand**
- **Cart:** Object Calisthenics applied with `Cart`

## Folder Overview

```
src/
├── app/             # Entry point & routes
├── domain/          # Cart & currency logic, value objects
├── ui/              # Components & primitives
├── lib/             # Utilities
├── assets/          # Images
└── styles/          # CSS
```

## Getting Started (Bun)

```bash
bun install
bunx --bun run start
```

## Build for Production

```bash
bunx --bun run build
```

## Testing

Uses [Vitest](https://vitest.dev/):

```bash
bunx --bun run test
```

## Styling

Uses [Tailwind CSS](https://tailwindcss.com/)

## Linting & Formatting

Uses [Biome](https://biomejs.dev/)

```bash
bunx --bun run lint
bunx --bun run format
bunx --bun run check
```

## Components

Uses [Shadcn UI](https://ui.shadcn.com/)

```bash
pnpx shadcn@latest add button
```

## Routing

Uses [TanStack Router](https://tanstack.com/router) with **file-based routing** in `src/routes`.

### Adding Routes

Add a new file in `./src/routes` and TanStack will regenerate the route tree.

### Layouts

Root layout in `src/routes/__root.tsx` using `<Outlet />` for nested routes.

## Data Fetching

Supports TanStack Router loaders or React Query.

```bash
bun install @tanstack/react-query @tanstack/react-query-devtools
```

## State Management

Supports [TanStack Store](https://tanstack.com/store/latest) for reactive state.

## Notes

- Immutable **Cart** with **Value Objects** (`Money`, `Quantity`, `Product`, `ShippingPolicy`, `TaxPolicy`, `GoldSilverCopperFormatter`)
- Immutable **Welcome Survey** with **Value Objects** (`Skill`)
- Object Calisthenics applied: no getters/setters, wrap primitives, first-class collections, single-level methods
- Reactive UI with Framer Motion for cart animations

Learn more at [TanStack docs](https://tanstack.com)."
