import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PLANETS, SUN_WAYPOINT, getWaypointPosition } from "./planetsData.js";

const WAYPOINTS = [
  { section: SUN_WAYPOINT.section, position: SUN_WAYPOINT.position },
  ...PLANETS.map((planet) => ({
    section: planet.section,
    position: getWaypointPosition(planet),
  })),
];

const CAMERA_OFFSET = new THREE.Vector3(2.5, 2, 6);
const LERP_SPEED = 2.2;

function ScrollCameraRig({ prefersReducedMotion }) {
  const activeIndexRef = useRef(0);
  const targetPositionRef = useRef(new THREE.Vector3());
  const targetLookAtRef = useRef(new THREE.Vector3());
  const currentLookAtRef = useRef(new THREE.Vector3());

  const applyWaypoint = (index) => {
    activeIndexRef.current = index;
    const waypoint = WAYPOINTS[index];
    const [x, y, z] = waypoint.position;
    targetLookAtRef.current.set(x, y, z);
    targetPositionRef.current.set(x + CAMERA_OFFSET.x, y + CAMERA_OFFSET.y, z + CAMERA_OFFSET.z);
  };

  useEffect(() => {
    applyWaypoint(0);

    const sectionElements = WAYPOINTS.map((waypoint) =>
      document.getElementById(waypoint.section)
    ).filter(Boolean);

    if (sectionElements.length === 0) return undefined;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = null;
        let bestRatio = -1;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) {
          const index = WAYPOINTS.findIndex((wp) => wp.section === bestId);
          if (index !== -1 && index !== activeIndexRef.current) {
            applyWaypoint(index);
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;

    if (prefersReducedMotion) {
      camera.position.copy(targetPositionRef.current);
      camera.lookAt(targetLookAtRef.current);
      return;
    }

    const lerpFactor = 1 - Math.exp(-LERP_SPEED * delta);
    camera.position.lerp(targetPositionRef.current, lerpFactor);
    currentLookAtRef.current.lerp(targetLookAtRef.current, lerpFactor);
    camera.lookAt(currentLookAtRef.current);
  });

  return null;
}

export default ScrollCameraRig;
