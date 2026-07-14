import { useEffect, useState } from "react";
import hasWebGL from "./hasWebGL.js";
import SolarSystemScene from "./SolarSystemScene.jsx";
import SolarSystemSceneEnhanced from "./SolarSystemScene.enhanced.jsx";
import EnhancedSceneErrorBoundary from "./EnhancedSceneErrorBoundary.jsx";
import { useSceneModeContext } from "../../context/SceneModeContext.jsx";

function SceneRoot() {
  const {
    mode,
    prefersReducedMotion,
    lowEndDevice,
    setLoading,
    fallbackToClassic,
    isEnhancedUnsupportedThisSession,
  } = useSceneModeContext();
  const [webGLAvailable] = useState(() => hasWebGL());
  const [errorResetKey, setErrorResetKey] = useState(0);

  const wantsEnhanced = mode === "enhanced" && !isEnhancedUnsupportedThisSession();

  // Never let the classic and enhanced trees render Canvases at the same
  // time. Each Canvas holds its own WebGL context, and mounting a new one
  // before the previous one has actually unmounted (and the browser/GPU
  // driver has had a chance to release the old context) can trigger a
  // genuine `webglcontextlost` on the incoming context, especially on
  // repeated rapid toggles. `displayedTree` tracks what is currently
  // mounted; on a mode change we first unmount (render nothing) and only
  // mount the new tree on a later frame, once the old Canvas is fully gone.
  const targetTree = wantsEnhanced ? "enhanced" : "classic";
  const [displayedTree, setDisplayedTree] = useState(targetTree);

  useEffect(() => {
    if (targetTree === displayedTree) return undefined;

    // Unmount whatever is currently shown...
    setDisplayedTree(null);

    // ...then mount the target tree on the next animation frame, giving the
    // browser a paint/tick to tear down the previous WebGL context first.
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setDisplayedTree(targetTree);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [targetTree, displayedTree]);

  useEffect(() => {
    // Cover both the unmount/remount gap (any direction) and, for enhanced,
    // the async shader/texture compile after remount — cleared by onReady.
    if (targetTree !== displayedTree || wantsEnhanced) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [targetTree, displayedTree, wantsEnhanced, setLoading]);

  if (!webGLAvailable) {
    return <div className="webgl webgl-fallback" aria-hidden="true" />;
  }

  if (displayedTree === null) {
    // Brief gap between unmounting the old Canvas and mounting the new one.
    return null;
  }

  if (displayedTree !== "enhanced") {
    return <SolarSystemScene />;
  }

  return (
    <EnhancedSceneErrorBoundary
      resetKey={errorResetKey}
      onError={() => {
        fallbackToClassic();
        setErrorResetKey((key) => key + 1);
      }}
    >
      <SolarSystemSceneEnhanced
        prefersReducedMotion={prefersReducedMotion}
        lowPower={prefersReducedMotion || lowEndDevice}
        onReady={() => setLoading(false)}
        onContextLost={() => fallbackToClassic()}
      />
    </EnhancedSceneErrorBoundary>
  );
}

export default SceneRoot;
