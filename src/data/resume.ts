// Source of truth for all portfolio content. Pulled from Vusi's resume —
// do not add experience, projects, or skills that aren't listed here.

export const profile = {
  name: 'Vusi Kunene Matlou',
  title: 'Computer Science Graduate — IT Operations, Cybersecurity & Software QA',
  summary:
    'Computer Science graduate with enterprise experience in IT Operations, Cybersecurity, DevSecOps, Software Development, Software QA, and Identity Access Management (IAM), gained through internships at BMW Group South Africa and TMS Dynamics. Skilled in Python and Java development, automation, Behaviour Driven Development testing, API integrations, enterprise application support, incident management, and Agile delivery within global enterprise environments.',
  location: 'South Africa',
  phone: '068-596-6897',
  email: 'matlouvusikunene544@gmail.com',
  github: 'https://github.com/vusi-kunene-matlou',
  linkedin: 'https://linkedin.com/in/vusi-matlou',
  domain: 'vusikunenematlou.co.za',
  resumeUrl:
    'https://drive.google.com/file/d/1d487F9MMl2qRyIiZ9Aaw7NkFXFtkft5U/view?usp=sharing',
} as const

export type ExperienceEntry = {
  id: string
  role: string
  org: string
  location: string
  period: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'bmw',
    role: 'IT Operations Intern',
    org: 'BMW Group South Africa',
    location: 'Midrand (Hybrid)',
    period: 'Apr 2026 – Present',
    bullets: [
      'Support enterprise IT Operations across cybersecurity, DevSecOps, and operational support.',
      'Manage identity and access requests across international BMW markets, ensuring compliance with global access governance policies.',
      'Develop Python and Java automation scripts to improve operational efficiency.',
      'Collaborate with global IT teams to troubleshoot enterprise system issues.',
      'Design, execute, and maintain functional test cases using Jira, Xray, Cucumber, and Gherkin within the Agile Working Model.',
    ],
  },
  {
    id: 'tms-dynamics',
    role: 'Support Specialist & Junior Software Developer',
    org: 'TMS Dynamics',
    location: 'Johannesburg',
    period: 'Jan – Mar 2026',
    bullets: [
      'Delivered first/second-line technical support for enterprise transport management software.',
      'Investigated software defects through log analysis, data validation, and root cause analysis.',
      'Collaborated with developers, QA engineers, and business analysts on product improvements.',
      'Developed automation solutions and contributed to API integration projects using Python.',
    ],
  },
  {
    id: 'robinson-liquors',
    role: 'IT Intern',
    org: 'Robinson Liquors',
    location: 'Parkview, Randburg',
    period: 'Mar – Jun 2023',
    bullets: [
      'Delivered hardware maintenance and technical support across printers, laptops, and office equipment, minimizing operational downtime.',
    ],
  },
]

export type ProjectEntry = {
  id: string
  name: string
  tagline: string
  period: string
  stack: string[]
  bullets: string[]
  links: { label: string; href: string }[]
}

export const projects: ProjectEntry[] = [
  {
    id: 'dermaglare',
    name: 'Dermaglare',
    tagline: 'Dermatology Ecosystem — Final Year Project',
    period: '2025',
    stack: [
      'Flutter',
      'Firebase',
      'React.js',
      'Next.js',
      'Node.js',
      'Firestore',
      'Cloud Functions',
    ],
    bullets: [
      'Architected an end-to-end healthcare ecosystem: patient mobile app (virtual assessments, chatbot), marketing site, patient web portal, and admin monitoring dashboard.',
      'Engineered secure authentication and POPIA-compliant data handling.',
    ],
    links: [{ label: 'dermaglare.co.za', href: 'https://dermaglare.co.za' }],
  },
  {
    id: 'api-security-scanner',
    name: 'API Security Scanner Tool',
    tagline: 'Automated vulnerability scanner for professional security audits',
    period: '2025',
    stack: ['Python', 'Security Testing', 'RESTful APIs'],
    bullets: [
      'Built an automated vulnerability scanner covering SQL Injection, XSS, CSRF, directory traversal, and authentication bypass.',
      'Implemented structured logging/reporting to turn raw scan output into audit-ready insights.',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Vusi-Kunene-Matlou/API-SECURITY-SCANNER',
      },
    ],
  },
  {
    id: 'ubuntu-verse',
    name: 'UBUNTU Verse',
    tagline: 'G20 Virtual Reality Tourism Platform',
    period: '2025',
    stack: ['Unity/Unreal', 'WebXR', 'Node.js', 'Firebase'],
    bullets: [
      "Developed an immersive VR platform showcasing South Africa's rural tourism destinations.",
      'Designed a content-monetization model empowering local youth in the digital economy.',
    ],
    links: [],
  },
]

export type SkillGroup = {
  id: string
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'C#', 'C++', 'Dart', 'SQL'],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['MySQL', 'Firebase', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: 'libraries',
    label: 'Libraries',
    items: ['NumPy', 'OpenCV'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    items: ['Flask', 'Node.js', 'TensorFlow', 'Flutter'],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      'Git',
      'GitHub',
      'Hugging Face Hub',
      'AWS',
      'Cisco Packet Tracer',
      'Jira',
      'Xray',
      'Cucumber',
      'Gherkin',
      'Agile (Scrum)',
      'Test Case Design',
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    items: ['IAM', 'API Security', 'OWASP Principles', 'Security Testing', 'DevSecOps'],
  },
]

export type VolunteerEntry = {
  id: string
  role: string
  org: string
  period: string
  description: string
}

export const volunteer: VolunteerEntry[] = [
  {
    id: 'eduvos-coding-club',
    role: 'President',
    org: 'Eduvos Coding Club',
    period: 'Feb – Nov 2025',
    description:
      'Led Web Dev, Cybersecurity, and Blockchain hackathons; taught AI/robotics/coding fundamentals at schools.',
  },
  {
    id: 'g20-tourism-hackathon',
    role: 'Technical Lead Member',
    org: 'G20 Tourism Hackathon',
    period: 'Jul – Sep 2025',
    description:
      'Supported finalist teams and contributed to AI-driven tourism solutions.',
  },
  {
    id: 'geekulcha-midrand',
    role: 'Vice President',
    org: 'Geekulcha Midrand',
    period: 'May – Nov 2025',
    description: 'Led coding workshops and competitions.',
  },
  {
    id: 'cyberm8',
    role: 'Delegate',
    org: 'CyberM8 Initiative',
    period: 'Oct 2025 – Present',
    description: 'National cybersecurity awareness campaigns.',
  },
  {
    id: 'geekulcha-mentor',
    role: 'Hackathon Mentor',
    org: 'Geekulcha',
    period: 'Apr 2024 – Present',
    description: 'AI, cybersecurity, and web dev mentoring.',
  },
  {
    id: 'engage-and-empower',
    role: 'Mentor',
    org: 'Engage and Empower NPC',
    period: 'Jun 2025 – Present',
    description: 'Digital literacy and robotics workshops.',
  },
]

export const education = {
  institution: 'Eduvos University, South Africa',
  degree: 'BSc Computer Science, GPA 84',
  period: 'Jan 2022 – Dec 2025',
}

export const certifications = ['Golden Key Honour Society', 'FNB APP Academy']

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'volunteer', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
] as const
