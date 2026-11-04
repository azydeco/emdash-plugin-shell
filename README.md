# emdash-plugin-shell

A pnpm workspace containing four packages:

- **[`hosts/web-cloudflare`](hosts/web-cloudflare/README.md)** — The Emdash template site that is run locally for testing the plugin.
- **[`hosts/web-node`](hosts/web-node/README.md)** — The same Emdash template site on the Node adapter.
- **[`packages/emdash-plugin-native-example`](packages/emdash-plugin-native-example/README.md)** — @azydeco/emdash-plugin-native-example, a native emdash plugin.
- **[`packages/emdash-plugin-sandboxed-example`](packages/emdash-plugin-sandboxed-example/README.md)** — @example/emdash-plugin-example-listing, a sandboxed emdash plugin.

## Requirements

- **pnpm** - <https://pnpm.io/installation>

## Setup

```sh
pnpm i
pnpm build
```

Install the project's dependencies then run the build script, which builds the test sites and builds the plugins to the dist folder.

## Choosing the plugin format

Before you work on a plugin you will have to decide the plugins format, either sandboxed or native. Examples for both are given in this repository.

Native plugins are able to do things that sandboxed plugins cannot, such as render markup on the public site, use React components in the admin UI (the Media Library picker), and set a response status and headers. They can't be listed in the plugin registry and can only be distributed by packaging and publishing to npm. The release checklist and instructions on how to publish are in [docs/packaging.md](docs/packaging.md).

Sandboxed plugins are able to be published to the registry and installed from the Emdash admin UI. The Admin UI is limited to using block kit for layouts and cannot inject html, styles and scripts into pages. HTTP requests can be made if network access is declared in the emdash-plugin.jsonc file. Instructions for publishing a sandboxed plugin to the registry are in [docs/publishing-sandboxed.md](docs/publishing-sandboxed.md).

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
