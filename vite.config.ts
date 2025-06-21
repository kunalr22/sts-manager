import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import "dotenv/config.js";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-react",
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
    strictPort: true,
  }
})
