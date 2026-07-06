import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Planet({ planet, prefersReducedMotion }) {
  const orbitGroupRef = useRef(null);
  const meshRef = useRef(null);

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
      <mesh ref={meshRef} position={[planet.orbitRadius, 0, 0]}>
        <sphereGeometry args={[planet.size, 24, 24]} />
        <meshStandardMaterial color={planet.color} />
      </mesh>
    </group>
  );
}

export default Planet;
