// Single source of truth for the chatbot's knowledge about Cristhian Richard.
// Edit this file to keep the bot's answers accurate — it must never contain
// anything that isn't true, and the bot must never add to it at answer time.

const RESUME_CONTEXT = `
Name: Cristhian Richard.
Role: Senior Fullstack AI Engineer / Freelance Software Engineer.

Education:
- Universidad Tecnológica Nacional (UTN), Regional Concepción del Uruguay, Argentina.
  - Information System Engineer, granted 06/06/2019.
  - University Systems Analyst, granted 20/09/2018.
- EET N°2 "Francisco Ramirez" Highschool - Technical degree, Electrician technician,
  industrial electronics oriented, 2007-2013.

Experience:
- Freelance software engineer, since 05/2025.
- Senior Fullstack AI Engineer at Media.Monks, 01/2021 - 05/2025.
- Fullstack Developer at SIDESYS IT Solutions, 06/2019 - 01/2021.
- Scholar/researcher in a database research group at FRCU-UTN, since 03/2018.

Skills:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, Angular, React, Lit, Vue.js, Three.js.
  Holds Microsoft Exam 70-480 certification.
- Backend: Node.js, Python, .NET Framework, SQL, MongoDB.

Languages: English (fluent), Spanish (native), German/Deutsch (basic).

About: Graduated as a systems engineer from UTN. Proactive, reliable, team player,
problem solver, friendly, communicative, outgoing. Sports advocate, nature lover, traveler.
`.trim();

module.exports = { RESUME_CONTEXT };
