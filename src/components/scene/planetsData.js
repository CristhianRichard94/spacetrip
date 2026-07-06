// Waypoint mapping: Hero -> Sun (center), then outward by section order.
// Only the 7 non-hero sections need a named planet waypoint.
export const PLANETS = [
  {
    name: "Mercury",
    section: "about-me-section",
    orbitRadius: 3,
    orbitSpeed: 0.45,
    spinSpeed: 0.8,
    size: 0.22,
    color: "#9c9c94",
    initialAngle: 0.2,
  },
  {
    name: "Venus",
    section: "experience-section",
    orbitRadius: 4.5,
    orbitSpeed: 0.32,
    spinSpeed: 0.5,
    size: 0.32,
    color: "#e0c48c",
    initialAngle: 1.4,
  },
  {
    name: "Earth",
    section: "education-section",
    orbitRadius: 6,
    orbitSpeed: 0.24,
    spinSpeed: 1.1,
    size: 0.34,
    color: "#3b6fff",
    initialAngle: 2.6,
  },
  {
    name: "Mars",
    section: "languages-section",
    orbitRadius: 7.5,
    orbitSpeed: 0.19,
    spinSpeed: 0.9,
    size: 0.26,
    color: "#c1440e",
    initialAngle: 3.8,
  },
  {
    name: "Jupiter",
    section: "skills-section",
    orbitRadius: 9.5,
    orbitSpeed: 0.12,
    spinSpeed: 1.6,
    size: 0.6,
    color: "#c9a37a",
    initialAngle: 5.0,
  },
  {
    name: "Saturn",
    section: "portfolio-section",
    orbitRadius: 11.5,
    orbitSpeed: 0.09,
    spinSpeed: 1.3,
    size: 0.52,
    color: "#e0c98f",
    initialAngle: 0.9,
  },
  {
    name: "Neptune",
    section: "socials-section",
    orbitRadius: 13.5,
    orbitSpeed: 0.06,
    spinSpeed: 1.0,
    size: 0.4,
    color: "#3f5bd9",
    initialAngle: 4.4,
  },
];

// Fixed orbital-lane reference position for each planet (angle held at its
// initialAngle), used by the ScrollCameraRig as a stable waypoint so the
// camera doesn't chase the continuously moving mesh.
export function getWaypointPosition(planet) {
  return [
    Math.cos(planet.initialAngle) * planet.orbitRadius,
    0,
    Math.sin(planet.initialAngle) * planet.orbitRadius,
  ];
}

export const SUN_WAYPOINT = { section: "hero-section", position: [0, 0, 0] };
