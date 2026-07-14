import { createContext, useContext, useMemo, useRef, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion.js";

const STORAGE_KEY = "sceneMode";
const HINT_SEEN_KEY = "sceneModeHintSeen";

function readStoredMode(defaultsToClassic) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && (parsed.mode === "enhanced" || parsed.mode === "classic")) {
      const explicit = Boolean(parsed.explicit);
      if (explicit) {
        // The user deliberately chose this mode: sticky/permanent.
        return { mode: parsed.mode, explicit: true };
      }
      // Not an explicit user choice (auto-detected default, or a fallback
      // after a transient error). Re-run the auto-detection heuristic on
      // every load instead of trusting the stale stored value forever, so
      // a stronger device / accessibility setting change is picked up.
      return { mode: defaultsToClassic ? "classic" : "enhanced", explicit: false };
    }
  } catch (error) {
    // localStorage unavailable (private browsing / disabled) or malformed JSON
  }
  return null;
}

function writeStoredMode(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    // ignore, in-memory state still works for this session
  }
}

function isLowEndDevice() {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4
  );
}

export function hasSeenSceneModeHint() {
  try {
    return window.localStorage.getItem(HINT_SEEN_KEY) === "1";
  } catch (error) {
    return true;
  }
}

export function markSceneModeHintSeen() {
  try {
    window.localStorage.setItem(HINT_SEEN_KEY, "1");
  } catch (error) {
    // ignore
  }
}

const SceneModeContext = createContext(null);

export function SceneModeProvider({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lowEndDevice = useMemo(() => isLowEndDevice(), []);
  const [state, setState] = useState(() => {
    const defaultsToClassic = prefersReducedMotion || lowEndDevice;
    const stored = readStoredMode(defaultsToClassic);
    if (stored) return stored;
    return { mode: defaultsToClassic ? "classic" : "enhanced", explicit: false };
  });
  const [loading, setLoading] = useState(false);
  const [fallbackNotice, setFallbackNotice] = useState(false);
  const sessionUnsupportedRef = useRef(false);

  const setMode = (mode, explicit = true) => {
    const next = { mode, explicit };
    setState(next);
    writeStoredMode(next);
  };

  const markEnhancedUnsupportedThisSession = () => {
    sessionUnsupportedRef.current = true;
  };

  const isEnhancedUnsupportedThisSession = () => sessionUnsupportedRef.current;

  const fallbackToClassic = () => {
    markEnhancedUnsupportedThisSession();
    // Always persist as non-explicit: a transient WebGL context loss or
    // render error must never permanently lock the user out of enhanced
    // mode the way a deliberate user choice would. Future visits can
    // retry/re-evaluate enhanced mode via the auto-detection heuristic.
    setMode("classic", false);
    setLoading(false);
    setFallbackNotice(true);
  };

  const dismissFallbackNotice = () => setFallbackNotice(false);

  const value = useMemo(
    () => ({
      mode: state.mode,
      explicit: state.explicit,
      setMode,
      loading,
      setLoading,
      lowEndDevice,
      prefersReducedMotion,
      isEnhancedUnsupportedThisSession,
      markEnhancedUnsupportedThisSession,
      fallbackToClassic,
      fallbackNotice,
      dismissFallbackNotice,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.mode, state.explicit, loading, lowEndDevice, prefersReducedMotion, fallbackNotice]
  );

  return (
    <SceneModeContext.Provider value={value}>
      {children}
    </SceneModeContext.Provider>
  );
}

export function useSceneModeContext() {
  const context = useContext(SceneModeContext);
  if (!context) {
    throw new Error("useSceneModeContext must be used within SceneModeProvider");
  }
  return context;
}
