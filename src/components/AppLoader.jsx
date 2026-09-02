import useTranslation from "../hooks/useTranslation.js";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion.js";

function AppLoader({ exiting }) {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={`app-loader${exiting ? " exiting" : ""}`} aria-hidden={exiting}>
      <div className="loader-shutter top">
        <div className="loader-core">
          <div className={`loader-comet${prefersReducedMotion ? " reduced-motion" : ""}`} />
        </div>
      </div>
      <div className="loader-shutter bottom" />
      <p className="loader-label" role="status" aria-live="polite">
        {t("loader.initializing")}
      </p>
    </div>
  );
}

export default AppLoader;
