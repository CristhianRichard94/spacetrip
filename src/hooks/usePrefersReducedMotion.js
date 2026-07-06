import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => setPrefersReducedMotion(event.matches);

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
