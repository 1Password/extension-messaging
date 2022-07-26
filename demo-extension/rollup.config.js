import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/background.ts",
    output: {
      file: "dist/background.js",
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
