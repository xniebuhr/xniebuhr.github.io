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
  taglines: string[]
  about: string
  aboutExtra: string
  githubUrl: string
  linkedinUrl: string
  handshakeUrl: string
  email: string
  phone: string
  projects: Project[]
  experience: Experience[]
  skills: {
    languagesAndDev: string[]
    cloudAndInfra: string[]
    security: string[]
    networking: string[]
  }
}

export const portfolioData: PortfolioData = {
  name: 'Xander Niebuhr',
  title: 'Junior Computer Science Student',
  taglines: [
    'Junior Computer Science Student',
    'Security-Focused Developer',
    'Automation Enthusiast',
    'Cloud Infrastructure Builder',
  ],
  about:
    `I'm a Junior studying Computer Science with a minor in Cybersecurity at UNO. I love breaking down complex problems, whether that means securing a network, building backend software, or leading a team.`,
  aboutExtra:
    `Long before I started writing code, I spent nearly five years in fast-paced customer service, played as a senior soloist in a symphony, and spent time volunteering in my community. Those experiences taught me how to communicate effectively, adapt on the fly, and tackle problems as part of a team. I bring that same collaborative mindset to my tech career, where I've gained hands-on experience spanning security operations, backend software development, and enterprise IT and platform infrastructure. I enjoy bridging the gap between development and operations, focusing not just on building applications but on automating workflows, securing pipelines, and setting up resilient infrastructure. Outside of work and classes, you can usually find me playing with the UNO Esports team, learning and collaborating with Nullify, or building and experimenting with a new technology on a project.`,
  githubUrl: 'https://github.com/xniebuhr',
  linkedinUrl: 'https://www.linkedin.com/in/xander-niebuhr-472a7b328/',
  handshakeUrl: 'https://uno.joinhandshake.com/profiles/g4atgb',
  email: 'xniebuhr@gmail.com',
  phone: '(531)-777-4508',
  projects: [
    {
      title: 'Finance Tracker',
      description: 'A full-stack personal finance tracker built with Angular and ASP.NET Core, providing a secure, user-friendly platform for managing transactions, visualizing financial data, and exploring budgeting trends.',
      tech: ['C#', 'Angular', 'Azure & Terraform', 'Docker', 'CodeQL', 'GitHub actions', 'OWASP ZAP', 'Trufflehog', 'Trivy'],
      githubUrl: 'https://github.com/xniebuhr/FinanceTracker',
      status: 'in-progress',
    },
    {
      title: 'Node Sentry',
        description: 'A lightweight, terminal-based REPL (Read-Eval-Print Loop) application designed to monitor the health, availability, and performance of web services in real-time.',
        tech: ['Java', 'Maven', 'JUnit 5', 'Mockito'],
      githubUrl: 'https://github.com/xniebuhr/NodeSentry',
      status: 'live',
    },
    {
      title: 'VPN & Firewall',
      description: 'A custom, fully routed VPN architecture designed to bypass Deep Packet Inspection and restrictive firewalls through traffic encapsulation and managed routing, featuring its own custom firewall rules, hosted on an EC2 instacne',
      tech: ['Wireguard', 'Xray-Core', 'Ansible', 'AWS', 'UFW', 'Python', 'Powershell', 'Windows Task Scheduler'],
      githubUrl: 'https://github.com/xniebuhr/VPN-Firewall-Config',
      status: 'live',
    },
    {
      title: 'Snake',
      description: 'An arcade-style rework of the classic Snake game with a custom level engine.',
      tech: ['C++', 'SFML', 'Object-Oriented Programming'],
      githubUrl: 'https://github.com/xniebuhr/Snake',
      status: 'live',
    },
    {
      title: 'Inergen',
      description: 'An automated threat-response tool designed to eliminate data breach risks by instantly identifying and revoking compromised cloud access.',
      tech: ['Go', 'Bubble Tea', 'Azure', 'AWS', 'Event-Driven Webhooks'],
      githubUrl: 'https://github.com/xniebuhr/Inergen',
      status: 'coming-soon',
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
      role: 'Software Engineering Intern',
      company: 'Company Three',
      period: 'Summer 2027',
      highlights: [
        'Add the real highlights for this role whenever you are ready.',
        'This card was added so the stack now shows four roles.',
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
    languagesAndDev: ['C# / .NET', 'Python', 'Java', 'Go', 'C++', 'SQL', 'Angular', 'Git'],
    cloudAndInfra: ['Azure','AWS', 'Terraform', 'Docker', 'Ansible', 'Renovate', 'GitHub Actions', 'PowerShell', 'Bash'],
    security: ['CodeQL', 'Trivy', 'OWASP ZAP', 'TruffleHog', 'Burp Suite', 'Ghidra', 'Splunk', 'Wazuh'],
    networking: ['Wireguard', 'Xray-Core', 'UFW', 'Wireshark'],
  },
}
