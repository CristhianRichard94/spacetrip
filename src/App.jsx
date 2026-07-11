import { useRef } from "react";
import useSectionHighlight from "./hooks/useSectionHighlight";
import Navbar from "./components/Navbar.jsx";
import SolarSystemScene from "./components/scene/SolarSystemScene.jsx";
import HeroSection from "./components/sections/HeroSection.jsx";
import PortfolioSection from "./components/sections/PortfolioSection.jsx";
import AboutSection from "./components/sections/AboutSection.jsx";
import ExperienceSection from "./components/sections/ExperienceSection.jsx";
import EducationSection from "./components/sections/EducationSection.jsx";
import LanguagesSection from "./components/sections/LanguagesSection.jsx";
import SkillsSection from "./components/sections/SkillsSection.jsx";
import SocialsSection from "./components/sections/SocialsSection.jsx";

function App() {
  const audioRef = useRef(null);
  useSectionHighlight();

  return (
    <>
      <audio ref={audioRef} autoPlay loop muted>
        <source src="background-music.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Navbar audioRef={audioRef} />
      <SolarSystemScene />

      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <LanguagesSection />
      <SkillsSection />
      <SocialsSection />
    </>
  );
}

export default App;
