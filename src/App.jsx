import { lazy, Suspense, useEffect, useRef, useState } from "react";
import useSectionHighlight from "./hooks/useSectionHighlight";
import useStaggerReveal from "./hooks/useStaggerReveal";
import Navbar from "./components/Navbar.jsx";
import AppLoader from "./components/AppLoader.jsx";
import ChunkErrorBoundary from "./components/ChunkErrorBoundary.jsx";
import { SceneModeProvider, useSceneModeContext } from "./context/SceneModeContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import HeroSection from "./components/sections/HeroSection.jsx";
import PortfolioSection from "./components/sections/PortfolioSection.jsx";
import AboutSection from "./components/sections/AboutSection.jsx";
import ExperienceSection from "./components/sections/ExperienceSection.jsx";
import EducationSection from "./components/sections/EducationSection.jsx";
import LanguagesSection from "./components/sections/LanguagesSection.jsx";
import SkillsSection from "./components/sections/SkillsSection.jsx";
import SocialsSection from "./components/sections/SocialsSection.jsx";

const SceneRoot = lazy(() => import("./components/scene/SceneRoot.jsx"));
const ClassicSceneFallback = lazy(() => import("./components/scene/SolarSystemScene.jsx"));
const Chatbot = lazy(() => import("./components/Chatbot.jsx"));

function AppContent({ audioRef, mounted }) {
  const { resolved, loading } = useSceneModeContext();
  const [chunkReady, setChunkReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  // Tracks the classic-fallback -> SceneRoot swap explicitly instead of
  // letting Suspense do it instantaneously (fallback -> children happens in
  // one commit with no gap for the GPU to release the fallback's WebGL
  // context before SceneRoot's own Canvas creates a new one — see #25).
  const [showFallbackScene, setShowFallbackScene] = useState(true);
  const [mountSceneRoot, setMountSceneRoot] = useState(false);

  useEffect(() => {
    import("./components/scene/SceneRoot.jsx")
      .then(() => setChunkReady(true))
      .catch(() => setChunkReady(true));
  }, []);

  useEffect(() => {
    if (!chunkReady) return undefined;

    setShowFallbackScene(false);

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setMountSceneRoot(true);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [chunkReady]);

  const sceneReady = resolved && chunkReady && !loading;

  useEffect(() => {
    if (!sceneReady || !showLoader) return undefined;
    const timer = setTimeout(() => setShowLoader(false), 700);
    return () => clearTimeout(timer);
  }, [sceneReady, showLoader]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {showLoader && <AppLoader exiting={sceneReady} />}

      {/* deferred past first paint: 32MB file, must not compete with LCP */}
      {mounted && (
        <audio ref={audioRef} autoPlay loop muted>
          <source src="background-music.wav" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <Navbar audioRef={audioRef} />
      {resolved && (
        <ChunkErrorBoundary>
          {/* SceneRoot's chunk bundles both classic + enhanced scenes and
              can take several seconds to download. Show the lighter classic
              scene (its own chunk) as an instant stand-in so the page never
              goes blank, then swap in SceneRoot once it's ready. The swap
              itself is gapped (unmount fallback, wait two rAFs, mount
              SceneRoot) so the two Canvases never hold live WebGL contexts
              at the same time — see #25. */}
          {showFallbackScene && (
            <Suspense fallback={null}>
              <ClassicSceneFallback />
            </Suspense>
          )}
          {mountSceneRoot && (
            <Suspense fallback={null}>
              <SceneRoot />
            </Suspense>
          )}
        </ChunkErrorBoundary>
      )}

      <main id="main-content">
        <HeroSection />
        <PortfolioSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <LanguagesSection />
        <SkillsSection />
        <SocialsSection />
      </main>
      <ChunkErrorBoundary>
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </ChunkErrorBoundary>
    </>
  );
}

function App() {
  const audioRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useSectionHighlight();
  useStaggerReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LanguageProvider>
      <SceneModeProvider>
        <AppContent audioRef={audioRef} mounted={mounted} />
      </SceneModeProvider>
    </LanguageProvider>
  );
}

export default App;
