const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");

const pkg = require("./package.json");

/** @type { import('rollup').RollupOptions[] } */
module.exports = [
  {
    input: "./src/index.ts",
    output: [
      {
        dir: "dist",
        entryFileNames: "[name].mjs",
        format: "esm",
      },
      {
        dir: "dist",
        entryFileNames: "[name].cjs",
        format: "cjs",
      },
    ],
    inlineDynamicImports: true,
    plugins: [typescript({ tsconfig: "tsconfig.json" }), json(), nodeResolve({ preferBuiltins: false }), commonjs()],
  },
];
