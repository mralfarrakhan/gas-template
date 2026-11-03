import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import pkg from "./package.json";

export default defineConfig({
  plugins: [tailwindcss(), preact(), viteSingleFile()],
  define: {
    __APP_VERSION__: JSON.stringify(`v${pkg.version}`),
  },
  root: "src/ui",
  build: {
    outDir: resolve(import.meta.dirname, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(import.meta.dirname, "src/ui/Index.html"),
    },
  },
});
