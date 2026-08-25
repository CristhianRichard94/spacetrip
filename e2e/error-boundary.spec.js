import { test } from "@playwright/test";

// There is no dev-only prop or query param wired up in this codebase to
// deliberately trigger ChunkErrorBoundary or EnhancedSceneErrorBoundary from
// the outside (they only catch errors from lazy chunk-load failures or
// thrown render errors inside the enhanced 3D scene, both internal to the
// component tree). Forcing either path in a black-box e2e test would require
// adding a test-only hook to production code, which is out of scope here.
// This fallback behavior is covered instead at the unit/integration level in
// src/components/ChunkErrorBoundary.test.jsx and
// src/components/scene/EnhancedSceneErrorBoundary.test.jsx.
test.skip("error boundary fallback — covered by component-level tests instead", () => {});
