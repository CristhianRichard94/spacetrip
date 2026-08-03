// Single source of truth for the chatbot's knowledge about Cristhian Richard.
// Edit this file to keep the bot's answers accurate — it must never contain
// anything that isn't true, and the bot must never add to it at answer time.

const RESUME_CONTEXT = `
Name: Cristhian Richard.
Role: Fullstack AI Developer (Senior). Angular · Lit.js · Python · GCP.
Location: Argentina, Remote. Contact: richardcristhian94@gmail.com, +54 3442 689884.
linkedin.com/in/cristhian-richard-bb9060174 | cristhian-richard.com | github.com/CristhianRichard94

Summary:
Fullstack Developer with 6+ years of experience building production web applications with
Angular and Lit.js, backed by Python and Node.js APIs on GCP, plus React and Next.js experience
through personal projects. Contributed to ~15 projects at Media.Monks across cross-functional,
English-speaking teams of 1 to 12, including AI-powered metadata pipelines for 20,000+ websites
and a RAG system built for AI-driven marketing copy generation. Comfortable owning projects end
to end, from architecture to deployment.

Education:
- Universidad Tecnológica Nacional (UTN), Concepción del Uruguay, Argentina.
  - Information Systems Engineer, 2014 - 2019 (granted 06/06/2019).

Experience:
- Freelance Software Engineer, 06/2025 - present.
  - Built Caseritas, a Next.js cloud-native management app for a wholesale rotisería client:
    automated inventory tracking, order workflows, and role-based profiles (admin, sales, kitchen),
    reducing manual, repetitive operational tasks.
  - Designed and deployed AI-powered automation workflows (Make) for small businesses, including
    automated social media content generation and intelligent email response systems.
  - Developed high-converting landing pages for small businesses using modern frontend
    technologies, supporting digital presence and customer acquisition.

- Media.Monks, 01/2021 - 06/2025 (4 years 6 months, Remote).
  - Fullstack AI Developer, 04/2025 - 06/2025 (3 months; title formalized, AI work began mid-2024).
    - Engineered AI-powered metadata generation pipelines for over 20,000 websites using Vertex AI
      on GCP, producing enriched metadata to improve content discoverability and SEO accuracy.
    - Iterated on an AI-powered marketing copy generation solution: started by generating copy
      directly with a fine-tuned Gemini model, by myself, evolved it into a version-controlled
      workflow for managing instructions, documents, and prompts through Gemini Gems, and
      ultimately built a RAG system using GCP technologies to ground copy generation in reference
      documents.
  - Senior Frontend Developer, 05/2023 - 04/2025 (2 years).
    - Promoted to Senior after leading full-lifecycle development of complex Angular applications,
      including a dynamic marketing site builder used by a Fortune 500 marketing team.
    - Built a Scorecard Lit.js internal-use app responsible for displaying dynamic, interactive
      tables with site scores.
    - Delivered Lit.js and Python-based live events and game experiences as part of marketing
      campaigns.
    - Contributed to building a multi-tenant AI campaign management platform using Vue.js and
      Nest.js.
    - Created and deployed GCP Cloud Functions and App Engine services, managing versioning and
      IAM permissions.
    - Took on backend ownership across Python services, expanding beyond the original frontend
      scope of the role.
  - Frontend Developer, 01/2021 - 05/2023 (2 years 5 months).
    - Built and evolved a complex Angular and Python-driven CMS site builder used internally by a
      Fortune 500 marketing team.
    - Implemented server-side rendering for the site builder using Angular Universal with a
      minimalist approach: stripped unused CSS (keeping only visible-component styles) and unused
      JS from the bundle, and added lightweight client scripts scoped to each component's exact
      needs (e.g., binding scroll listeners for a carousel), significantly cutting bundle size and
      page load time.

- Sidesys IT Solutions, Frontend Developer, 06/2019 - 01/2021 (1 year 8 months).
  - Built features on an Angular-based Cashier Application connected to a large-scale queue
    management .NET Framework system, streamlining customer queues and improving branch
    efficiency.
  - Modernized legacy Web Forms applications by integrating reusable Vue.js Web Components,
    improving modularity and maintainability.
  - Developed a multi-step survey application and an appointment management frontend using
    Angular, integrating with a .NET Framework backend via OpenAPI to improve client scheduling
    efficiency.

Personal projects:
- Multi-agent Claude Code workflow — custom setup with specialized agents (software-engineer, QA,
  security, UX, UI) orchestrated via SubagentStop hooks; used across recent freelance and personal
  projects.
- AI Engineer Path (github.com/CristhianRichard94/ai-engineer-path) — MCP servers (task tracking,
  media/transcription), RAG doc bot (Flask, Next.js, Celery, Qdrant), voice assistant pipeline
  (STT/GPT/TTS), OpenAI-powered chat app.
- Roomigos (github.com/CristhianRichard94/roomigos) — Next.js 14 + React 18 + TypeScript, Tailwind
  CSS 4, shadcn/Radix UI, Firebase messaging, react-hook-form + zod. Deployed on Vercel.
- Spacetrip (github.com/CristhianRichard94/spacetrip) — this site. React 18, Vite, React Three
  Fiber/Drei/postprocessing, GSAP, Tailwind CSS. Interactive 3D portfolio, consumes a separate
  design-system project as local packages.
- Design System (github.com/CristhianRichard94/design-system) — pnpm workspace monorepo with a
  design-tokens package, shared UI component package, and showcase app; shared dependency for
  other personal projects such as Spacetrip.
- Futsal Manager (github.com/CristhianRichard94/futsal-manager) — FastAPI + SQLAlchemy +
  PostgreSQL + JWT backend, Next.js + NextAuth (Google OAuth) frontend, Mercado Pago payments.
- Spotify Code Generator (github.com/CristhianRichard94/Spotify-Code-Generator) — Python/Flask
  backend with Flask-Limiter, Three.js frontend, OpenSCAD SVG/STL generation, Docker on Fly.io.

Certifications:
- English C1 Proficiency (IELTS), 02/2025.
- Claude Code: A Highly Agentic Coding Assistant — DeepLearning.AI, 06/2026.
- MCP: Build Rich-Context AI Apps with Anthropic — DeepLearning.AI, 06/2026.
- Agentic AI — DeepLearning.AI, 06/2026.
- Generative AI for Software Development — DeepLearning.AI, 06/2026.
- Retrieval Augmented Generation (RAG) — DeepLearning.AI, 07/2026.

Technical skills:
- Frontend/Backend: Angular, Lit.js, React, Next.js, Vue.js, TypeScript, Python, Node.js,
  .NET Framework, RESTful APIs, Flask.
- Cloud & DevOps: GCP (Cloud Functions, Vertex AI), AWS, Docker, CI/CD, Microservices.
- AI & ML: LLM Integration, RAG, Agentic AI, MCP, Prompt Engineering, Fine-tuning, Vector DBs.

Languages:
- Spanish (native).
- English (fluent) — IELTS C1 Advanced, 02/2025.

About: Graduated as a systems engineer from UTN. Proactive, reliable, team player,
problem-solving mindset, direct and honest communicator.

Relocation: Willing to relocate as needed. Priority order:
Plan A: move to Spain with a remote job (digital nomad visa).
Plan B: relocate to Central America, keeping a LATAM/US remote job.
Plan C: remote job, staying in Argentina.
Plan D: hybrid/on-site job somewhere in Argentina.
Plan E: on-site job in Concepción del Uruguay, Entre Ríos.

Role/seniority openness: Targeting Senior Fullstack Developer roles (Angular-heavy or general
fullstack) and AI Engineer roles where a strong engineering foundation matters as much as
AI-specific tenure. Open to Senior, Mid, Junior (big companies only) roles, any company size or
type, including forward-deployed/product-engineer roles.
`.trim();

module.exports = { RESUME_CONTEXT };
