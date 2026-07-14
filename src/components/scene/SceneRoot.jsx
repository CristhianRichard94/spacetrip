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

  useEffect(() => {
    if (wantsEnhanced) {
      setLoading(true);
      // Enhanced shaders/textures compile async under Suspense; the loading
      // indicator clears once Canvas + first frame report ready via onReady.
    } else {
      setLoading(false);
    }
  }, [wantsEnhanced, setLoading]);

  if (!webGLAvailable) {
    return <div className="webgl webgl-fallback" aria-hidden="true" />;
  }

  if (!wantsEnhanced) {
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
