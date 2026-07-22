import { useEffect, useState } from "react";
import hasWebGL from "./scene/hasWebGL.js";
import {
  useSceneModeContext,
  hasSeenSceneModeHint,
  markSceneModeHintSeen,
} from "../context/SceneModeContext.jsx";
import useTranslation from "../hooks/useTranslation.js";

function VisualModeToggle() {
  const { t } = useTranslation();
  const {
    mode,
    explicit,
    setMode,
    loading,
    fallbackNotice,
    dismissFallbackNotice,
  } = useSceneModeContext();
  const [showTooltip, setShowTooltip] = useState(false);
  const [webGLAvailable] = useState(() => hasWebGL());

  // Error-triggered fallback notice takes priority over the "try enhanced
  // view" hint: this is the one case where telling the user matters, since
  // switching them back to classic wasn't their own action.
  useEffect(() => {
    if (!fallbackNotice) return undefined;
    const showTimer = setTimeout(() => setShowTooltip(true), 50);
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      dismissFallbackNotice();
    }, 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [fallbackNotice, dismissFallbackNotice]);

  useEffect(() => {
    if (fallbackNotice) return undefined;
    if (!webGLAvailable) return undefined;
    if (mode !== "enhanced" || explicit || hasSeenSceneModeHint()) return undefined;

    const showTimer = setTimeout(() => setShowTooltip(true), 750);
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      markSceneModeHintSeen();
    }, 6250);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGLAvailable, fallbackNotice]);

  if (!webGLAvailable) return null;

  const isEnhanced = mode === "enhanced";

  const handleClick = () => {
    if (loading) return;
    setShowTooltip(false);
    markSceneModeHintSeen();
    setMode(isEnhanced ? "classic" : "enhanced", true);
  };

  return (
    <>
      <button
        className="visual-mode-toggle"
        aria-label={
          isEnhanced
            ? t("visualModeToggle.switchToClassic")
            : t("visualModeToggle.switchToEnhanced")
        }
        aria-pressed={isEnhanced}
        type="button"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? <span className="orbit-spinner" aria-hidden="true" /> : isEnhanced ? "🪐" : "✨"}
      </button>
      <span
        className={`visual-mode-tooltip${showTooltip ? " show" : ""}`}
        role={fallbackNotice ? "status" : undefined}
      >
        {fallbackNotice
          ? t("visualModeToggle.fallbackNotice")
          : t("visualModeToggle.tryHint")}
      </span>
    </>
  );
}

export default VisualModeToggle;
