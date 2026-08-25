import { describe, it, expect } from "vitest";
import { PLANETS, SUN_WAYPOINT, getWaypointPosition } from "./planetsData.js";

const REQUIRED_FIELDS = [
  "name",
  "section",
  "orbitRadius",
  "orbitSpeed",
  "spinSpeed",
  "size",
  "color",
  "texture",
  "initialAngle",
];

describe("planetsData", () => {
  it("every planet has all required fields with sane types", () => {
    PLANETS.forEach((planet) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(planet).toHaveProperty(field);
        expect(planet[field]).not.toBeUndefined();
        expect(planet[field]).not.toBeNull();
      });
      expect(typeof planet.name).toBe("string");
      expect(typeof planet.section).toBe("string");
      expect(planet.orbitRadius).toBeGreaterThan(0);
      expect(planet.orbitSpeed).toBeGreaterThan(0);
      expect(planet.spinSpeed).toBeGreaterThan(0);
      expect(planet.size).toBeGreaterThan(0);
      expect(planet.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(planet.texture).toMatch(/^\/textures\/.+\.jpg$/);
    });
  });

  it("has no duplicate planet names", () => {
    const names = PLANETS.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has no duplicate section ids", () => {
    const sections = PLANETS.map((p) => p.section);
    expect(new Set(sections).size).toBe(sections.length);
  });

  it("orbitRadius is strictly ascending, matching outward scroll order", () => {
    for (let i = 1; i < PLANETS.length; i += 1) {
      expect(PLANETS[i].orbitRadius).toBeGreaterThan(PLANETS[i - 1].orbitRadius);
    }
  });

  it("SUN_WAYPOINT sits at the origin and is not part of PLANETS", () => {
    expect(SUN_WAYPOINT.position).toEqual([0, 0, 0]);
    expect(PLANETS.some((p) => p.section === SUN_WAYPOINT.section)).toBe(false);
  });

  describe("getWaypointPosition", () => {
    it("returns a fixed 3-tuple derived from initialAngle and orbitRadius", () => {
      const planet = PLANETS[0];
      const [x, y, z] = getWaypointPosition(planet);
      expect(x).toBeCloseTo(Math.cos(planet.initialAngle) * planet.orbitRadius);
      expect(y).toBe(0);
      expect(z).toBeCloseTo(Math.sin(planet.initialAngle) * planet.orbitRadius);
    });

    it("distance from origin matches orbitRadius for every planet", () => {
      PLANETS.forEach((planet) => {
        const [x, y, z] = getWaypointPosition(planet);
        const distance = Math.sqrt(x * x + y * y + z * z);
        expect(distance).toBeCloseTo(planet.orbitRadius);
      });
    });
  });
});
