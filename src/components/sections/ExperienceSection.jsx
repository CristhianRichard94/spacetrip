const EXPERIENCE_ENTRIES = [
  { title: "Working Freelance", term: "Since 05/2025" },
  {
    title: "Senior Fullstack AI Engineer at Media.Monks",
    term: "Term: 01/2021 - 05/2025",
  },
  {
    title: "Fullstack Developer at SIDESYS IT Solutions",
    term: "Term: 06/2019 - 01/2021",
  },
];

function ExperienceSection() {
  return (
    <section className="main-section align-left" id="experience-section">
      <h1>Experience</h1>
      <div className="text">
        <ul>
          {EXPERIENCE_ENTRIES.map((entry) => (
            <li key={entry.title}>
              <p>{entry.title}</p>
              <p>{entry.term}</p>
            </li>
          ))}
          <li>
            University Research Group Since 03/2018 Perform as a scholar
            within a database research group of FRCU-UTN
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ExperienceSection;
