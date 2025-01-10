import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "My Agenda",
        short_name: "Agenda",
        description: "Application to management appointments and clients",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: "/icon-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "/icon-448x448.png",
            sizes: "448x448",
            type: "image/png"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache"
            }
          }
        ]
      }
    })
  ],
  test: {
    environment: "jsdom",
    globals: true,
    exclude: ["node_modules", "**/*.js"],
    maxConcurrency: 4,
    coverage: {
      include: ["**/src/**"],
      provider: "istanbul", // Usa la herramienta de cobertura c8
      reporter: ["text", "json", "lcov"], // Los reportes que generará
      all: true, // Cobertura de todo el código
      reportOnFailure: true,
      allowExternal: true,
      thresholds: {
        lines: 3, //80,
        branches: 3, //80,
        functions: 3, //80,
        statements: 3 //80
      }
    }
  }
});
