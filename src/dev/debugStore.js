import { useSyncExternalStore } from "react";

// Dev-only tunables for scene props implicated in the blank-canvas /
// sun-framing bugs (camera offset, sun distance, bloom, dpr, fade timing).
// Never imported/rendered outside import.meta.env.DEV — see DebugPanel.jsx.
const defaults = {
  cameraOffsetX: 2.5,
  cameraOffsetY: 2,
  cameraOffsetZ: 6,
  sunOffsetScale: 1.6,
  bloomIntensity: 0.6,
  bloomThreshold: 0.3,
  bloomSmoothing: 0.2,
  dprMax: 2,
  lightFadeMs: 1200,
};

let state = { ...defaults };
const listeners = new Set();

export function getDebugValues() {
  return state;
}

export function setDebugValue(key, value) {
  state = { ...state, [key]: value };
  listeners.forEach((listener) => listener());
}

export function resetDebugValues() {
  state = { ...defaults };
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useDebugValues() {
  return useSyncExternalStore(subscribe, getDebugValues, getDebugValues);
}
