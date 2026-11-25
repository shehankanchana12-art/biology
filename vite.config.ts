import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves this project under /biology/, not the domain root.
  base: "/biology/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [".style.dev"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          ui: ["react", "react-dom", "framer-motion"],
        },
      },
    },
  },
});
