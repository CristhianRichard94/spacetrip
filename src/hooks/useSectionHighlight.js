import { useEffect } from "react";

function useSectionHighlight() {
  useEffect(() => {
    // Assumption: all 8 sections are always mounted (no routing/conditional
    // rendering), so querying `.main-section` once on mount is sufficient.
    // If any section becomes conditionally rendered in the future, this hook
    // would need to re-query on updates or use a MutationObserver instead.
    const sections = document.querySelectorAll(".main-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      // threshold 0 (not 0.5): tall sections (e.g. experience) never reach
      // 50% area visible, so area-based threshold never triggers for them.
      // rootMargin shrinks viewport to a thin band near center so
      // "in-view" still means "near top", just without an area minimum.
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
}

export default useSectionHighlight;
