import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSceneModeContext } from "../../context/SceneModeContext.jsx";

// React error boundaries only catch errors thrown during React's own
// render/commit phases. `useFrame` callbacks run inside react-three-fiber's
// internal requestAnimationFrame loop, outside that lifecycle, so an
// exception thrown there escapes `EnhancedSceneErrorBoundary` entirely and
// can hang the enhanced scene with no fallback (the render loop stops, but
// nothing tells the user or switches them back to classic view).
//
// This hook wraps a per-frame callback in try/catch and, on error, routes
// through the same fallback path used for WebGL context loss so the user
// always ends up back in a working classic view instead of a frozen scene.
function useSafeFrame(callback, deps) {
  const { fallbackToClassic } = useSceneModeContext();
  const hasFailedRef = useRef(false);

  useFrame((state, delta, frame) => {
    if (hasFailedRef.current) return;
    try {
      callback(state, delta, frame);
    } catch (error) {
      hasFailedRef.current = true;
      // eslint-disable-next-line no-console
      console.error("Enhanced scene frame error, falling back to classic view:", error);
      fallbackToClassic();
    }
  }, deps);
}

export default useSafeFrame;
