# React Object Calisthenics Demo

This is a **demo repository** illustrating Object Calisthenics principles in React with Bun, supporting my article:

<!-- - **Article:** [Designing React Apps with Object Calisthenics](https://your-article-link.com) -->

- **Live Demo:** [React Object Calisthenics Demo](https://arnaud-zg.github.io/react-object-calisthenics/)

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

Uses [TanStack Router](https://tanstack.com/router) with file-based routing in `src/routes`.

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

- Immutable Cart & Value Objects (Money, Quantity, Product)
- Object Calisthenics applied: no getters/setters, wrap primitives, first-class collections, single-level methods
- Reactive UI with Framer Motion for cart animations

Demo files are optional and can be deleted.

Learn more at [TanStack docs](https://tanstack.com).
