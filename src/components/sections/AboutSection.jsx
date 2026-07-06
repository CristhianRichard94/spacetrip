const ABOUT_LINES = [
  "Graduated as system engineer from U.T.N.",
  "Proactive, reliable, team player, problem solver.",
  "Friendly, communicative, outgoing.",
  "Sports advocate, Nature lover, traveler.",
];

function AboutSection() {
  return (
    <section className="main-section align-right" id="about-me-section">
      <h1>About me</h1>
      <div className="text">
        {ABOUT_LINES.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}

export default AboutSection;
