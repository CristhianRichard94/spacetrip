import { useDebugValues, setDebugValue, resetDebugValues } from "./debugStore.js";

const FIELDS = [
  { key: "cameraOffsetX", label: "Camera offset X", min: 0, max: 10, step: 0.1 },
  { key: "cameraOffsetY", label: "Camera offset Y", min: 0, max: 10, step: 0.1 },
  { key: "cameraOffsetZ", label: "Camera offset Z", min: 0, max: 15, step: 0.1 },
  { key: "sunOffsetScale", label: "Sun offset scale", min: 1, max: 4, step: 0.1 },
  { key: "bloomIntensity", label: "Bloom intensity", min: 0, max: 3, step: 0.05 },
  { key: "bloomThreshold", label: "Bloom threshold", min: 0, max: 1, step: 0.02 },
  { key: "bloomSmoothing", label: "Bloom smoothing", min: 0, max: 1, step: 0.02 },
  { key: "dprMax", label: "DPR max", min: 1, max: 3, step: 0.5 },
  { key: "lightFadeMs", label: "Light fade (ms)", min: 0, max: 3000, step: 50 },
];

// Dev-only overlay. Never mounted in production — gated at the SceneRoot
// import site behind import.meta.env.DEV.
function DebugPanel() {
  const values = useDebugValues();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        right: 8,
        zIndex: 9999,
        background: "rgba(10, 14, 30, 0.85)",
        color: "#fff",
        font: "11px monospace",
        padding: "8px 10px",
        borderRadius: 6,
        width: 220,
        pointerEvents: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <strong>scene debug</strong>
        <button
          type="button"
          onClick={resetDebugValues}
          style={{ font: "inherit", cursor: "pointer" }}
        >
          reset
        </button>
      </div>
      {FIELDS.map(({ key, label, min, max, step }) => (
        <label key={key} style={{ display: "block", marginBottom: 4 }}>
          {label}: {values[key]}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={values[key]}
            onChange={(event) => setDebugValue(key, Number(event.target.value))}
            style={{ width: "100%" }}
          />
        </label>
      ))}
    </div>
  );
}

export default DebugPanel;
