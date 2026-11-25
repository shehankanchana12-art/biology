import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base so the same build works on a GitHub Pages project site
  // (/biology/) as well as on a custom domain or at the domain root.
  base: "./",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [".style.dev"],
  },
  build: {
    // No manualChunks: forcing react and three into separate chunks produced a
    // circular three -> ui -> three graph that crashed at startup in production
    // builds ("Cannot read properties of undefined (reading ...)") and left a
    // blank page. Let Rollup pick the chunking.
    chunkSizeWarningLimit: 1200,
  },
});
