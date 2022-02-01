import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/background.ts",
    output: {
      file: "dist/background.js",
      format: "cjs",
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
