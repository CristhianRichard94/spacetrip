import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Moon from "./Moon.jsx";
import AtmosphereEnhanced from "./Atmosphere.enhanced.jsx";
import SaturnRingEnhanced from "./SaturnRing.enhanced.jsx";
import useSafeFrame from "./useSafeFrame.js";

const ATMOSPHERE_COLORS = {
  Earth: "#66aaff",
  Venus: "#e8c88a",
};

function PlanetEnhanced({ planet, prefersReducedMotion, isActive, registerRef, lowPower }) {
  const orbitGroupRef = useRef(null);
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, planet.texture);

  useEffect(() => {
    registerRef?.(planet.section, meshRef.current);
    return () => registerRef?.(planet.section, null);
  }, [registerRef, planet.section]);

  useSafeFrame((_, delta) => {
    if (prefersReducedMotion) return;
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * planet.orbitSpeed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * planet.spinSpeed;
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
            map={texture}
            bumpMap={texture}
            bumpScale={0.02}
            roughness={0.9}
            metalness={0.05}
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
          <Moon planet={planet} prefersReducedMotion={prefersReducedMotion} />
        )}
      </group>
    </group>
  );
}

export default PlanetEnhanced;
