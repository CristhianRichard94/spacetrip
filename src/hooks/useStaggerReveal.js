import { useEffect } from "react";

// One-shot reveal for the list-item stagger entrance (skills, portfolio,
// languages sections). Unlike `useSectionHighlight`'s `.in-view` toggle
// (which flips on/off as the section enters/leaves the centered viewport
// band and is meant for the persistent "active section" glow), this hook
// adds `.revealed` once the section first enters the viewport and never
// removes it, so list items stay visible for the rest of the scroll
// instead of flickering in/out.
const REVEAL_SECTION_IDS = ["skills-section", "portfolio-section", "languages-section"];

function useStaggerReveal() {
  useEffect(() => {
    const sections = REVEAL_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
}

export default useStaggerReveal;
