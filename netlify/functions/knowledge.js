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
    -Built a client in vue.js, server in python with flask, using celery as broker and redis a queue db, an app to stream tweets by keywords and store them in a mongo database for later analysis.
    -Built a python script to analyze the tweets stored in the database, and generate a report with the most relevant information.
Personal/side projects:
- Roomigos: Next.js 14 + React 18 + TypeScript web app, Tailwind CSS 4, shadcn/Radix UI components, Firebase for messaging/chat, react-hook-form + zod for forms/validation. Single Next.js App Router app deployed on Vercel.
- Financial Assistant (FinSight): pnpm monorepo — Next.js 15 frontend/API plus a separate Python RAG backend (FastAPI, Claude for answer synthesis, OpenAI embeddings, Supabase/pgvector for vector storage). Infrastructure defined with AWS CDK. Used git worktrees to work on multiple parallel features/branches at once.
- AI Engineer Path: a learning repo of several independent AI-focused apps, including an MCP (Model Context Protocol) server for task tracking and another MCP server for media/transcription tooling, a RAG-based document bot (Flask + Next.js + Celery + Qdrant), a voice assistant pipeline (speech-to-text -> GPT -> text-to-speech), and an OpenAI-powered chat app.
- Spotify Code Generator: Python/Flask backend with rate limiting (Flask-Limiter), Three.js frontend, OpenSCAD used to generate SVG/STL files, deployed via Docker to Fly.io.
- Spacetrip: this site — React 18 + Vite, React Three Fiber/Drei/postprocessing (Three.js scenes), GSAP for scroll animation, Tailwind CSS. Consumes a separate design-system project as local packages.
- Design System: pnpm workspace monorepo with a design-tokens package, a shared UI component package, and a showcase app; used as a shared dependency by other personal projects such as Spacetrip.
- Futsal Manager: two-service app — FastAPI + SQLAlchemy + PostgreSQL + JWT auth backend, and a Next.js + NextAuth (Google OAuth) frontend with Mercado Pago payment integration.

Skills:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, Angular, React, Next.js, Lit, Vue.js, Three.js.
  Holds Microsoft Exam 70-480 certification.
- Backend: Node.js, Python, .NET Framework, SQL, MongoDB.
- DevOps: Git, GitHub, Docker, Vercel, GCP, Fly.io, AWS: IAM ECS2 CDK S3.

Languages:
-Spanish (native)
-English (fluent) IELTS C1 Advanced qualification 02/2025


About: Graduated as a systems engineer from UTN. Proactive, reliable, team player,
problem solving mindset, positive, friendly, communicative, outgoing. Sports advocate, nature lover, traveler.
`.trim();

module.exports = { RESUME_CONTEXT };
