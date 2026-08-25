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

// The sun (waypoint index 0) is large relative to the other waypoints' 45deg
// FOV framing — at the standard CAMERA_OFFSET distance it fills roughly
// half the vertical frame, with its bloom glow extending well past that,
// reading as an overexposed/washed-out hero rather than a dramatic close-up.
// Pull the camera back specifically for the sun waypoint; every other
// waypoint keeps the standard offset.
const SUN_CAMERA_OFFSET_SCALE = 1.6;

// Determine which section is actually in view right now by comparing each
// section element's position against the viewport, so the camera can land
// on the correct waypoint immediately on mount instead of always starting
// at index 0 and lerping back into place once the IntersectionObserver
// reports the real section (which caused a visible flash/snap on every
// classic <-> enhanced mode swap).
function computeCurrentWaypointIndex() {
  if (typeof document === "undefined") return 0;
  const viewportCenter = window.innerHeight / 2;
  let bestIndex = 0;
  let bestDistance = Infinity;
  WAYPOINTS.forEach((waypoint, index) => {
    const element = document.getElementById(waypoint.section);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const distance = Math.abs(elementCenter - viewportCenter);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function ScrollCameraRig({ onActiveSectionChange }) {
  const activeIndexRef = useRef(0);
  const targetPositionRef = useRef(new THREE.Vector3());
  const targetLookAtRef = useRef(new THREE.Vector3());
  const currentLookAtRef = useRef(new THREE.Vector3());
  const hasSnappedRef = useRef(false);

  const applyWaypoint = (index) => {
    activeIndexRef.current = index;
    const waypoint = WAYPOINTS[index];
    // Fallback reference position, used only until the tracked object
    // registers itself (e.g. still loading its texture behind Suspense).
    const [x, y, z] = waypoint.position;
    const offsetScale = index === 0 ? SUN_CAMERA_OFFSET_SCALE : 1;
    targetLookAtRef.current.set(x, y, z);
    targetPositionRef.current.set(
      x + CAMERA_OFFSET.x * offsetScale,
      y + CAMERA_OFFSET.y * offsetScale,
      z + CAMERA_OFFSET.z * offsetScale
    );
    onActiveSectionChange?.(waypoint.section);
  };

  useEffect(() => {
    applyWaypoint(computeCurrentWaypointIndex());

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

  useFrame((state) => {
    const { camera } = state;

    // Camera stays put once snapped to the initial waypoint — it no longer
    // tracks section scroll or the active object's position.
    if (!hasSnappedRef.current) {
      hasSnappedRef.current = true;
      camera.position.copy(targetPositionRef.current);
      currentLookAtRef.current.copy(targetLookAtRef.current);
      camera.lookAt(targetLookAtRef.current);
    }
  });

  return null;
}

export default ScrollCameraRig;
