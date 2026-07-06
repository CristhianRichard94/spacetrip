import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const MOON_ORBIT_RADIUS_FACTOR = 1.8;
const MOON_ORBIT_SPEED = 0.7;
const MOON_SPIN_SPEED = 0.3;

function Moon({ planet, prefersReducedMotion }) {
  const orbitGroupRef = useRef(null);
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, "/textures/2k_moon.jpg");
  const moonOrbitRadius = planet.size * MOON_ORBIT_RADIUS_FACTOR + 0.25;
  const moonSize = Math.max(planet.size * 0.28, 0.06);

  useFrame((_, delta) => {
    if (prefersReducedMotion) return;
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * MOON_ORBIT_SPEED;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * MOON_SPIN_SPEED;
    }
  });

  return (
    <group ref={orbitGroupRef}>
      <mesh ref={meshRef} position={[moonOrbitRadius, 0, 0]}>
        <sphereGeometry args={[moonSize, 16, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

export default Moon;
