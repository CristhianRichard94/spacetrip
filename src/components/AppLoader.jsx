import { useRef } from "react";
import useTranslation from "../hooks/useTranslation.js";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion.js";
import useVariableSpin from "../hooks/useVariableSpin.js";

const RINGS = [
  { size: 170, minSpeed: 25, maxSpeed: 85, direction: 1 },
  { size: 125, minSpeed: 35, maxSpeed: 120, direction: -1 },
  { size: 80, minSpeed: 55, maxSpeed: 160, direction: 1 },
];

function LoaderRing({ size, minSpeed, maxSpeed, direction, active }) {
  const ringRef = useRef(null);
  useVariableSpin(ringRef, { active, minSpeed, maxSpeed, direction });

  return (
    <div
      ref={ringRef}
      className="loader-ring"
      style={{ width: size, height: size }}
    />
  );
}

function AppLoader({ exiting }) {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={`app-loader${exiting ? " exiting" : ""}`} aria-hidden={exiting}>
      <div className="loader-shutter top">
        <div className="loader-core">
          {RINGS.map((ring) => (
            <LoaderRing key={ring.size} {...ring} active={!prefersReducedMotion} />
          ))}
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
