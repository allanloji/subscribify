import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
// import "@testing-library/jest-dom";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ["./src/**/*.test.tsx", "./src/**/*.test.ts"],
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
