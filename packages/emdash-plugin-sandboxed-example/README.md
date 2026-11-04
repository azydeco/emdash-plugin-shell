# @example/emdash-plugin-example-listing

A **sandboxed** [EmDash](https://github.com/emdash-cms/emdash) plugin example that can be used to develop a new plugin.

If you plan on using this package to develop your own plugin first change the slug, name, author and security in [emdash-plugin.jsonc](emdash-plugin.jsonc).

## Install

The package is added as a dependency in hosts/web-cloudflare from the workspace.

```json
	"dependencies": {
		"@example/emdash-plugin-example-listing": "workspace:*",
	},
```

This works because the packages entry in pnpm-workspace.yaml at the root of the project.

```yaml
packages:
  - packages/*
  - hosts/*
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

## Modifying the example sandboxed plugin

The emdash-plugin.jsonc file is the manifest that defines the sandboxed plugins slug, name, description, capabilities and admin pages and determines how it appears on the registry once it is published.

| emdash-plugin.jsonc field         | Registry                |
| --------------------------------- | ----------------------- |
| `name` and `description`          | Name, tagline and About |
| `listing/description.md`          | Description section     |
| `listing/installation.md`         | Installation section    |
| `icon.png` (256×256 PNG)          | Icon                    |
| `release.artifacts.screenshots`   | Screenshots             |
| `capabilities` and `allowedHosts` | Permissions             |

The pages are listed on the Emdash admin UI sidebar and more can be added in the same plugin.

```json
	"admin": {
		"pages": [
			{
				"path": "/settings",
				"label": "Sandboxed Example",
				"icon": "image",
			},
		],
	},

```

The example in `src/plugin.ts` contains an exported SandboxedPlugin object with a handler that returns block kit objects when the page is loaded. All of your code can be written to this file or imported from other files in the package for readability.
