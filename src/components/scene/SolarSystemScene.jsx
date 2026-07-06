import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./Sun.jsx";
import Planet from "./Planet.jsx";
import ScrollCameraRig from "./ScrollCameraRig.jsx";
import Stars from "./Stars.jsx";
import ShootingStar from "./ShootingStar.jsx";
import { PLANETS } from "./planetsData.js";
import hasWebGL from "./hasWebGL.js";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion.js";

function SolarSystemScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const webGLAvailable = useMemo(() => hasWebGL(), []);
  const [activeSection, setActiveSection] = useState("hero-section");
  const objectRefs = useRef({});
  const registerRef = (section, object) => {
    if (object) {
      objectRefs.current[section] = object;
    } else {
      delete objectRefs.current[section];
    }
  };

  if (!webGLAvailable) {
    return <div className="webgl webgl-fallback" aria-hidden="true" />;
  }

  return (
    <Canvas
      className="webgl"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
      camera={{ position: [2.5, 2, 6], fov: 45, near: 0.1, far: 200 }}
    >
      <ambientLight intensity={0.18} />
      <directionalLight position={[0, 3, 2]} intensity={0.45} />
      <Stars />
      <ShootingStar prefersReducedMotion={prefersReducedMotion} />
      <Suspense fallback={null}>
        <Sun prefersReducedMotion={prefersReducedMotion} registerRef={registerRef} />
        {PLANETS.map((planet) => (
          <Planet
            key={planet.name}
            planet={planet}
            prefersReducedMotion={prefersReducedMotion}
            isActive={activeSection === planet.section}
            registerRef={registerRef}
          />
        ))}
      </Suspense>
      <ScrollCameraRig
        prefersReducedMotion={prefersReducedMotion}
        onActiveSectionChange={setActiveSection}
        objectRefs={objectRefs}
      />
    </Canvas>
  );
}

export default SolarSystemScene;
