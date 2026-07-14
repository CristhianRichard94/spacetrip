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
const LERP_SPEED = 1.1;

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

function ScrollCameraRig({ prefersReducedMotion, onActiveSectionChange, objectRefs }) {
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
    targetLookAtRef.current.set(x, y, z);
    targetPositionRef.current.set(x + CAMERA_OFFSET.x, y + CAMERA_OFFSET.y, z + CAMERA_OFFSET.z);
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

  useFrame((state, delta) => {
    const { camera } = state;

    // Track the active section's actual object each frame (rather than a
    // fixed reference point) so the camera keeps the planet centered even
    // as it continues orbiting/spinning while a section is in view.
    const activeSection = WAYPOINTS[activeIndexRef.current].section;
    const trackedObject = objectRefs?.current?.[activeSection];
    if (trackedObject) {
      trackedObject.getWorldPosition(targetLookAtRef.current);
      targetPositionRef.current
        .copy(targetLookAtRef.current)
        .add(CAMERA_OFFSET);
    }

    if (prefersReducedMotion || !hasSnappedRef.current) {
      // First frame after mount (or reduced-motion mode): snap directly to
      // the resolved waypoint instead of lerping in from the camera's
      // default starting position, which is what produced the hero
      // flash-then-correct on mode swap.
      hasSnappedRef.current = true;
      camera.position.copy(targetPositionRef.current);
      currentLookAtRef.current.copy(targetLookAtRef.current);
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
