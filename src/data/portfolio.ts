export type Project = {
  title: string
  description: string
  tech: string[]
  /** Opens when the project card is clicked (e.g. repo URL) */
  githubUrl: string
  href?: string
  status?: 'live' | 'in-progress' | 'coming-soon'
}

export type Experience = {
  role: string
  company: string
  period: string
  highlights: string[]
}

export type PortfolioData = {
  name: string
  title: string
  about: string
  githubUrl: string
  linkedinUrl: string
  email: string
  projects: Project[]
  experience: Experience[]
  skills: {
    languages: string[]
    frameworks: string[]
    tools: string[]
  }
}

export const portfolioData: PortfolioData = {
  name: 'Your Name',
  title: 'Sophomore Computer Science Student',
  about:
    'I build practical, polished software and enjoy turning ideas into products people can actually use. I am currently focused on full-stack development, clean UI, and learning by shipping.',
  githubUrl: 'https://github.com/your-username',
  linkedinUrl: 'https://www.linkedin.com/in/your-linkedin',
  email: 'you@example.com',
  projects: [
    {
      title: 'Project One',
      description: 'Brief project summary: what it does, who it helps, and your contribution.',
      tech: ['React', 'TypeScript', 'Node.js'],
      githubUrl: 'https://github.com/your-username/project-one',
      status: 'live',
    },
    {
      title: 'Project Two',
      description: 'Brief project summary: what it does, who it helps, and your contribution.',
      tech: ['Python', 'Flask', 'PostgreSQL'],
      githubUrl: 'https://github.com/your-username/project-two',
      status: 'in-progress',
    },
    {
      title: 'Project Three',
      description: 'Brief project summary: what it does, who it helps, and your contribution.',
      tech: ['Java', 'Spring Boot', 'Docker'],
      githubUrl: 'https://github.com/your-username/project-three',
      status: 'live',
    },
    {
      title: 'Project Four',
      description: 'Brief project summary: what it does, who it helps, and your contribution.',
      tech: ['Next.js', 'Tailwind CSS', 'Supabase'],
      githubUrl: 'https://github.com/your-username/project-four',
      status: 'in-progress',
    },
    {
      title: 'Project Five',
      description: 'Reserved slot for your next project.',
      tech: ['TBD'],
      githubUrl: 'https://github.com/your-username',
      status: 'coming-soon',
    },
    {
      title: 'Project Six',
      description: 'Brief project summary: what it does, who it helps, and your contribution.',
      tech: ['Rust', 'WASM'],
      githubUrl: 'https://github.com/your-username/project-six',
      status: 'in-progress',
    },
    {
      title: 'Project Seven',
      description: 'Brief project summary: what it does, who it helps, and your contribution.',
      tech: ['Go', 'gRPC', 'Kubernetes'],
      githubUrl: 'https://github.com/your-username/project-seven',
      status: 'live',
    },
  ],
  experience: [
    {
      role: 'Software Engineering Intern',
      company: 'Company One',
      period: 'Summer 2025',
      highlights: [
        'Built internal tooling that improved team workflows.',
        'Collaborated with engineers and product on feature delivery.',
      ],
    },
    {
      role: 'Software Engineering Intern',
      company: 'Company Two',
      period: 'Summer 2026',
      highlights: [
        'Implemented production features and improved code quality.',
        'Contributed tests and documentation across services.',
      ],
    },
    {
      role: 'Future Internship Slot',
      company: 'Coming Soon',
      period: 'Future',
      highlights: ['This card is ready for your next internship.'],
    },
  ],
  skills: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
    frameworks: ['React', 'Node.js', 'Express', 'Next.js'],
    tools: ['Git', 'Docker', 'Postman', 'Linux', 'Figma'],
  },
}
