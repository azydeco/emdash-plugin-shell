# emdash-plugin-shell

A pnpm workspace containing four packages:

- **[`hosts/web-cloudflare`](hosts/web-cloudflare/README.md)** — The Emdash template site that is run locally for testing the plugin.
- **[`hosts/web-node`](hosts/web-node/README.md)** — The same Emdash template site on the Node adapter.
- **[`emdash-plugin-example`](packages/emdash-plugin-example/README.md)** — @example/emdash-plugin-example, a native emdash plugin.
- **[`emdash-plugin-sandboxed-example`](packages/emdash-plugin-sandboxed-example/README.md)** — @example/emdash-plugin-example-listing, a sandboxed emdash plugin.


## Requirements

- **pnpm** - <https://pnpm.io/installation>

## Setup

```sh
pnpm i
pnpm build
```

Install the project's dependencies then run the build script, which builds the site and builds the plugin to the dist folder.

## Testing locally

```sh
pnpm dev
```

After having built the plugin, run dev to start the emdash site on localhost.

In a browser go to <http://127.0.0.1:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin> to open the Emdash admin UI without having to set up a passkey.

On the sidebar find and open the Plugins tab, or go to <http://localhost:4321/_emdash/admin/plugins-manager>. You should see emdash-plugin-example listed.

## Commands

| Command       | Does                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| `pnpm dev`    | Starts the packages web-cloudflare and web-node's dev servers on locahost.    |
| `pnpm build`  | Builds each workspace package that has a `build` script in its package.json.  |
| `pnpm test`   | Runs test scripts in each workspace package that has them.                    |
| `pnpm format` | Formats the workspace with oxfmt and prettier.                                |
