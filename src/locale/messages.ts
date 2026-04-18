/**
 * UI copy per locale. Replace `tl` strings with your Tagalog content.
 * Structure mirrors `en` — keep keys in sync when adding fields.
 */
export type Locale = 'en' | 'tl'

export const messages: Record<
  Locale,
  {
    nav: {
      about: string
      projects: string
      skills: string
      awards: string
      contact: string
      /** Switch to light résumé view */
      lightMode: string
      /** Switch to dark portfolio view */
      darkMode: string
      langEn: string
      langTl: string
    }
    resume: { downloadPdf: string; sectionSummary: string; sectionExperience: string; sectionEducation: string; sectionSkills: string }
    hero: { cta: string }
    about: { eyebrow: string; title: string }
    projects: {
      eyebrow: string
      title: string
      galleryGoPrev: string
      galleryGoNext: string
      /** Use `{n}` and `{total}` placeholders */
      galleryPick: string
    }
    skills: { eyebrow: string; title: string; stackLabel: string; experienceUnit: string }
    awards: { eyebrow: string; title: string; credentialLink: string; closeModal: string }
    contact: {
      eyebrow: string
      title: string
      name: string
      email: string
      message: string
      phName: string
      phEmail: string
      phMessage: string
      send: string
      sending: string
      toastSuccess: string
      toastError: string
      toastValidation: string
      toastNotConfigured: string
    }
    footer: { tagline: string }
    links: { view: string; live: string }
  }
> = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      awards: 'Awards',
      contact: 'Contact',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      langEn: 'EN',
      langTl: 'TL',
    },
    resume: {
      downloadPdf: 'Download PDF',
      sectionSummary: 'Summary',
      sectionExperience: 'Experience',
      sectionEducation: 'Education',
      sectionSkills: 'Skills',
    },
    hero: { cta: 'View My Work' },
    about: { eyebrow: 'ABOUT', title: 'Craft, clarity, calm systems.' },
    projects: {
      eyebrow: 'SELECTED WORK',
      title: 'Projects worth talking about.',
      galleryGoPrev: 'Previous screenshot',
      galleryGoNext: 'Next screenshot',
      galleryPick: 'Screenshot {n} of {total}',
    },
    skills: {
      eyebrow: 'STACK',
      title: 'Tools of the trade.',
      stackLabel: 'Stack',
      experienceUnit: 'yrs',
    },
    awards: {
      eyebrow: 'RECOGNITION',
      title: 'Awards and certificates.',
      credentialLink: 'View credential',
      closeModal: 'Close',
    },
    contact: {
      eyebrow: 'CONTACT',
      title: 'Have a project in mind?',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      phName: 'Your name',
      phEmail: 'you@example.com',
      phMessage: 'Tell me about your project...',
      send: 'Send message',
      sending: 'Sending…',
      toastSuccess: 'Thanks — your message was sent.',
      toastError: 'Something went wrong. Try again or email directly.',
      toastValidation: 'Please fill in all fields with a valid email.',
      toastNotConfigured:
        'Form is not configured. Set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID, then rebuild.',
    },
    footer: { tagline: 'Built with care.' },
    links: { view: 'View', live: 'Live' },
  },
  tl: {
    nav: {
      about: 'Tungkol',
      projects: 'Mga Proyekto',
      skills: 'Kakayahan',
      awards: 'Parangal',
      contact: 'Kontak',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      langEn: 'EN',
      langTl: 'TL',
    },
    resume: {
      downloadPdf: 'I-download ang PDF',
      sectionSummary: 'Buod',
      sectionExperience: 'Karanasan',
      sectionEducation: 'Edukasyon',
      sectionSkills: 'Mga kasanayan',
    },
    hero: { cta: 'Tingnan ang mga proyekto' },
    about: {
      eyebrow: 'TUNGKOL',
      title: 'Linaw, kaayusan, matatag na sistema.',
    },
    projects: {
      eyebrow: 'PINILING GAWA',
      title: 'Mga proyektong pinag-uusapan.',
      galleryGoPrev: 'Nakaraang screenshot',
      galleryGoNext: 'Susunod na screenshot',
      galleryPick: 'Screenshot {n} ng {total}',
    },
    skills: {
      eyebrow: 'STACK',
      title: 'Mga kasangkapan sa propesyon.',
      stackLabel: 'Stack',
      experienceUnit: 'taon',
    },
    awards: {
      eyebrow: 'PARANGAL',
      title: 'Mga parangal at sertipiko.',
      credentialLink: 'Tingnan ang sertipiko',
      closeModal: 'Isara',
    },
    contact: {
      eyebrow: 'KONTAK',
      title: 'May proyekto ka ba?',
      name: 'Pangalan',
      email: 'Email',
      message: 'Mensahe',
      phName: 'Iyong pangalan',
      phEmail: 'ikaw@halimbawa.com',
      phMessage: 'Sabihin ang tungkol sa proyekto mo...',
      send: 'Ipadala ang mensahe',
      sending: 'Ipinapadala…',
      toastSuccess: 'Salamat — naipadala ang mensahe mo.',
      toastError: 'May problema. Subukan ulit o mag-email nang diretso.',
      toastValidation: 'Punan ang lahat ng field at gumamit ng wastong email.',
      toastNotConfigured:
        'Hindi pa naka-set ang form. Ilagay ang VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, at VITE_EMAILJS_TEMPLATE_ID, tapos i-rebuild.',
    },
    footer: { tagline: 'Itinayo nang may pag-aalaga.' },
    links: { view: 'Tingnan', live: 'Live' },
  },
}
