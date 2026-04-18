/**
 * Localized copy: edit `tl` for Tagalog. UI strings also live in `src/locale/messages.ts`.
 */
export type L = { en: string; tl: string }

export type Project = {
  title: L
  blurb: L
  /** Longer line shown on card hover */
  blurbHover: L
  tags: string[]
  /** Card uses images[0]; gallery modal lists all */
  images: string[]
  /** Public URL; omit or leave empty to hide the Live action on the card */
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
  | 'mysql'
  | 'inertia'
  | 'hostinger'
  | 'cursor'
  | 'claude'

/** Stack card in Skills: logo + years revealed on hover */
export type TechStackItem = {
  id: TechLogoId
  /** Whole years shown as “n+” on the card */
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
    { en: 'Full Stack Developer', tl: 'Full Stack Developer' },
    { en: 'Problem Solver', tl: 'Tagapaglutas ng problema' },
    { en: 'AI enthusiast', tl: 'Mahilig sa AI' },
  ] as const satisfies ReadonlyArray<L>,
  ctaHref: '#projects',
}

export const about = {
  portrait: '/images/portrait.jpg',
  bio: [
    {
      en: "I'm a Full Stack Developer who's spent the last 2+ years building web applications with React and Laravel. For frontend projects I work with Vite and React, and when a backend is involved I reach for Laravel and Inertia.js, keeping the stack tight and the workflow smooth. I'm a problem-solver first, but I care deeply about how the end result looks and feels. AI tools are part of how I work daily, not as a shortcut, but to free up space for the work that actually requires care.",
      tl: "Isa akong Full Stack Developer na gumugol ng huling 2+ taon sa pagbuo ng mga web application gamit ang React at Laravel. Para sa mga proyekto sa frontend, nakikipagtulungan ako sa Vite at React, at kapag may kasamang backend, inaabot ko ang Laravel at Inertia.js, na pinananatiling mahigpit ang stack at maayos ang daloy ng trabaho. Ako muna ang tagalutas ng problema, ngunit lubos akong nagmamalasakit sa hitsura at pakiramdam ng resulta. Ang mga tool ng AI ay bahagi ng kung paano ako nagtatrabaho araw-araw, hindi bilang isang shortcut, ngunit upang magbakante ng espasyo para sa trabaho na talagang nangangailangan ng pangangalaga.",
    },
    {
      en: "I build late, think in components, and care about the details most people scroll past. If something looks off by two pixels, I'll notice, and I probably won't leave it alone until it's fixed.",
      tl: "Gumagawa ako ng huli, nag-iisip sa mga komponente, at nagmamalasakit sa mga detalye na mas madalas na binabago ng mga tao. Kung ang isang bagay ay mabaway sa dalawa na pixel, mag-iingatan ako, at marahil ay hindi ako magtatagpo hanggang hindi na ito nangyayare.",
    },
  ] satisfies L[],
  chips: [
    { en: '2+ years experience', tl: '5+ taon na karanasan' },
    { en: 'Late night coder', tl: 'Open source contributor' },
    { en: 'Problem solver', tl: 'Tagalutas ng problema' },
    { en: 'AI enthusiast', tl: 'Mahilig sa AI' },
    { en: 'Open to opportunities', tl: 'Bukas sa mga pagkakataon' },
  ] satisfies L[],
}

/** Shown in the Projects section (responsive grid); add or remove entries as needed. */
export const projects: Project[] = [
  {
    title: { en: 'TutoyHub', tl: 'TutoyHub' },
    blurb: { en: 'One platform for toys. Auction & showroom.', tl: 'Isang platform para sa pag-aaral at pagtuturo ng mga konsepto sa programming.' },
    blurbHover: {
      en: 'A platform where toy collectors can browse a curated showroom, bid on rare finds, and upload 3D models for an immersive viewing experience. One platform, two experiences, zero compromise.', tl: 'Isang platform kung saan maaaring mag-browse ang mga kolektor ng laruan sa isang na-curate na showroom, mag-bid sa mga bihirang mahanap, at mag-upload ng mga 3D na modelo para sa nakaka-engganyong karanasan sa panonood. Isang platform, dalawang karanasan, walang kompromiso.'
    },
    tags: ['REACT', 'TAILWIND', 'LARAVEL', 'INERTIA.JS', 'HOSTINGER', 'MYSQL'],
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
      en: 'The goal was simple — give their business a professional online presence that builds trust and turns visitors into inquiries. Clean layout, clear messaging, and everything a potential customer needs without the noise.',
      tl: 'Simple lang ang layunin — bigyan ang kanilang negosyo ng propesyonal na presensya sa online na bumubuo ng tiwala at ginagawang mga katanungan ang mga bisita. Malinis na layout, malinaw na pagmemensahe, at lahat ng kailangan ng potensyal na customer nang walang ingay.',
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
      line: { en: 'React, Vite, TypeScript, Tailwind CSS, shadcn/ui', tl: 'React, Vite, TypeScript, Tailwind CSS, shadcn/ui' },
    },
    {
      category: { en: 'Backend', tl: 'Backend' },
      line: { en: 'Laravel, MySQL, Inertia.js', tl: 'Laravel, MySQL, Inertia.js' },
    },
    {
      category: { en: 'AI', tl: 'AI' },
      line: {
        en: 'AI-assisted workflows, prompt engineering',
        tl: 'AI-assisted na workflow, prompt engineering',
      },
    },
    {
      category: { en: 'AI stack', tl: 'AI stack' },
      line: {
        en: 'Gemini, Claude, Cursor',
        tl: 'Gemini, Claude, Cursor',
      },
    },
    {
      category: { en: 'Text-editor', tl: 'Text-editor' },
      line: {
        en: 'Cursor/VSCode',
        tl: 'Cursor/VSCode',
      },
    },
  ] satisfies SkillLine[],
  stack: [
    { id: 'react', years: 2 },
    { id: 'typescript', years: 2 },
    { id: 'laravel', years: 1 },
    { id: 'mysql', years: 2 },
    { id: 'inertia', years: 1 },
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
  /** Credential image under `public/` (e.g. `/images/awards/aws.png`). Used as card background; “View credential” opens this in a new tab when set. */
  image?: string
  /** External verification page when no `image`, or in addition to it */
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
  /** Spacing ok; used for display and `tel:` (spaces stripped). Set your real number. */
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

/** Résumé education band — drives the localized section label in the simple résumé. */
export type SimpleResumeEducationLevel = 'tertiary' | 'secondary' | 'primary'

export type SimpleResumeEducation = {
  level: SimpleResumeEducationLevel
  school: L
  /** Year or range shown on the résumé (mock until you replace). */
  period: L
  /** City / region only (no coursework copy). */
  location: L
}

/** Plain one-column résumé content (simple layout view). */
export const simpleResume = {
  headline: { en: 'Mark Benson Bellen', tl: 'Mark Benson Bellen' },
  tagline: { en: 'Full Stack Developer', tl: 'Full Stack Developer' },
  location: { en: 'Philippines · Remote-friendly', tl: 'Pilipinas · Bukas sa remote' },
  summary: {
    en: "Full Stack Developer with 2+ years shipping web apps in React and Laravel. Comfortable with Vite and React on the frontend and Laravel with Inertia.js when a backend is in play. I sweat the small UX details and use AI tools (Cursor, Claude, Gemini) to move faster on the repetitive parts so I can focus on what actually needs a human eye.",
    tl: 'Full Stack Developer na may 2+ taon sa pagbuo ng web app gamit ang React at Laravel. Sanay sa Vite at React sa frontend at Laravel kasama ang Inertia.js kapag may backend. Pinapahalagahan ko ang maliliit na detalye ng UX at ginagamit ang AI (Cursor, Claude, Gemini) para mapabilis ang paulit-ulit na gawain at mailaan ang oras sa bagay na kailangan ng tao.',
  },
  experiences: [
    {
      company: { en: 'Freelance & independent projects', tl: 'Freelance at mga independent na proyekto' },
      role: { en: 'Full Stack Developer', tl: 'Full Stack Developer' },
      period: { en: '2023 — Present', tl: '2023 — Kasalukuyan' },
      bullets: [
        {
          en: 'Built TutoyHub — a Laravel, Inertia.js, and MySQL platform with showroom, auctions, seller/admin dashboards, and role-based access.',
          tl: 'Binuo ang TutoyHub — isang Laravel, Inertia.js, at MySQL na platform na may showroom, auction, seller/admin dashboard, at role-based access.',
        },
        {
          en: 'Shipped Pandapp (React, Vite, Tailwind) for school schedules, routines, and a quiz library; deployed Dolusapp for multi-file keyword search with offline-friendly browser caching.',
          tl: 'Inilabas ang Pandapp (React, Vite, Tailwind) para sa school schedule, routine, at quiz library; inilabas ang Dolusapp para sa keyword search sa maraming file na offline-friendly sa browser cache.',
        },
        {
          en: 'Delivered a production company site for a cleaning-services client with React, Vite, and Tailwind — clear services, pricing, and contact flows.',
          tl: 'Naghatid ng production na company site para sa kliyenteng cleaning service gamit ang React, Vite, at Tailwind — malinaw na serbisyo, presyo, at contact.',
        },
      ],
    },
  ] satisfies SimpleResumeExperience[],
  /** Mock rows for layout; replace with real programs and years when ready. */
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
  skills: {
    en: [
      'Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui.',
      'Backend: Laravel, MySQL, Inertia.js.',
      'AI-assisted workflows with Gemini, Claude, and Cursor.',
    ],
    tl: [
      'Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui.',
      'Backend: Laravel, MySQL, Inertia.js.',
      'AI-assisted na workflow gamit ang Gemini, Claude, at Cursor.',
    ],
  },
}
