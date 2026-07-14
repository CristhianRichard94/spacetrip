import { useRef } from "react";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import useSafeFrame from "./useSafeFrame.js";

const PATH_RADIUS_X = 16;
const PATH_RADIUS_Z = 10;
const PATH_SPEED = 0.05;

function CometEnhanced({ prefersReducedMotion }) {
  const meshRef = useRef(null);
  const timeRef = useRef(0);

  useSafeFrame((_, delta) => {
    if (!meshRef.current) return;
    if (!prefersReducedMotion) {
      timeRef.current += delta * PATH_SPEED;
    }
    const t = timeRef.current;
    meshRef.current.position.set(
      Math.cos(t) * PATH_RADIUS_X,
      Math.sin(t * 1.7) * 3,
      Math.sin(t) * PATH_RADIUS_Z
    );
  });

  return (
    <Trail
      width={1.2}
      length={6}
      color={new THREE.Color("#bcd7ff")}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#eaf4ff" />
      </mesh>
    </Trail>
  );
}

export default CometEnhanced;
