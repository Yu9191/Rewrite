import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
const buildTime = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

export default [
	{
		input: "src/insav.js",
		output: {
			file: "dist/insav.js",
			format: "es",
			banner: `/* insav.js - Build ${buildTime} */`,
		},
		plugins: [json(), nodeResolve({ dedupe: ["@nsnanocat/util"] }), commonjs(), terser({ format: { comments: /^!|insav\.js/ } })],
	},
];
