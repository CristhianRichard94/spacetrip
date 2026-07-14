import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { Stars as DreiStars } from "@react-three/drei";

function StarsEnhanced({ lowPower }) {
  const milkyWayTexture = useLoader(TextureLoader, "/textures/2k_stars_milky_way.jpg");

  return (
    <>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[90, 32, 32]} />
        <meshBasicMaterial
          map={milkyWayTexture}
          side={THREE.BackSide}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
      <DreiStars radius={80} depth={40} count={lowPower ? 1500 : 4000} factor={4} fade speed={0.3} />
      {!lowPower && (
        <DreiStars radius={45} depth={25} count={2000} factor={2.2} fade speed={0.15} />
      )}
    </>
  );
}

export default StarsEnhanced;
