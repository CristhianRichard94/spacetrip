import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

function SaturnRingEnhanced({ innerRadius, outerRadius }) {
  const alphaMap = useLoader(TextureLoader, "/textures/2k_saturn_ring_alpha.png");

  const geometry = useMemo(() => {
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 128, 1);
    const uv = ringGeometry.attributes.uv;
    const position = ringGeometry.attributes.position;
    const vector = new THREE.Vector3();
    for (let i = 0; i < position.count; i++) {
      vector.fromBufferAttribute(position, i);
      const distance = (vector.length() - innerRadius) / (outerRadius - innerRadius);
      uv.setXY(i, distance, 1);
    }
    return ringGeometry;
  }, [innerRadius, outerRadius]);

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2.4, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial
        map={alphaMap}
        alphaMap={alphaMap}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default SaturnRingEnhanced;
