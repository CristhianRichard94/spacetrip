import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SunEnhanced from "./Sun.enhanced.jsx";
import PlanetEnhanced from "./Planet.enhanced.jsx";
import ScrollCameraRig from "./ScrollCameraRig.jsx";
import StarsEnhanced from "./Stars.enhanced.jsx";
import AsteroidBeltEnhanced from "./AsteroidBelt.enhanced.jsx";
import CometEnhanced from "./Comet.enhanced.jsx";
import ShootingStar from "./ShootingStar.jsx";
import OrbitLine from "./OrbitLine.jsx";
import { PLANETS } from "./planetsData.js";

const AMBIENT_INTENSITY = 0.16;
const DIRECTIONAL_INTENSITY = 0.35;
const LIGHT_FADE_MS = 1200;
const CONTENT_READY_TIMEOUT_MS = 4000;

// Meshes/textures pop in as they resolve behind the Suspense boundary below,
// which looks like a glitch once the camera has moved away from the sun.
// Fading lights up from 0 (instead of snapping to full intensity) once
// content is actually mounted hides that pop-in instead of masking it.
function FadeInLights({ active }) {
  const ambientRef = useRef(null);
  const directionalRef = useRef(null);
  const startRef = useRef(null);

  useFrame(() => {
    if (!active || !ambientRef.current || !directionalRef.current) return;
    if (startRef.current === null) startRef.current = performance.now();
    const t = Math.min((performance.now() - startRef.current) / LIGHT_FADE_MS, 1);
    const eased = t * t * (3 - 2 * t);
    ambientRef.current.intensity = AMBIENT_INTENSITY * eased;
    directionalRef.current.intensity = DIRECTIONAL_INTENSITY * eased;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0} />
      <directionalLight ref={directionalRef} position={[0, 3, 2]} intensity={0} castShadow />
    </>
  );
}

// Suspense only mounts its children once every resource inside has resolved,
// so this effect firing is the actual "content ready" signal — earlier than
// that (e.g. Canvas onCreated) the meshes/textures are still streaming in.
function ContentReadyMarker({ onReady }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

function SolarSystemSceneEnhanced({ prefersReducedMotion, lowPower, onContextLost, onReady }) {
  const webGLAvailable = true;
  const [contentReady, setContentReady] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");
  const objectRefs = useRef({});
  const contentReadyFiredRef = useRef(false);

  const markContentReady = () => {
    if (contentReadyFiredRef.current) return;
    contentReadyFiredRef.current = true;
    setContentReady(true);
    onReady?.();
  };

  // Safety net: if Suspense content (textures) hasn't resolved within
  // CONTENT_READY_TIMEOUT_MS, force the scene to light up anyway instead of
  // staying dark forever if a texture request stalls or fails silently.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      markContentReady();
    }, CONTENT_READY_TIMEOUT_MS);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const registerRef = (section, object) => {
    if (object) {
      objectRefs.current[section] = object;
    } else {
      delete objectRefs.current[section];
    }
  };

  const enablePostFx = !lowPower;

  if (!webGLAvailable) return null;

  return (
    <Canvas
      dpr={[1, 2]}
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
      }}
    >
      <color attach="background" args={["#050b1f"]} />
      <FadeInLights active={contentReady} />
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
        <ContentReadyMarker onReady={markContentReady} />
      </Suspense>
      <ScrollCameraRig
        prefersReducedMotion={prefersReducedMotion}
        onActiveSectionChange={setActiveSection}
        objectRefs={objectRefs}
      />
      {enablePostFx && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.2} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

export default SolarSystemSceneEnhanced;
