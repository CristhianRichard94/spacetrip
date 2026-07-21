import { lazy, Suspense, useEffect, useRef, useState } from "react";
import useSectionHighlight from "./hooks/useSectionHighlight";
import Navbar from "./components/Navbar.jsx";
import ChunkErrorBoundary from "./components/ChunkErrorBoundary.jsx";
import { SceneModeProvider, useSceneModeContext } from "./context/SceneModeContext.jsx";
import HeroSection from "./components/sections/HeroSection.jsx";
import PortfolioSection from "./components/sections/PortfolioSection.jsx";
import AboutSection from "./components/sections/AboutSection.jsx";
import ExperienceSection from "./components/sections/ExperienceSection.jsx";
import EducationSection from "./components/sections/EducationSection.jsx";
import LanguagesSection from "./components/sections/LanguagesSection.jsx";
import SkillsSection from "./components/sections/SkillsSection.jsx";
import SocialsSection from "./components/sections/SocialsSection.jsx";

const SceneRoot = lazy(() => import("./components/scene/SceneRoot.jsx"));
const Chatbot = lazy(() => import("./components/Chatbot.jsx"));

function AppContent({ audioRef, mounted }) {
  const { resolved } = useSceneModeContext();

  return (
    <>
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
          <Suspense fallback={null}>
            <SceneRoot />
          </Suspense>
        </ChunkErrorBoundary>
      )}

      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <LanguagesSection />
      <SkillsSection />
      <SocialsSection />
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SceneModeProvider>
      <AppContent audioRef={audioRef} mounted={mounted} />
    </SceneModeProvider>
  );
}

export default App;
