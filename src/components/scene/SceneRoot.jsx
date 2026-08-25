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
  const [webGLAvailable, setWebGLAvailable] = useState(() => hasWebGL());
  const [errorResetKey, setErrorResetKey] = useState(0);

  useEffect(() => {
    if (webGLAvailable) return undefined;

    // hasWebGL() is a one-shot synchronous getContext() call. A transient
    // condition at that exact instant — the browser's WebGL context limit
    // momentarily exhausted by other tabs, the GPU process mid-restart —
    // can make it return false even on fully capable hardware, and nothing
    // about that failure throws or logs anything. Retry a couple of times
    // after short delays before committing to the no-WebGL fallback, since
    // those conditions typically clear within a second.
    let cancelled = false;
    const attempts = [400, 1200];
    const timers = attempts.map((delay) =>
      setTimeout(() => {
        if (cancelled) return;
        if (hasWebGL()) setWebGLAvailable(true);
      }, delay)
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGLAvailable]);

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
