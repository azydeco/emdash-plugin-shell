import type { BlockInteraction } from "@emdash-cms/blocks";
import type { SandboxedPlugin } from "emdash/plugin";

/**
 * Sandboxed plugin entry. The default export is a bare object; the
 * `satisfies SandboxedPlugin` annotation gives TypeScript per-hook /
 * per-route inference (`ctx` is `PluginContext` automatically; hook
 * `event` parameters are typed by hook name).
 */
const sandboxedPlugin: SandboxedPlugin = {
	routes: {
		admin: {
			handler: async (routeCtx, ctx) => {
				const interaction = routeCtx.input as BlockInteraction;

				if (interaction.type === "page_load") {
					return {
						blocks: [
							{
								type: "section",
								text: "Example sandboxed plugin. Modify plugin.ts",
							},
						],
					};
				}
				return {
					blocks: [],
				};
			},
		},
	},
};

export default sandboxedPlugin;
