import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";

export default defineConfig(() => {
  return {
    build: {
      target: "esnext",
      lib: {
        entry: "./src/index.ts",
        formats: ["es"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: ["@builder.io/qwik", "js-interpreter"],
      },
    },
    plugins: [qwikVite()],
  };
});
