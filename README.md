# [druz144.github.io](https://druz144.github.io)

## Local setup

Using [asdf](https://asdf-vm.com/):

```sh
asdf install
```

Without asdf: install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) with versions as specified in [.tool-versions](.tool-versions).

Install dependencies:

```sh
pnpm install
```

Run development app:

```sh
pnpm dev
```

Run static checks:

```sh
pnpm format:check
pnpm lint
pnpm typecheck
```

Run the Vitest suite (unit tests plus browser tests at desktop and mobile sizes):

```sh
pnpm exec playwright install chromium
pnpm test
```

Vitest uses Chromium through its Playwright provider for real browser layout and
keyboard checks. All order submissions are mocked. Browser tests mount the
shared app routes directly; a separate development server is not required.

Watch tests during development:

```sh
pnpm test:watch
```

Run only the unit tests (no browser installation needed):

```sh
pnpm test --project unit
```

Build app:

```sh
pnpm build
```

## Tech stack

- [pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Mantine](https://mantine.dev/)
- [Vitest](https://vitest.dev/)
