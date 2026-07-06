// Waypoint mapping: Hero -> Sun (center), then outward by section order.
// Section assignment follows the DOM scroll order (Hero, Portfolio, About,
// Experience, Education, Languages, Skills, Socials) matched to ascending
// orbitRadius, so the camera travels monotonically outward with no
// backtracking jumps between sections.
export const PLANETS = [
  {
    name: "Mercury",
    section: "portfolio-section",
    orbitRadius: 3,
    orbitSpeed: 0.225,
    spinSpeed: 0.4,
    size: 0.22,
    color: "#9c9c94",
    texture: "/textures/2k_mercury.jpg",
    initialAngle: 0.2,
  },
  {
    name: "Venus",
    section: "about-me-section",
    orbitRadius: 4.5,
    orbitSpeed: 0.16,
    spinSpeed: 0.25,
    size: 0.32,
    color: "#e0c48c",
    texture: "/textures/2k_venus_surface.jpg",
    initialAngle: 1.4,
  },
  {
    name: "Earth",
    section: "experience-section",
    orbitRadius: 6,
    orbitSpeed: 0.12,
    spinSpeed: 0.55,
    size: 0.34,
    color: "#3b6fff",
    texture: "/textures/2k_earth_daymap.jpg",
    initialAngle: 2.6,
  },
  {
    name: "Mars",
    section: "education-section",
    orbitRadius: 7.5,
    orbitSpeed: 0.095,
    spinSpeed: 0.45,
    size: 0.26,
    color: "#c1440e",
    texture: "/textures/2k_mars.jpg",
    initialAngle: 3.8,
  },
  {
    name: "Jupiter",
    section: "languages-section",
    orbitRadius: 9.5,
    orbitSpeed: 0.06,
    spinSpeed: 0.8,
    size: 0.6,
    color: "#c9a37a",
    texture: "/textures/2k_jupiter.jpg",
    initialAngle: 5.0,
  },
  {
    name: "Saturn",
    section: "skills-section",
    orbitRadius: 11.5,
    orbitSpeed: 0.045,
    spinSpeed: 0.65,
    size: 0.52,
    color: "#e0c98f",
    texture: "/textures/2k_saturn.jpg",
    initialAngle: 0.9,
  },
  {
    name: "Neptune",
    section: "socials-section",
    orbitRadius: 13.5,
    orbitSpeed: 0.03,
    spinSpeed: 0.5,
    size: 0.4,
    color: "#3f5bd9",
    texture: "/textures/2k_neptune.jpg",
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
