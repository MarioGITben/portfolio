
export type L = { en: string; tl: string }

export type Project = {
  title: L
  blurb: L
  blurbHover: L
  tags: string[]
  images: string[]
  live?: string
}

export type SkillLine = {
  category: L
  line: L
}

export type TechLogoId =
  | 'react'
  | 'typescript'
  | 'nextdotjs'
  | 'nodedotjs'
  | 'postgresql'
  | 'docker'
  | 'tailwindcss'
  | 'linux'
  | 'vercel'
  | 'laravel'
  | 'php'
  | 'mysql'
  | 'inertia'
  | 'hostinger'
  | 'cursor'
  | 'claude'

export type TechStackItem = {
  id: TechLogoId

  years: number
}

export const site = {
  title: { en: 'Mark Benson Bellen — Portfolio', tl: 'Mark Benson Bellen — Portfolio' },
  description: { en: 'My portfolio.', tl: 'Ang portfolio ko.' },
  monogram: 'MBB',
  name: { en: 'Mark Benson Bellen', tl: 'Mark Benson Bellen' },
}

export const hero = {
  displayName: { en: 'Mark Benson Bellen', tl: 'Mark Benson Bellen' },
  roles: [
    { en: 'Full Stack/Web Developer', tl: 'Full Stack/Web Developer' },
    { en: 'Problem Solver', tl: 'Tagapaglutas ng problema' },
    { en: 'AI enthusiast', tl: 'Mahilig sa AI' },
  ] as const satisfies ReadonlyArray<L>,
  ctaHref: '#projects',
}

export const about = {
  portrait: '/images/portrait.jpg',
  bio: [
    {
      en: "I'm a Full Stack/Web Developer who's spent the last 2+ years building web applications with React and Laravel and MySQL. For frontend projects I work with Vite and React, and when a backend is involved I reach for Laravel and Inertia.js, keeping the stack tight and the workflow smooth. I'm a problem-solver first, but I care deeply about how the end result looks and feels.",
      tl: "Isa akong Full Stack/Web Developer na gumugol ng huling 2+ taon sa pagbuo ng mga web application gamit ang React at Laravel at MySQL. Para sa mga proyekto sa frontend, nakikipagtulungan ako sa Vite at React, at kapag may kasamang backend, inaabot ko ang Laravel at Inertia.js, na pinananatiling mahigpit ang stack at maayos ang daloy ng trabaho. Ako muna ang tagalutas ng problema, ngunit lubos akong nagmamalasakit sa hitsura at pakiramdam ng resulta.",
    },
    {
      en: "AI tools are part of how I work daily, not as a shortcut, but to free up space for the work that actually requires care.",
      tl: "Ang mga tool ng AI ay bahagi ng kung paano ako nagtatrabaho araw-araw, hindi bilang isang shortcut, ngunit upang magbakante ng espasyo para sa trabaho na kailangan ng pag-aalaga.",
    },
  ] satisfies L[],
  chips: [
    { en: '2+ years experience', tl: '2+ taon na karanasan' },
    { en: 'Web Developer', tl: 'Web Developer' },
    { en: 'Problem solver', tl: 'Tagalutas ng problema' },
    { en: 'AI enthusiast', tl: 'Mahilig sa AI' },
    { en: 'Open to opportunities', tl: 'Bukas sa mga pagkakataon' },
  ] satisfies L[],
}

export const projects: Project[] = [
  {
    title: { en: 'TutoyHub — Capstone Project', tl: 'TutoyHub — Capstone Project' },
    blurb: { en: 'A platform for toy collectors to browse a curated showroom, bid on rare finds, and upload 3D models for an immersive viewing experience.', tl: 'Isang platform para sa kolektor ng laruan na mag-browse sa isang na-curate na showroom, mag-bid sa mga bihirang mahanap, at mag-upload ng mga 3D na modelo para sa nakaka-engganyong karanasan sa panonood.' },
    blurbHover: {
      en: 'A platform where toy collectors can browse a curated showroom, bid on rare finds, and upload 3D models for an immersive viewing experience. That has DRBAC for users, Real-time auctions, and a community page for users to interact with each other.', tl: 'Isang platform kung saan maaaring mag-browse ang mga kolektor ng laruan sa isang na-curate na showroom, mag-bid sa mga bihirang mahanap, at mag-upload ng mga 3D na modelo para sa nakaka-engganyong karanasan sa panonood. May DRBAC para sa mga user, Real-time auctions, at isang community page para sa mga user na mag-interact sa bawat isa.'
    },
    tags: ['REACT', 'TAILWIND', 'LARAVEL', 'INERTIA.JS', 'MYSQL'],
    images: ['/images/projects/tutoyhub/landing.png','/images/projects/tutoyhub/auction.png','/images/projects/tutoyhub/storeview.png','/images/projects/tutoyhub/auctionproduct.png','/images/projects/tutoyhub/showroom.png', '/images/projects/tutoyhub/communitypage.png','/images/projects/tutoyhub/sellerapplication.png' ,'/images/projects/tutoyhub/admindashboard.png','/images/projects/tutoyhub/sellerdashboard.png','/images/projects/tutoyhub/RBAC.png','/images/projects/tutoyhub/buyerview.png'],
  },
  {
    title: { en: 'Pandapp', tl: 'Pandapp' },
    blurb: { en: 'A site to manage your school schedule, plan your daily routine, and generate quizzes automatically or by hand.', tl: 'Isang site para sa pamahalaan ng iyong school schedule, plan ng iyong daily routine, at gumawa ng quizzes automatically or by hand.' },
    blurbHover: {
      en: 'A site to manage your school schedule, plan your daily routine, and generate quizzes automatically or by hand. Everything you build stays in your quiz library, ready whenever you need it.',
      tl: 'Isang site para sa pamahalaan ng iyong school schedule, plan ng iyong daily routine, at gumawa ng quizzes automatically or by hand. Lahat ng bagay na gumawa mo ay nasa iyong quiz library, handa kapag kailangan mo ito.',
    },
    tags: ['REACT+VITE', 'TAILWIND', 'LOCAL STORAGE'],
    images: ['/images/projects/pandapp/landing.png','/images/projects/pandapp/schoolschedule.png','/images/projects/pandapp/scheduler.png', '/images/projects/pandapp/quiz.png', '/images/projects/pandapp/libray.png'],
    live: 'https://pandapp-bay.vercel.app',
  },
  {
    title: { en: 'Dolusapp', tl: 'Dolusapp' },
    blurb: { en: 'A lightweight offline-capable tool that searches for keywords across multiple files at once.', tl: 'Pipeline board na keyboard-first ang galaw.' },
    blurbHover: {
      en: 'Upload up to four files and Dolusapp scans all of them for your term, surfacing every match in one place. Works from your browser cache after the first visit so it stays available even without a connection.',
      tl: 'I-upload ang hanggang apat na file at Dolusapp scans ang lahat ng mga file para sa iyong term, nasa loob ng lahat ng matching sa isang lugar. Gumagana mula sa cache ng iyong browser pagkatapos ng unang pag-visit kaya ito ay magagamit pa rin kahit walang koneksyon.',
    },
    tags: ['REACT+VITE', 'TAILWIND', 'LOCAL STORAGE'],
    images: ['/images/projects/dolusapp/landing.png'],
    live: 'https://dolusapp.vercel.app',
  },
  {
    title: { en: 'Client Project — Cleaning Service', tl: 'Client Project — Cleaning Service' },
    blurb: { en: 'A company profile site delivered for a real cleaning services client.', tl: 'Isang site ng profile ng kumpanya na inihatid para sa isang tunay na kliyente ng mga serbisyo sa paglilinis.' },
    blurbHover: {
      en: 'Built to convert. Clean layout and focused messaging that gives potential customers everything they need to take the next step — no noise, no guesswork.',
      tl: 'Binuo para mag-convert. Malinis na layout at malinaw na pagmemensahe na nagbibigay ng lahat ng kailangan ng potensyal na customer para mag-take ng susunod na hakbang — walang ingay, walang pag-asa.',
    },
    tags: ['REACT+VITE', 'TAILWIND'],
    images: ['/images/projects/tmscleaning/landing.png','/images/projects/tmscleaning/about.png','/images/projects/tmscleaning/services.png','/images/projects/tmscleaning/pricing.png','/images/projects/tmscleaning/process.png','/images/projects/tmscleaning/gallery.png','/images/projects/tmscleaning/contact.png'],
  
  },
  
]

export const skills = {
  terminalWindowTitle: { en: '~ /bellen — zsh', tl: '~ /bellen — zsh' },
  prompt: '> skills --list',
  groups: [
    {
      category: { en: 'Frontend', tl: 'Frontend' },
      line: { en: 'JavaScript, TypeScript, React+Vite, Tailwind, Shadcn/UI', tl: 'JavaScript, TypeScript, React+Vite, Tailwind, Shadcn/UI' },
    },
    {
      category: { en: 'Backend', tl: 'Backend' },
      line: { en: 'PHP,LARAVEL, MYSQL', tl: 'LARAVEL, MYSQL' },
    },
    {
      category: { en: 'AI', tl: 'AI' },
      line: {
        en: 'AI-assisted workflows, Prompt Engineering',
        tl: 'AI-assisted na workflow, Prompt Engineering',
      },
    },
    {
      category: { en: 'AI stack', tl: 'AI stack' },
      line: {
        en: 'GEMINI, CLAUDE, CURSOR',
        tl: 'GEMINI, CLAUDE, CURSOR',
      },
    },
    {
      category: { en: 'Text-editor', tl: 'Text-editor' },
      line: {
        en: 'CURSOR/VSCODE',
        tl: 'CURSOR/VSCODE',
      },
    },
  ] satisfies SkillLine[],
  stack: [
    { id: 'react', years: 2 },
    { id: 'typescript', years: 2 },
    { id: 'laravel', years: 1 },
    { id: 'php', years: 1 },
    { id: 'mysql', years: 2 },
    { id: 'tailwindcss', years: 2 },
    { id: 'vercel', years: 2 },
    { id: 'cursor', years: 1 },
    { id: 'claude', years: 1 },
  ] satisfies TechStackItem[],
}

export type Award = {
  title: L
  issuer: L
  period: L
  detail?: L
  image?: string
  url?: string
}

export const awards: Award[] = [
  {
    title: { en: 'Web design champion', tl: 'Web design champion' },
    issuer: { en: 'National college of science and technology', tl: 'National college of science and technology' },
    period: { en: '2024', tl: '2025' },
    detail: {
      en: 'Won the Web design competition 2024.',
      tl: 'Nabigo ang Web design competition 2024.',
    },
    image: '/images/award-certificate/webdesignaward.jpg',
  },
  {
    title: { en: 'IoT certificate', tl: 'IoT certificate' },
    issuer: { en: 'National college of science and technology', tl: 'National college of science and technology' },
    period: { en: '2023', tl: '2023' },
    detail: {
      en: 'Completed the IoT course 2023.',
      tl: 'Nakumpleted ang IoT course 2023.',
    },
    image: '/images/award-certificate/iotcertificate.jpg',
  },
]

export const contact = {
  ambient: {
    en: "let's build something.",
    tl: 'magtayo tayo ng bagay.',
  },
  intro: {
    en: "I'm open to freelance work, collaborations, and conversations about building thoughtful software.",
    tl: 'Bukas ako sa freelance, kolaborasyon, at usapin tungkol sa maingat na software.',
  },
  email: 'markbensonbellen0@gmail.com',
  phone: '+63 943 5666 686',
  social: {
    facebook: 'https://www.facebook.com/mariooo.23',
    linkedin: 'https://www.linkedin.com/in/mark-benson-bellen-9020b82b5/',
    discord: 'https://discord.gg/okay_lang_ako',
  },
}

export const footer = {
  tagline: { en: 'Built with passion.', tl: 'Binuo nang may pagnanasa.' },
}

export type SimpleResumeExperience = {
  company: L
  role: L
  period: L
  bullets: L[]
}

export type SimpleResumeEducationLevel = 'tertiary' | 'secondary' | 'primary'

export type SimpleResumeEducation = {
  level: SimpleResumeEducationLevel
  school: L
  period: L
  location: L
}

export const simpleResume = {
  headline: { en: 'Mark Benson Bellen', tl: 'Mark Benson Bellen' },
  tagline: { en: 'Full Stack/Web Developer', tl: 'Full Stack/Web Developer' },
  location: { en: 'Philippines · Remote-friendly', tl: 'Pilipinas · Bukas sa remote' },
  summary: {
    en: "Full Stack/Web Developer with 2+ years of hands-on experience building and delivering modern web applications using React, Laravel and MySQL. Passionate about creating intuitive user experiences and implementing strong security measures. I actively use AI tools (Cursor, Claude, Gemini) across the full development process including system design, coding, and optimization to build better systems faster without compromising quality.",
    tl: 'Full Stack/Web Developer na may 2+ taon sa pagbuo ng web application gamit ang React at Laravel at MySQL. Nagustuhan ko ang pagbuo ng intuitive user experiences at pag-implement ng mabilis na security measures. Ginagamit ko ang mga AI tools (Cursor, Claude, Gemini) sa buong proseso ng pagbuo kasama ang system design, coding, at optimization para magbuo ng mas mabilis na sistema nang hindi kami nag-aabante sa kalidad.',
  },
  experiences: [
    {
      company: { en: 'Freelance & independent projects', tl: 'Freelance at mga independent na proyekto' },
      role: { en: 'Full Stack/Web Developer', tl: 'Full Stack/Web Developer' },
      period: { en: '2023 — Present', tl: '2023 — Kasalukuyan' },
      bullets: [
        {
          en: 'Developed TutoyHub, a comprehensive Laravel + Inertia.js + MySQL web platform featuring live showroom, auction system, seller and admin dashboards, and secure role-based access control.',
          tl: 'Binuo ang TutoyHub — isang Laravel, Inertia.js, at MySQL na web application na may showroom, auction, seller/admin dashboard, at role-based access.',
        },
        {
          en: 'Built PandaApp — a full-featured school productivity app with offline support, schedule management, and quiz library, deployed for real users',
          tl: 'Binuo ang PandaApp — isang full-featured na school productivity app na may offline support, schedule management, at quiz library, nilabas para sa mga tunay na user.',
        },
        {
          en: 'Built Dolusapp — a multi-file keyword search tool with offline support, deployed for real users',
          tl: 'Binuo ang Dolusapp — isang multi-file keyword search tool na may offline support, nilabas para sa mga tunay na user.',
        },
        {
          en: 'Designed and delivered a responsive website for a cleaning services company using React, Vite, and Tailwind CSS, emphasizing clear service displays, pricing transparency, and optimized customer inquiry processes.',
          tl: 'Binuo ang responsive website para sa kumpanya ng cleaning service gamit ang React, Vite, at Tailwind CSS — malinaw na pagpapakita ng serbisyo, transparent na presyo, at optimized na flow ng customer inquiry.',
        },
      ],
    },
  ] satisfies SimpleResumeExperience[],
  education: [
    {
      level: 'tertiary',
      school: {
        en: 'B.S. Information Technology — National College of Science and Technology',
        tl: 'B.S. Information Technology — National College of Science and Technology',
      },
      period: { en: '2023 — 2027 (expected)', tl: '2023 — 2027 (inaasahan)' },
      location: { en: 'Dasmariñas, Cavite, Philippines', tl: 'Dasmariñas, Cavite, Pilipinas' },
    },
    {
      level: 'secondary',
      school: {
        en: 'Senior High School — STEM strand — Southern Philippines Institute of Science and Technology',
        tl: 'Senior High School — STEM — Southern Philippines Institute of Science and Technology',
      },
      period: { en: '2021 — 2023', tl: '2021 — 2023' },
      location: { en: 'Imus, Cavite, Philippines', tl: 'Imus, Cavite, Pilipinas' },
    },
    {
      level: 'primary',
      school: {
        en: 'Elementary — God The Almighty Academy INC.',
        tl: 'Elementarya — God The Almighty Academy INC.',
      },
      period: { en: '2015 — 2021', tl: '2015 — 2021' },
      location: { en: 'Dasmariñas, Cavite, Philippines', tl: 'Dasmariñas, Cavite, Pilipinas' },
    },
  ] satisfies SimpleResumeEducation[],
  softSkills: {
    en: [
      'Team-oriented',
      'Communication',
      'Independent problem solver',
      'Fast learner',
      'Adaptable',
      'Detail-oriented',
      'Time-management',
    ],
    tl: [
      'Team-oriented',
      'Mabilis na komunikasyon',
      'Tagalutas ng problema independiyenteng',
      'Mabilis na tagapakinig',
      'Mag-adapt sa bagay',
      'Detail-oriented',
      'Mag-manage ng oras',
    ],
  },
  techSkills: {
    en: [
      'Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui.',
      'Backend: Laravel, PHP, MySQL, Inertia.js.',
      'Version control: Github, Git.',
      'AI development: Cursor, Claude, Gemini (used for architecture, coding, and optimization)',
    ],
    tl: [
      'Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui.',
      'Backend: Laravel, PHP, MySQL, Inertia.js.',
      'Version control: Github, Git.',
      'AI development: Cursor, Claude, Gemini (used for architecture, coding, and optimization)',
    ],
  },
}
