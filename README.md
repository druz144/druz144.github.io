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

Run browser regression tests (checkout requests are mocked):

```sh
pnpm exec playwright install chromium
pnpm test
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
