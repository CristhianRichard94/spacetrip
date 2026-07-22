import useTranslation from "../hooks/useTranslation.js";

function LoaderBoxes() {
  return (
    <>
      <div className="loader-box" style={{ "--rotateVal": "0deg" }} />
      <div className="loader-box" style={{ "--rotateVal": "90deg" }} />
      <div className="loader-box" style={{ "--rotateVal": "180deg" }} />
      <div className="loader-box" style={{ "--rotateVal": "270deg" }} />
    </>
  );
}

function AppLoader({ exiting }) {
  const { t } = useTranslation();

  return (
    <div className={`app-loader${exiting ? " exiting" : ""}`} aria-hidden={exiting}>
      <div className="loader-shutter top">
        <div className="loader-circle outer">
          <LoaderBoxes />
        </div>
        <div className="loader-circle inner">
          <LoaderBoxes />
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
