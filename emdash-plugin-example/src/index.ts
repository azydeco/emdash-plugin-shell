import { definePlugin } from "emdash";
import type { PluginDescriptor } from "emdash";
import type { SandboxedPlugin, PluginContext } from "emdash/plugin";

export interface ExamplePluginOptions {
	logUpdates?: boolean;
}

export function examplePlugin(
	options: ExamplePluginOptions = {},
): PluginDescriptor<ExamplePluginOptions> {
	return {
		id: "emdash-plugin-example",
		version: "0.1.0",
		format: "native",
		entrypoint: "@example/emdash-plugin-example",
		options,
	};
}

export function createPlugin(options: ExamplePluginOptions = {}) {
	return definePlugin({
		id: "emdash-plugin-example",
		version: "0.1.0",
		capabilities: ["content:read"],
		hooks: {
			"content:afterSave": async (event, ctx) => {
				if (!event.isNew && options.logUpdates === false) return;

				ctx.log.info("Content saved", {
					collection: event.collection,
					contentId: event.content.id,
					isNew: event.isNew,
				});
			},
		},
	});
}

/**
 * Sandboxed plugin entry. The default export is a bare object; the
 * `satisfies SandboxedPlugin` annotation gives TypeScript per-hook /
 * per-route inference (`ctx` is `PluginContext` automatically; hook
 * `event` parameters are typed by hook name).
 */
const sandboxedPlugin: SandboxedPlugin = {
	routes: {
		admin: {
			handler: async (ctx) => {},
		},
	},
};

export default sandboxedPlugin;
// export default createPlugin;
