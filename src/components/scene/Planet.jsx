import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Moon from "./Moon.jsx";

function Planet({ planet, prefersReducedMotion, isActive, registerRef }) {
  const orbitGroupRef = useRef(null);
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, planet.texture);

  useEffect(() => {
    registerRef?.(planet.section, meshRef.current);
    return () => registerRef?.(planet.section, null);
  }, [registerRef, planet.section]);

  useFrame((_, delta) => {
    if (prefersReducedMotion) return;
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * planet.orbitSpeed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * planet.spinSpeed;
    }
  });

  // Static initial angle keeps reduced-motion users seeing distinct planet
  // placements instead of all planets stacked at angle 0.
  return (
    <group ref={orbitGroupRef} rotation={[0, planet.initialAngle, 0]}>
      <group position={[planet.orbitRadius, 0, 0]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[planet.size, 24, 24]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        {isActive && (
          <Moon planet={planet} prefersReducedMotion={prefersReducedMotion} />
        )}
      </group>
    </group>
  );
}

export default Planet;
