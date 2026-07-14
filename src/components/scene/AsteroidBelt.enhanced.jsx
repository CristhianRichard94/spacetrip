import { useMemo, useRef } from "react";
import * as THREE from "three";
import useSafeFrame from "./useSafeFrame.js";

const BELT_INNER_RADIUS = 8.1;
const BELT_OUTER_RADIUS = 8.9;

function AsteroidBeltEnhanced({ prefersReducedMotion, lowPower }) {
  const meshRef = useRef(null);
  const count = lowPower ? 120 : 400;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const asteroids = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(BELT_INNER_RADIUS, BELT_OUTER_RADIUS);
      const angle = Math.random() * Math.PI * 2;
      const y = THREE.MathUtils.randFloatSpread(0.25);
      const scale = THREE.MathUtils.randFloat(0.02, 0.06);
      items.push({ radius, angle, y, scale });
    }
    return items;
  }, [count]);

  useSafeFrame((_, delta) => {
    if (!meshRef.current) return;
    if (!prefersReducedMotion) {
      asteroids.forEach((asteroid) => {
        asteroid.angle += delta * 0.015;
      });
    }
    asteroids.forEach((asteroid, index) => {
      dummy.position.set(
        Math.cos(asteroid.angle) * asteroid.radius,
        asteroid.y,
        Math.sin(asteroid.angle) * asteroid.radius
      );
      dummy.scale.setScalar(asteroid.scale);
      dummy.rotation.set(asteroid.angle, asteroid.angle * 0.5, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#8b8378" roughness={1} metalness={0} />
    </instancedMesh>
  );
}

export default AsteroidBeltEnhanced;
