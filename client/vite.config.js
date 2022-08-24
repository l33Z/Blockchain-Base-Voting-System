import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/registervoter": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/api/loginvoter": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/api/welcomee": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/api/voteregistration": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/api/logout": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/api/addcandidate": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/api/allcandidates": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
