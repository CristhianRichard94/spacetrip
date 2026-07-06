import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./Sun.jsx";
import Planet from "./Planet.jsx";
import ScrollCameraRig from "./ScrollCameraRig.jsx";
import { PLANETS } from "./planetsData.js";
import hasWebGL from "./hasWebGL.js";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion.js";

function SolarSystemScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const webGLAvailable = useMemo(() => hasWebGL(), []);

  if (!webGLAvailable) {
    return <div className="webgl webgl-fallback" aria-hidden="true" />;
  }

  return (
    <Canvas
      className="webgl"
      aria-hidden="true"
      camera={{ position: [2.5, 2, 6], fov: 45, near: 0.1, far: 200 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[0, 3, 2]} intensity={0.8} />
      <Sun prefersReducedMotion={prefersReducedMotion} />
      {PLANETS.map((planet) => (
        <Planet
          key={planet.name}
          planet={planet}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
      <ScrollCameraRig prefersReducedMotion={prefersReducedMotion} />
    </Canvas>
  );
}

export default SolarSystemScene;
