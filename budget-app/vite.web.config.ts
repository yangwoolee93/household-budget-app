import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 웹 전용 설정 (Electron 플러그인 제외)
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    outDir: "dist-web",
  },
});
