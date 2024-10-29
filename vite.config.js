import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows Vite to listen on all network interfaces
    port: 5173, // Specify the port, optional
    strictPort: true, // Optional: prevent Vite from automatically changing ports
  },
});
