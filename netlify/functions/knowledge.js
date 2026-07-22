// Single source of truth for the chatbot's knowledge about Cristhian Richard.
// Edit this file to keep the bot's answers accurate — it must never contain
// anything that isn't true, and the bot must never add to it at answer time.

const RESUME_CONTEXT = `
Name: Cristhian Richard.
Role: Senior Fullstack AI Engineer / Software Engineer.

Education:
- Universidad Tecnológica Nacional (UTN), Regional Concepción del Uruguay, Argentina.
  - Information System Engineer, granted 06/06/2019.
  - University Systems Analyst (Mid degree), granted 20/09/2018.
- EET N°2 "Francisco Ramirez" Highschool - Technical degree, Electrician technician,
  industrial electronics oriented, 2007-2013.

Experience:
- Freelance software engineer, since 05/2025.
  - Worked in several projects building from scratch, including:
    - Built Next.js + Tailwind serverless webapp to manage users, products, categories and orders for a small business, using Supabase as backend and database.
    - Built Make automations for small businesses, including automations to create invoices in PDF and send them by email, create and update products in a database, and send notifications to users.

- Senior Fullstack AI Engineer at Media.Monks, 01/2021 - 05/2025. (Started as Mid Frontend, promoted to Senior Fullstack Engineer in 2024 and ended up as Senior Fullstack AI Engineer in 2025).
  - Worked in several projects, always using Scrum methodology, including:
    - Built from scratch a complex Angular frontend +python (wrapper connected to Kintaro CMS) application that allowed Google marketeers to build sites from a drag and drop UI, setting up customizable components that must follow G standards, pages that later on get bundled on a node server and deployed to GCP. I lead the frontend development, jump in backend tasks and managed deployments in GCP environment for two years.
    - Built from scratch a React+python called scorecard that allowed Google marketeers to visualize marketing sites scoring across different metrics, markets and regions.
    - Worked in an Angular Playbook application that documented the best practices for building marketing sites and using web components.
    - Built from scratch a React+python game application in a tight deadline for an android version release featuring F1, developing a set of games in javascript. Live in: https://www.android.com/android-15-games/?utm_source=facebook&utm_medium=social&utm_campaign=i/o_fb_social&linkId=9852027&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExc2NFREVjOUJzWkx4YmE5MwEe4JzKs6PTNVDCmkHzKRfT3vGbMFiOcx1D48gsHzC_AfvB5Ue9QAKA7LTAp7M_aem_5nlH3zFxx63jIqjc9S9Mbw
    - Built email templates for Google marketing campaigns using html and css following Google standards.
    - Setup and execute a workflow to fetch 20k sites metadata from google.developers sitemaps.xml, store them in sheets and then using Gemini LLM Python API generate a better set of titles and descriptions for each site using a structured prompt and a extensive list of examples as context, then update the sheets with the new data and finally update the sites metadata using a python script that used Google API to update the sites metadata. Saving a huge amount of time in rewriting and updating metadata for sites didn't have a proper title and description.
    - Contributed in the development of a Complex Vue.js frontend + nest.js backend multi-tenant application to create and edit AI-Video ads for Google marketing campaigns, using Gemini/Open AI to generate videos and scripts.
    - Setup and execute a workflow to generate copies for Google marketing sites, once using a fine-tuned model I had to train with a dataset of copies made by copywriters and a second time using Gemini Gems, giving structured prompts, system instructions and guidelines documents as context. The workflow included feedback from copywriters I feed the gem back in a versioned iterative process until standards were met. This tool was used then to generate copies for sites saving writers 60% iof their time by only reviewing copy.
- Fullstack Developer at SIDESYS IT Solutions, 06/2019 - 01/2021.
  - Worked in several projects, always using Scrum methodology, including:
    -Contributed to the development of a multi-tenant cashier multi-queue system for banks, using Angular, web-components in Vue.js and a complex multilayer backend in .NET Framework connected to MySQL db.
    -Developed and bugfixed several applications in webforms and MVC.
    -Built from scratch a multi-tenant Angular web application to answer surveys and send the results to a backend in .NET Framework connected to a MySQL db.
    -Built a multi-tenant web application in Angular to create and  manage appointments, connected to a backend in .NET Framework.
- Scholar/researcher in a database research group at FRCU-UTN, since 03/2018.
  - Worked in several research projects, including:
    -Built a client in vue.js, server in python with flask, using celery as broker and redis a queue db, an app to stream tweets by keywords and store them in a mongo database for later analysis. Repo: https://github.com/GIBD/tweets-harvester
    -Built a python script to analyze the tweets stored in the database, and generate a report with the most relevant information. Repo: https://github.com/CristhianRichard94/tweets-evaluator
Personal/side projects:
- Roomigos(https://github.com/CristhianRichard94/roomigos): Next.js 14 + React 18 + TypeScript web app, Tailwind CSS 4, shadcn/Radix UI components, Firebase for messaging/chat, react-hook-form + zod for forms/validation. Single Next.js App Router app deployed on Vercel.
- Financial Assistant (https://github.com/CristhianRichard94/Financial-Assistant): pnpm monorepo — Next.js 15 frontend/API plus a separate Python RAG backend (FastAPI, Claude for answer synthesis, OpenAI embeddings, Supabase/pgvector for vector storage). Infrastructure defined with AWS CDK. Used git worktrees to work on multiple parallel features/branches at once.
- AI Engineer Path(https://github.com/CristhianRichard94/ai-engineer-path): a learning repo of several independent AI-focused apps, including an MCP (Model Context Protocol) server for task tracking and another MCP server for media/transcription tooling, a RAG-based document bot (Flask + Next.js + Celery + Qdrant), a voice assistant pipeline (speech-to-text -> GPT -> text-to-speech), and an OpenAI-powered chat app.
- Spotify Code Generator(https://github.com/CristhianRichard94/Spotify-Code-Generator): Python/Flask backend with rate limiting (Flask-Limiter), Three.js frontend, OpenSCAD used to generate SVG/STL files, deployed via Docker to Fly.io.
- Spacetrip(https://github.com/CristhianRichard94/spacetrip): this site — React 18 + Vite, React Three Fiber/Drei/postprocessing (Three.js scenes), GSAP for scroll animation, Tailwind CSS. Consumes a separate design-system project as local packages.
- Design System(https://github.com/CristhianRichard94/design-system): pnpm workspace monorepo with a design-tokens package, a shared UI component package, and a showcase app; used as a shared dependency by other personal projects such as Spacetrip.
- Futsal Manager(https://github.com/CristhianRichard94/futsal-manager): two-service app — FastAPI + SQLAlchemy + PostgreSQL + JWT auth backend, and a Next.js + NextAuth (Google OAuth) frontend with Mercado Pago payment integration.

Skills:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, Angular, React, Next.js, Lit, Vue.js, Three.js.
  Holds Microsoft Exam 70-480 certification.
- Backend: Node.js, Python, .NET Framework, SQL, MongoDB.
- DevOps: Git, GitHub, Docker, Vercel, GCP, Fly.io, AWS: IAM ECS2 CDK S3.

Courses:
- Udemy
  - Advanced Angular by Fernando Herrera, Udemy, 2020.
- DeepLearning.ai
    - MCP: Build Rich-Context AI Apps with Anthropic - jun. 2026
    - Claude Code: A Highly Agentic Coding Assistant - jun. 2026
    - Agentic AI - jun. 2026
    - Generative AI for Software Development - jun. 2026
- Linkedin Learning
  - Programming Foundations: Secure Coding (2018) - Dec 2024
  - React.js Essential Training (2020) - Nov 2020
  - Learning JavaScript Animations with GreenSock - Oct 2021
  - Penetration Testing: Advanced Web Testing (2018) - Sep 2021
  - Web Security: Same-Origin Policies - May 2019
  - Python Essential Training - Apr 2024
  - GraphQL Essential Training (2022) - Jun 2022
  - Building RESTful APIs with Flask - Aug 2019
  - Programming Foundations: Web Security (2019) - May 2019
  - React: Creating and Hosting a Full-Stack Site (2022) - Sep 2022
  - React.js: Building an Interface - Apr 2021
  - React.js Essential Training - May 2022
  - Learning Threat Modeling for Security Professionals - Jul 2024
  - Learning the OWASP Top 10 - Aug 2024
  - JavaScript: Patterns - Oct 2025
  - Web Security: User Authentication an 2019
  - JavaScript: Security Essentials (2019) - Jan 2019
  - TypeScript Essential Training (2016) - May 2016
  - Preventing Harassment in the Workplace
  - Fighting Gender Bias at Work - Apr 2019
  - Out and Proud: Approaching LGBT Issues in the Workplace - Jun 2020 (Retired)
  - Communicating about Culturally Sensitive Issues (2022)
  - Unconscious Bias (2017) - May 2017
...Among others


Languages:
-Spanish (native)
-English (fluent) => Taken IELTS Exam with C1 Advanced qualification - 02/2025

Summary:
- Started working with Angular in 2018 at University, continued in Sidesys IT Solutions and Media.Monks,
- Learned React While in Media.Monks around 2022 and Next.js around 2024,
- Been learning about Neural Networks, Machine Learning, AI, LLMs, Fine tunning models, RAGs since 2024 with a previous background at university and database research group work.
- Learned Python in 2018 at University, went deep in Media.Monks on 2021 and personal projects. Using it since then.
- Started using Node as backend in 2022 for Media.Monks projects, using it since then.

About: Graduated as a systems engineer from UTN. Proactive, reliable, team player,
problem solving mindset, positive, friendly, communicative, outgoing. Sports advocate, nature lover, traveler.

Relocation: Willing to relocate as needed. Priority order:
Plan A: move to Spain with a remote job (digital nomad visa).
Plan B: relocate to Central America, keeping a LATAM/US remote job.
Plan C: remote job, staying in Argentina.
Plan D: hybrid/on-site job somewhere in Argentina.
Plan E: on-site job in Concepcion del Uruguay, Entre Rios.

Role/seniority openness: Targeting AI Engineer roles (any seniority - experience
in the field is short but daily practice with agentic coding and ongoing
courses/learning) and Fullstack/Frontend Engineer roles (AI-native or not).
Open to Senior, Ssr (mid-level, any company size) and Junior (big/established
companies only) roles. Open to any company size or type, including
forward-deployed/product-engineer, per-project roles.
`.trim();

module.exports = { RESUME_CONTEXT };
