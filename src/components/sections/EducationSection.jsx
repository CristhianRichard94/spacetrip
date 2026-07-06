const DEGREES = [
  { title: "University systems analyst", granted: "Granted: 20/09/2018" },
  { title: "Information system engineer", granted: "Granted: 06/06/2019" },
];

function EducationSection() {
  return (
    <section className="main-section align-right" id="education-section">
      <h1>Education</h1>
      <div className="text">
        <ul>
          <li>
            Universidad Tecnológica Nacional Regional Concepción del Uruguay
            <p>Bachelors degree</p>
            <ul>
              {DEGREES.map((degree) => (
                <li key={degree.title}>
                  <p>{degree.title}</p>
                  <p>{degree.granted}</p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p>
              EET N°2 “Francisco Ramirez” Highschool -Technical degree
              Degree:
            </p>
            <p>Electrician technician, industrial electronics oriented.</p>
            <p>Term: 2007-2013</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default EducationSection;
