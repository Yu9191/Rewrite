import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

function buildBanner(name = "Script") {
	return {
		name: "build-banner",
		generateBundle(options, bundle) {
			const t = new Date(Date.now() + 8 * 3600000).toISOString().replace("T", " ").slice(0, 19);
			const banner = `/* ${name} - Build ${t} */\n`;
			for (const chunk of Object.values(bundle)) {
				if (chunk.type === "chunk") chunk.code = banner + chunk.code;
			}
		},
	};
}

export default [
	{
		input: "src/porntube.js",
		output: {
			file: "dist/porntube.js",
			format: "es",
		},
		plugins: [json(), nodeResolve({ dedupe: ["@nsnanocat/util"] }), commonjs(), terser(), buildBanner("porntube.js")],
	},
];
