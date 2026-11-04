# @azydeco/emdash-plugin-native-example

A **native** [EmDash](https://github.com/emdash-cms/emdash) plugin example that can be used to develop a new plugin.

Native plugins are able to do things that sandboxed plugins cannot, such as render markup on the public site, use React in the admin (the Media Library picker), and set a response status and headers.

## Install

The package is added as a dependency in hosts/web-cloudflare from the workspace.

```json
"dependencies": {
	"@azydeco/emdash-plugin-native-example": "workspace:*",
},
```

If your plugin is listed on the npm registry you can add it with the command.

```sh
pnpm add <package name>
```

## Configure Astro

Register it in `astro.config.mjs`, in `plugins: []` — **never** `sandboxed: []`:

```ts
import { examplePlugin } from "@azydeco/emdash-plugin-native-example";

export default defineConfig({
	integrations: [
		emdash({
			plugins: [examplePlugin()],
		}),
	],
});
```

## Modifying the example native plugin

The code for the native plugin is defined in `src/index.ts`. It includes the plugins id, version, capabilities and hooks. The example code with the `content:afterSave` hook requires the `content:read` capability, and if the capability is removed the hook will be skipped.

Settings can be added to the native plugin by passing admin.settingsSchema into the definePlugin function.

```ts
return definePlugin({
	admin: {
		settingsSchema: {
			exampleName: {
				type: "string",
				label: "Example name",
				description: "Example name input for native plugin settings",
			},
		},
	},
});
```

Values from the settings can then be used in the code by getting them from the plugin context.

```ts
const exampleName = (await ctx.settings.get<string>("exampleName")) ?? "";
```
