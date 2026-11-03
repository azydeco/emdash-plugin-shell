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
			handler: async (ctx) => {},
		},
	},
};

export default sandboxedPlugin;