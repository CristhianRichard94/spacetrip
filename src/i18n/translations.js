export const translations = {
  en: {
    navbar: {
      home: "Home",
      portfolio: "My portfolio",
      aboutMe: "About me",
      experience: "Experience",
      education: "Education",
      languages: "Languages",
      skills: "Skills and tools",
      socials: "My socials",
      toggleMenu: "Toggle navigation menu",
    },
    hero: {
      title: "Welcome",
      role: "Fullstack AI Developer (Senior)",
      description:
        "You can find Cristhian Richard's experience, projects, and related information by scrolling through this interactive résumé, built as a solar system.",
      location: "Argentina · Remote-OK, open to relocate",
      email: "richardcristhian94@gmail.com",
      footnote: "Made with ❤️ by Cristhian Richard",
    },
    about: {
      title: "About me",
      summary:
        "Fullstack Developer with 6+ years of experience building production web applications with Angular and Lit.js, backed by Python and Node.js APIs on GCP, plus React and Next.js experience through personal projects. Comfortable owning projects end to end, from architecture to deployment.",
      lines: {
        graduated: "Graduated as system engineer from U.T.N.",
        proactive: "Proactive, reliable, team player, problem solver.",
        friendly: "Friendly, communicative, outgoing.",
        sports: "Sports advocate, Nature lover, traveler.",
      },
    },
    education: {
      title: "Education",
      institution:
        "Universidad Tecnológica Nacional Regional Concepción del Uruguay",
      bachelors: "Bachelors degree",
      items: {
        systemsAnalyst: {
          title: "University systems analyst",
          granted: "Granted: 20/09/2018",
        },
        infoEngineer: {
          title: "Information system engineer",
          granted: "Granted: 06/06/2019",
        },
      },
      highschool: {
        degreeLabel:
          "EET N°2 “Francisco Ramirez” Highschool -Technical degree Degree:",
        technician:
          "Electrician technician, industrial electronics oriented.",
        term: "Term: 2007-2013",
      },
    },
    experience: {
      title: "Experience",
      items: {
        freelance: {
          title: "Freelance Software Engineer",
          term: "Since 06/2025",
          bullets: [
            "Built Caseritas, a Next.js cloud-native management app for a wholesale food-service client: automated inventory tracking, order workflows, and role-based profiles (admin, sales, kitchen).",
            "Designed and deployed AI-powered automation workflows (Make) for small businesses, including automated social media content generation and intelligent email response systems.",
            "Developed high-converting landing pages for small businesses using modern frontend technologies.",
          ],
        },
        mediaMonks: {
          company: "Media.Monks",
          term: "Term: 01/2021 - 05/2025 · 4 yrs 4 mos · Remote",
          roles: [
            {
              title: "Fullstack AI Developer",
              term: "Apr 2025 - May 2025 · 2 mos (title formalized; AI work began mid-2024)",
              bullets: [
                "Engineered AI-powered metadata generation pipelines for over 20,000 websites using Vertex AI on GCP, improving content discoverability and SEO accuracy.",
                "Iterated on an AI-powered marketing copy generation solution: started by generating copy directly with a fine-tuned Gemini model, evolved it into a version-controlled workflow through Gemini Gems, and ultimately built a RAG system on GCP to ground copy generation in reference documents.",
              ],
            },
            {
              title: "Senior Frontend Developer",
              term: "May 2023 - Apr 2025 · 2 yrs",
              bullets: [
                "Promoted to Senior after leading full-lifecycle development of complex Angular applications, including a dynamic marketing site builder used by a Fortune 500 marketing team.",
                "Built a Scorecard Lit.js internal-use app for displaying dynamic, interactive tables with site scores.",
                "Delivered Lit.js and Python-based live events and game experiences as part of marketing campaigns.",
                "Contributed to a multi-tenant AI campaign management platform using Vue.js and Nest.js.",
                "Created and deployed GCP Cloud Functions and App Engine services, managing versioning and IAM permissions.",
                "Took on backend ownership across Python services, expanding beyond the original frontend scope of the role.",
              ],
            },
            {
              title: "Frontend Developer",
              term: "Jan 2021 - May 2023 · 2 yrs 5 mos",
              bullets: [
                "Built and evolved a complex Angular and Python-driven CMS site builder used internally by a Fortune 500 marketing team.",
                "Implemented server-side rendering for the site builder using Angular Universal with a minimalist approach: stripped unused CSS/JS from the bundle and scoped lightweight client scripts to each component's exact needs, significantly cutting bundle size and page load time.",
              ],
            },
          ],
        },
        sidesys: {
          title: "Frontend Developer at SIDESYS IT Solutions",
          term: "Term: 06/2019 - 01/2021",
          bullets: [
            "Built features on an Angular-based Cashier Application connected to a large-scale queue management .NET Framework system.",
            "Modernized legacy Web Forms applications by integrating reusable Vue.js Web Components, improving modularity and maintainability.",
            "Developed a multi-step survey application and an appointment management frontend using Angular, integrating with a .NET Framework backend via OpenAPI.",
          ],
        },
        research: {
          title: "Research Scholar, University Research Group (FRCU-UTN)",
          term: "Since 03/2018",
          bullets: [
            "Performed as a scholar within a database research group at FRCU-UTN.",
          ],
        },
      },
    },
    languagesSection: {
      title: "Languages",
      names: {
        english: "English",
        spanish: "Spanish",
        deutsch: "Deutsch",
      },
      levels: {
        fluent: "Fluent",
        native: "Native",
        basic: "Basic",
      },
    },
    portfolio: {
      title: "My portfolio",
      projects: "Projects",
      olderProjects: "Older Projects",
      items: {
        aiEngineerPath: "AI Engineer Path: Project showcasing AI Skills",
        roomigos: "Roomigos: Room finder Application",
        futsalBooking: "Futsal Booking Application",
        automakers: "Automakers: Landing page",
        spotifyCodeGen: "Spotify Code Generator: STL 3D print generator",
        oldResume: "Old resume app",
        tweetCollector: "Tweet collector app",
        edm: "Electronic Dance Music Demo",
        skyResume: "Sky Resume Experience",
      },
    },
    skills: {
      title: "Skills and tools",
      frontend: "Frontend",
      backend: "Backend",
      credlyBadge: "Microsoft Exam 70-480 passed.",
    },
    socials: {
      title: "My socials",
    },
    chatbot: {
      header: "Ask about my experience",
      closeChat: "Close chat",
      openChat: "Open chat about my experience",
      copyMessage: "Copy message",
      greeting:
        "Hi! Ask me about Cristhian's experience, skills, education, or projects — or download his résumé below.",
      thinking: "Thinking…",
      suggestions: {
        react: "What's his experience with React?",
        projects: "What projects has he worked on?",
        devops: "What's his DevOps background?",
      },
      downloadResume: "Download résumé",
      inputPlaceholder: "Ask about my experience…",
      yourQuestion: "Your question",
      sendQuestion: "Send question",
      tryAgainIn: "Try again in",
      charactersLeft: "characters left",
      rateLimitedPrefix:
        "Whoa, that's a lot of questions! Please slow down and try again in",
      errorMessage:
        "Something went wrong reaching the chat service. Please try again in a moment.",
      noReplyFallback: "Sorry, I didn't get a reply. Please try again.",
    },
    musicToggle: {
      ariaLabel: "Toggle music",
      tooltip: "Unmute sound to get the full experience",
    },
    visualModeToggle: {
      switchToClassic: "Switch to classic view",
      switchToEnhanced: "Switch to enhanced view",
      fallbackNotice: "Enhanced view was disabled after a display error",
      tryHint: "Try the new enhanced view",
    },
    langToggle: {
      switchToSpanish: "Ver en español",
      switchToEnglish: "View in English",
    },
    loader: {
      initializing: "Initializing…",
    },
  },
  es: {
    navbar: {
      home: "Inicio",
      portfolio: "Mi portafolio",
      aboutMe: "Sobre mí",
      experience: "Experiencia",
      education: "Educación",
      languages: "Idiomas",
      skills: "Habilidades y herramientas",
      socials: "Mis redes",
      toggleMenu: "Mostrar u ocultar menú de navegación",
    },
    hero: {
      title: "Bienvenido",
      role: "Desarrollador Fullstack AI (Senior)",
      description:
        "Acá podés encontrar la experiencia, los proyectos y la información de Cristhian Richard recorriendo este currículum interactivo, hecho como un sistema solar.",
      location: "Argentina · Remoto, abierto a reubicarse",
      email: "richardcristhian94@gmail.com",
      footnote: "Hecho con ❤️ por Cristhian Richard",
    },
    about: {
      title: "Sobre mí",
      summary:
        "Desarrollador Fullstack con más de 6 años de experiencia construyendo aplicaciones web en producción con Angular y Lit.js, respaldadas por APIs en Python y Node.js sobre GCP, además de experiencia con React y Next.js en proyectos personales. Cómodo desarrollando proyectos end-to-end, desde la arquitectura hasta el despliegue.",
      lines: {
        graduated: "Egresado como ingeniero en sistemas de la U.T.N.",
        proactive: "Proactivo, confiable, con espíritu de equipo y buen resolutor de problemas.",
        friendly: "Amigable, comunicativo, extrovertido.",
        sports: "Amante del deporte, la naturaleza y los viajes.",
      },
    },
    education: {
      title: "Educación",
      institution:
        "Universidad Tecnológica Nacional Regional Concepción del Uruguay",
      bachelors: "Título de grado",
      items: {
        systemsAnalyst: {
          title: "Analista universitario de sistemas",
          granted: "Obtenido: 20/09/2018",
        },
        infoEngineer: {
          title: "Ingeniero en sistemas de información",
          granted: "Obtenido: 06/06/2019",
        },
      },
      highschool: {
        degreeLabel:
          "EET N°2 “Francisco Ramirez” - Escuela técnica secundaria - Título:",
        technician:
          "Técnico electricista, orientación en electrónica industrial.",
        term: "Período: 2007-2013",
      },
    },
    experience: {
      title: "Experiencia",
      items: {
        freelance: {
          title: "Ingeniero de software freelance",
          term: "Desde 06/2025",
          bullets: [
            "Desarrollé Caseritas, una app de gestión cloud-native con Next.js para un cliente mayorista de alimentos: automatización de inventario, flujos de pedidos y perfiles por rol (admin, ventas, cocina).",
            "Diseñé y desplegué flujos de automatización con IA (Make) para pequeñas empresas, incluyendo generación automática de contenido para redes sociales y respuesta inteligente de emails.",
            "Desarrollé landing pages de alta conversión para pequeñas empresas usando tecnologías frontend modernas.",
          ],
        },
        mediaMonks: {
          company: "Media.Monks",
          term: "Período: 01/2021 - 05/2025 · 4 años 4 meses · Remoto",
          roles: [
            {
              title: "Fullstack AI Developer",
              term: "Abr 2025 - May 2025 · 2 meses (título formalizado; trabajo con IA desde mediados de 2024)",
              bullets: [
                "Diseñé pipelines de generación de metadata con IA para más de 20.000 sitios web usando Vertex AI en GCP, mejorando la posibilidad de descubrimiento de contenido y la precisión SEO.",
                "Iteré una solución de generación de copy de marketing con IA: empecé generando copy directamente con un modelo Gemini afinado, evolucioné a un flujo versionado a través de Gemini Gems, y finalmente construí un sistema RAG en GCP para fundamentar la generación de copy en documentos de referencia.",
              ],
            },
            {
              title: "Senior Frontend Developer",
              term: "May 2023 - Abr 2025 · 2 años",
              bullets: [
                "Promovido a Senior tras liderar el desarrollo completo de aplicaciones Angular complejas, incluyendo un constructor dinámico de sitios de marketing usado por un equipo Fortune 500.",
                "Construí una app interna Scorecard con Lit.js para mostrar tablas dinámicas e interactivas con puntajes de sitios.",
                "Entregué experiencias de eventos en vivo y juegos con Lit.js y Python como parte de campañas de marketing.",
                "Contribuí a una plataforma multi-tenant de gestión de campañas con IA usando Vue.js y Nest.js.",
                "Creé y desplegué servicios de GCP Cloud Functions y App Engine, gestionando versionado y permisos IAM.",
                "Asumí responsabilidad backend en servicios Python, expandiendo el alcance original frontend del puesto.",
              ],
            },
            {
              title: "Frontend Developer",
              term: "Ene 2021 - May 2023 · 2 años 5 meses",
              bullets: [
                "Desarrollé y evolucioné un constructor de sitios CMS complejo con Angular y Python, usado internamente por un equipo Fortune 500.",
                "Implementé renderizado del lado del servidor para el constructor de sitios usando Angular Universal con un enfoque minimalista: eliminé CSS/JS no utilizado del bundle y agregué scripts livianos acotados a las necesidades exactas de cada componente, reduciendo significativamente el tamaño del bundle y el tiempo de carga.",
              ],
            },
          ],
        },
        sidesys: {
          title: "Desarrollador Frontend en SIDESYS IT Solutions",
          term: "Período: 06/2019 - 01/2021",
          bullets: [
            "Desarrollé funcionalidades en una aplicación de caja basada en Angular, conectada a un sistema de gestión de colas .NET Framework a gran escala.",
            "Modernicé aplicaciones legacy Web Forms integrando Web Components reutilizables con Vue.js, mejorando la modularidad y el mantenimiento.",
            "Desarrollé una aplicación de encuestas multi-paso y un frontend de gestión de turnos con Angular, integrando con un backend .NET Framework vía OpenAPI.",
          ],
        },
        research: {
          title: "Becario de investigación, Grupo de investigación universitario (FRCU-UTN)",
          term: "Desde 03/2018",
          bullets: [
            "Me desempeñé como becario dentro de un grupo de investigación en bases de datos de la FRCU-UTN.",
          ],
        },
      },
    },
    languagesSection: {
      title: "Idiomas",
      names: {
        english: "Inglés",
        spanish: "Español",
        deutsch: "Alemán",
      },
      levels: {
        fluent: "Avanzado",
        native: "Nativo",
        basic: "Básico",
      },
    },
    portfolio: {
      title: "Mi portafolio",
      projects: "Proyectos",
      olderProjects: "Proyectos anteriores",
      items: {
        aiEngineerPath: "AI Engineer Path: proyecto que muestra habilidades de IA",
        roomigos: "Roomigos: aplicación buscadora de habitaciones",
        futsalBooking: "Aplicación de reservas de fútbol sala",
        automakers: "Automakers: landing page",
        spotifyCodeGen: "Spotify Code Generator: generador de impresiones 3D STL",
        oldResume: "Aplicación de currículum antigua",
        tweetCollector: "Aplicación recolectora de tweets",
        edm: "Demo de música electrónica",
        skyResume: "Experiencia de currículum Sky",
      },
    },
    skills: {
      title: "Habilidades y herramientas",
      frontend: "Frontend",
      backend: "Backend",
      credlyBadge: "Examen de Microsoft 70-480 aprobado.",
    },
    socials: {
      title: "Mis redes sociales",
    },
    chatbot: {
      header: "Preguntá sobre mi experiencia",
      closeChat: "Cerrar chat",
      openChat: "Abrir chat sobre mi experiencia",
      copyMessage: "Copiar mensaje",
      greeting:
        "¡Hola! Preguntame sobre la experiencia, las habilidades, la educación o los proyectos de Cristhian, o descargá su currículum abajo.",
      thinking: "Pensando…",
      suggestions: {
        react: "¿Qué experiencia tiene con React?",
        projects: "¿En qué proyectos trabajó?",
        devops: "¿Cuál es su experiencia en DevOps?",
      },
      downloadResume: "Descargar currículum",
      inputPlaceholder: "Preguntá sobre mi experiencia…",
      yourQuestion: "Tu pregunta",
      sendQuestion: "Enviar pregunta",
      tryAgainIn: "Volvé a intentarlo en",
      charactersLeft: "caracteres restantes",
      rateLimitedPrefix:
        "¡Uy, son muchas preguntas! Bajá el ritmo y volvé a intentarlo en",
      errorMessage:
        "Algo salió mal al contactar el servicio de chat. Por favor, intentalo de nuevo en un momento.",
      noReplyFallback: "Perdón, no recibí una respuesta. Intentalo de nuevo.",
    },
    musicToggle: {
      ariaLabel: "Silenciar o activar música",
      tooltip: "Activá el sonido para disfrutar la experiencia completa",
    },
    visualModeToggle: {
      switchToClassic: "Cambiar a la vista clásica",
      switchToEnhanced: "Cambiar a la vista mejorada",
      fallbackNotice: "La vista mejorada se desactivó tras un error de visualización",
      tryHint: "Probá la nueva vista mejorada",
    },
    langToggle: {
      switchToSpanish: "Ver en español",
      switchToEnglish: "View in English",
    },
    loader: {
      initializing: "Iniciando…",
    },
  },
};

export default translations;
