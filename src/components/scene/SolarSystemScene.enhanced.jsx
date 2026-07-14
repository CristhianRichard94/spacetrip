import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import SunEnhanced from "./Sun.enhanced.jsx";
import PlanetEnhanced from "./Planet.enhanced.jsx";
import ScrollCameraRig from "./ScrollCameraRig.jsx";
import StarsEnhanced from "./Stars.enhanced.jsx";
import AsteroidBeltEnhanced from "./AsteroidBelt.enhanced.jsx";
import CometEnhanced from "./Comet.enhanced.jsx";
import ShootingStar from "./ShootingStar.jsx";
import OrbitLine from "./OrbitLine.jsx";
import { PLANETS, SUN_WAYPOINT } from "./planetsData.js";

const WAYPOINT_DISTANCE = {
  [SUN_WAYPOINT.section]: 0,
  ...Object.fromEntries(PLANETS.map((planet) => [planet.section, planet.orbitRadius])),
};

function SolarSystemSceneEnhanced({ prefersReducedMotion, lowPower, onContextLost, onReady }) {
  const webGLAvailable = true;
  const [activeSection, setActiveSection] = useState("hero-section");
  const objectRefs = useRef({});
  const registerRef = (section, object) => {
    if (object) {
      objectRefs.current[section] = object;
    } else {
      delete objectRefs.current[section];
    }
  };

  const enablePostFx = !lowPower;
  const focusDistance = Math.min((WAYPOINT_DISTANCE[activeSection] ?? 6) / 30, 1);

  if (!webGLAvailable) return null;

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
      shadows
      camera={{ position: [2.5, 2, 6], fov: 45, near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            onContextLost?.();
          },
          { once: true }
        );
        onReady?.();
      }}
    >
      <color attach="background" args={["#050b1f"]} />
      <ambientLight intensity={0.16} />
      <directionalLight position={[0, 3, 2]} intensity={0.35} castShadow />
      <StarsEnhanced lowPower={lowPower} />
      <ShootingStar prefersReducedMotion={prefersReducedMotion} />
      {PLANETS.map((planet) => (
        <OrbitLine key={`orbit-${planet.name}`} radius={planet.orbitRadius} />
      ))}
      <Suspense fallback={null}>
        <SunEnhanced prefersReducedMotion={prefersReducedMotion} registerRef={registerRef} />
        {PLANETS.map((planet) => (
          <PlanetEnhanced
            key={planet.name}
            planet={planet}
            prefersReducedMotion={prefersReducedMotion}
            isActive={activeSection === planet.section}
            registerRef={registerRef}
            lowPower={lowPower}
          />
        ))}
        <AsteroidBeltEnhanced prefersReducedMotion={prefersReducedMotion} lowPower={lowPower} />
        {!lowPower && <CometEnhanced prefersReducedMotion={prefersReducedMotion} />}
      </Suspense>
      <ScrollCameraRig
        prefersReducedMotion={prefersReducedMotion}
        onActiveSectionChange={setActiveSection}
        objectRefs={objectRefs}
      />
      {enablePostFx && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.2} />
          <DepthOfField focusDistance={focusDistance} focalLength={0.05} bokehScale={2.5} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

export default SolarSystemSceneEnhanced;
