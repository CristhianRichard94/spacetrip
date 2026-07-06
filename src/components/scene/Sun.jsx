import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Sun({ prefersReducedMotion, registerRef }) {
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, "/textures/2k_sun.jpg");

  useEffect(() => {
    registerRef?.("hero-section", meshRef.current);
    return () => registerRef?.("hero-section", null);
  }, [registerRef]);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        emissive="#ff9d3b"
        emissiveMap={texture}
        emissiveIntensity={1.1}
      />
    </mesh>
  );
}

export default Sun;
