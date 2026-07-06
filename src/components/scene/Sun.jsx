import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Sun({ prefersReducedMotion, registerRef }) {
  const meshRef = useRef(null);

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
        color="#ffd27f"
        emissive="#ff9d3b"
        emissiveIntensity={1.1}
      />
    </mesh>
  );
}

export default Sun;
