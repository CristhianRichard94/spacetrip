import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function ShootingStar({ prefersReducedMotion }) {
  const camera = useThree((state) => state.camera);
  const meshRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !meshRef.current) return undefined;

    const mesh = meshRef.current;
    camera.add(mesh);

    const path = { t: 0 };
    let delayedCall;

    const launch = () => {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -7 : 7;
      const endX = fromLeft ? 7 : -7;
      const startY = THREE.MathUtils.randFloat(-2, 1);
      const endY = startY - THREE.MathUtils.randFloat(1, 2);
      const arcHeight = THREE.MathUtils.randFloat(1.5, 3);

      path.t = 0;
      gsap.to(path, {
        t: 1,
        duration: THREE.MathUtils.randFloat(1, 1.6),
        ease: "power1.in",
        onUpdate: () => {
          const t = path.t;
          const x = THREE.MathUtils.lerp(startX, endX, t);
          const y =
            THREE.MathUtils.lerp(startY, endY, t) +
            Math.sin(t * Math.PI) * arcHeight;
          mesh.position.set(x, y, -6);
          mesh.material.opacity = Math.sin(t * Math.PI);

          const dx = (endX - startX) / 100;
          const dy =
            (endY - startY) / 100 +
            Math.cos(t * Math.PI) * arcHeight * (Math.PI / 100);
          mesh.rotation.z = Math.atan2(dy, dx);
        },
        onComplete: () => {
          mesh.material.opacity = 0;
          delayedCall = gsap.delayedCall(
            THREE.MathUtils.randFloat(8, 20),
            launch
          );
        },
      });
    };

    delayedCall = gsap.delayedCall(THREE.MathUtils.randFloat(3, 10), launch);

    return () => {
      delayedCall?.kill();
      gsap.killTweensOf(path);
      camera.remove(mesh);
    };
  }, [camera, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[0.8, 0.03]} />
      <meshBasicMaterial
        color={0xffffff}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default ShootingStar;
