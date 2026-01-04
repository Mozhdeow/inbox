## Getting Started

First, run the development server:

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical decisions

### UI components

shadcn/ui (built on top of Radix UI) was selected because it:

Follows accessibility best practices

Provides full control over component code

Avoids dependency on heavy, opinionated UI libraries

Integrates naturally with Tailwind CSS

### Styling

Tailwind CSS is used to enable fast development and consistent styling.

### State management and data handling

Local React state is used, as it is sufficient for the scope of this project.

Global state management was intentionally avoided to reduce unnecessary complexity.

UI states such as loading, error, empty are handled explicitly.

### Ticket pinning

Pinned tickets are always displayed at the top of the list.

Sorting order (newest/oldest) is preserved within pinned and unpinned groups.

Pin state is persisted using localStorage.

### Potential improvements

Given more time, the following improvements would be considered:

User interface customization, such as selectable or uploadable background images

Dark mode support

A dedicated page for pinned tickets with independent filtering

Bulk actions for tickets

Performance optimizations for large ticket lists