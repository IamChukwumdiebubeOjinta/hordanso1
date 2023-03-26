import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4190,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // vendor: ['react', 'react-dom', 'firebase'],
          // firebase: ["firebase"],
          // openai: ["openai"],
          // react: ["react", "react-dom"],
        },
      },
    },
  },
});
