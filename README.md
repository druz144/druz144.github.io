# druz144 docs

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
pnpm format
pnpm lint
pnpm typecheck
```

Build app:

```sh
pnpm build
```
