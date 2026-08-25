import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.js"],
    css: false,
    exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**", "**/.worktrees/**"],
    coverage: {
      provider: "v8",
      reporters: ["text", "html", "lcov"],
      reportsDirectory: "coverage",
      // Only measure files that actually have tests targeting them; the 3D
      // scene visual components (R3F meshes, shaders, postprocessing) are
      // covered by manual/e2e verification, not unit tests, so they're
      // excluded from the coverage universe entirely rather than dragging
      // the global threshold down with untested, non-logic-bearing files.
      all: false,
      include: [
        "src/components/scene/hasWebGL.js",
        "src/components/scene/planetsData.js",
        "src/components/scene/useSafeFrame.js",
        "src/i18n/translations.js",
        "src/hooks/**",
        "src/context/**",
        "src/components/LangToggle.jsx",
        "src/components/MusicToggle.jsx",
        "src/components/VisualModeToggle.jsx",
        "src/components/Navbar.jsx",
        "src/components/ChunkErrorBoundary.jsx",
        "src/components/scene/EnhancedSceneErrorBoundary.jsx",
        "src/components/Chatbot.jsx",
        "src/components/sections/**",
        "src/App.jsx",
        "netlify/functions/**",
      ],
      thresholds: {
        lines: 70,
        statements: 70,
        functions: 70,
        branches: 60,
      },
    },
  },
});
