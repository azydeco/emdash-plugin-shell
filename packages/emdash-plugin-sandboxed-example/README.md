# @example/emdash-plugin-example-listing

A **sandboxed** [EmDash](https://github.com/emdash-cms/emdash) plugin example that can be used to develop a new plugin.

## Install

The package is added as a dependency in hosts/web-cloudflare from the workspace.

```json
	"dependencies": {
		"@example/emdash-plugin-example-listing": "workspace:*",
	},
```

## Configure Astro

Register it in `astro.config.mjs`, in `sandboxed: []`:

```ts
import sandboxedPlugin from "@example/emdash-plugin-example";

export default defineConfig({
	integrations: [
		emdash({
			sandboxed: [sandboxedPlugin()],
		}),
	],
});
```
