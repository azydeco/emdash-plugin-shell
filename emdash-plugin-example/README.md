# @example/emdash-plugin-example

A **native** [EmDash](https://github.com/emdash-cms/emdash) plugin example that can be used to develop a new plugin.

Native plugins are able to do things that sandboxed plugins cannot, such as render markup on the public site, use React in the admin (the Media Library picker), and set a response status and headers.

## Install

The package is added as a dependency in emdash-site from the workspace.

```json
	"dependencies": {
		"@example/emdash-plugin-example": "workspace:*",
	},
```

If your plugin is listed on the npm registry you can add it with the command

```sh
pnpm add <package name>
```

## Configure Astro

Register it in `astro.config.mjs`, in `plugins: []` — **never** `sandboxed: []`:

```ts
import { examplePlugin } from "@example/emdash-plugin-example";

export default defineConfig({
	integrations: [
		emdash({
			plugins: [examplePlugin()],
		}),
	],
});
```
