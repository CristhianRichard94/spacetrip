import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import useSafeFrame from "./useSafeFrame.js";

// Mars orbits at 7.5, Jupiter at 9.5 (see planetsData.js). The belt band was
// previously only 0.8 units wide (8.1-8.9), which at this scale rendered as a
// single thin orbit line instead of a scattered belt. Widened to give the
// per-instance random radius room to actually read as a belt.
const BELT_INNER_RADIUS = 7.9;
const BELT_OUTER_RADIUS = 9.3;

function AsteroidBeltEnhanced({ prefersReducedMotion, lowPower }) {
  const meshRef = useRef(null);
  const count = lowPower ? 60 : 200;
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

export default memo(AsteroidBeltEnhanced);
