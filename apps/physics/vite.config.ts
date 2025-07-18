import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  assetsInclude: ["**/*.wasm"],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[hash][extname]",
        entryFileNames: "[name].[hash].js",
      },
    },
  },
});
