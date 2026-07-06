const LANGUAGES = [
  { language: "English", level: "Fluent" },
  { language: "Spanish", level: "Native" },
  { language: "Deutsch", level: "Basic" },
];

function LanguagesSection() {
  return (
    <section className="main-section align-left" id="languages-section">
      <h1>Languages</h1>
      <div className="text">
        <ul>
          {LANGUAGES.map((entry) => (
            <li key={entry.language}>
              {entry.language}: {entry.level}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LanguagesSection;
