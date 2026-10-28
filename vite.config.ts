import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  // Polices intégrées au CSS : une seule page à servir, y compris hors ligne.
  build: { assetsInlineLimit: 200_000 },
});
