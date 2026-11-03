import { definePlugin } from "emdash";
import type { PluginDescriptor } from "emdash";

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

export default createPlugin;
