import { useEffect, useState } from "react";
import useTranslation from "../hooks/useTranslation.js";

function MusicToggle({ audioRef }) {
  const { t } = useTranslation();
  const [muted, setMuted] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 500);
    const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);
    setShowTooltip(false);

    if (!nextMuted && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <button
        className="music-toggle"
        aria-label={t("musicToggle.ariaLabel")}
        type="button"
        onClick={handleClick}
      >
        {muted ? "🔇" : "🔊"}
      </button>
      <span className={`music-tooltip${showTooltip ? " show" : ""}`}>
        {t("musicToggle.tooltip")}
      </span>
    </>
  );
}

export default MusicToggle;
