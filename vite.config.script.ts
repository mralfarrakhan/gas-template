import gasPlugin from "@gas-plugin/unplugin/vite";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  plugins: [gasPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(`v${pkg.version}`),
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/script/main.ts",
      formats: ["es"],
      fileName: () => "Code.js",
    },
  },
});
