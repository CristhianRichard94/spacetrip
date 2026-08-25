import { memo, Suspense, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import Moon from "./Moon.jsx";
import AtmosphereEnhanced from "./Atmosphere.enhanced.jsx";
import SaturnRingEnhanced from "./SaturnRing.enhanced.jsx";
import useSafeFrame from "./useSafeFrame.js";

const ATMOSPHERE_COLORS = {
  Earth: "#66aaff",
  Venus: "#e8c88a",
};

const PLANET_FADE_MS = 450;

function PlanetEnhanced({ planet, prefersReducedMotion, isActive, registerRef, lowPower }) {
  const orbitGroupRef = useRef(null);
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const fadeStartRef = useRef(null);
  const texture = useLoader(TextureLoader, planet.texture, (loadedTexture) => {
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
  });

  useEffect(() => {
    registerRef?.(planet.section, meshRef.current);
    return () => registerRef?.(planet.section, null);
  }, [registerRef, planet.section]);

  useSafeFrame((_, delta) => {
    if (!prefersReducedMotion) {
      if (orbitGroupRef.current) {
        orbitGroupRef.current.rotation.y += delta * planet.orbitSpeed;
      }
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * planet.spinSpeed;
      }
    }

    // This component only mounts once its own texture has resolved behind
    // the Suspense boundary, so fade its mesh in independently of the other
    // planets/lights to avoid an abrupt pop-in when it resolves late.
    if (materialRef.current) {
      if (fadeStartRef.current === null) fadeStartRef.current = performance.now();
      const t = Math.min((performance.now() - fadeStartRef.current) / PLANET_FADE_MS, 1);
      const eased = t * t * (3 - 2 * t);
      materialRef.current.opacity = eased;
    }
  });

  const atmosphereColor = ATMOSPHERE_COLORS[planet.name];
  const isSaturn = planet.name === "Saturn";

  return (
    <group ref={orbitGroupRef} rotation={[0, planet.initialAngle, 0]}>
      <group position={[planet.orbitRadius, 0, 0]}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[planet.size, 48, 48]} />
          <meshStandardMaterial
            ref={materialRef}
            map={texture}
            roughness={0.9}
            metalness={0.05}
            transparent
            opacity={0}
          />
        </mesh>
        {atmosphereColor && !lowPower && (
          <AtmosphereEnhanced radius={planet.size} color={atmosphereColor} />
        )}
        {isSaturn && (
          <SaturnRingEnhanced
            innerRadius={planet.size * 1.4}
            outerRadius={planet.size * 2.3}
          />
        )}
        {isActive && (
          // Moon mounts on demand once its planet becomes active, well after
          // the outer scene Suspense boundary has already resolved. Without
          // its own boundary here, Moon's texture load re-suspends that
          // outer boundary and blanks every already-rendered planet/sun
          // until Moon's texture arrives.
          <Suspense fallback={null}>
            <Moon planet={planet} prefersReducedMotion={prefersReducedMotion} />
          </Suspense>
        )}
      </group>
    </group>
  );
}

export default memo(PlanetEnhanced);
