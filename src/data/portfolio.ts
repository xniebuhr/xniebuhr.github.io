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
      description: 'A custom, fully routed VPN architecture designed to bypass Deep Packet Inspection and restrictive firewalls through traffic encapsulation and managed routing, featuring its own custom firewall rules, hosted on an EC2 instance',
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
      role: 'IT Application Support & Development Intern',
      company: 'Union Pacific Railroad',
      period: 'August 2026 - Present',
      highlights: [
        'Manage high-volume IT ticketing queues, routing eligible requests through automated deployment pipelines',
        'Perform remote software installations and troubleshooting via remote desktop tools for complex manual dependencies',
        'Image and provision corporate hardware via USB deployment to ensure compliance with enterprise security standards',
        'Resolve end-user application access issues while strictly adhering to technical documentation and procedures'
      ],
    },
    {
      role: 'Intern Team Lead',
      company: 'NebraskaCYBER MATRIX Lab',
      period: 'September 2025 - Present',
      highlights: [
        'Directed the development of SOC standard operating procedures and incident response workflows, formalizing documentation for tool evaluation and student learning modules',
        'Onboarded and mentored 6 incoming interns, structuring daily workloads and driving team collaboration',
        'Lead the design and implementation of a custom EDR/AV pipeline using ClamAV and Splunk, maintaining scripts to automate log collection and signature updates',
        'Serving as the primary technical point of contact for security tool support, ensuring infrastructure stability and data integrity across the SOC pipeline'
      ],
    },
    {
      role: 'Software Development Intern',
      company: 'Election Systems & Software',
      period: 'Summer 2026',
      highlights: [
        'Developed full-stack features for a unified product platform, building robust backend APIs and databases using C# and .NET',
        'Built and integrated user-facing frontend components with Angular to communicate seamlessly with backend services',
        'Collaborated across business units, embedded engineering, and development teams to gather requirements for a dedicated product module',
        'Engineered a core product section from initial concept through integration into the company\'s broader software ecosystem'
      ],
    },
    {
      role: 'Crew Member',
      company: 'Panera Bread',
      period: 'September 2022 - May 2025',
      highlights: [
        'Managed high-volume order processing and provided consistent, efficient customer service during peak operational hours',
        'Trained 5 incoming crew members on operational workflows, point-of-sale systems, and customer service standards'
      ],
    },
  ],
  skills: {
    languagesAndDev: ['C# / .NET', 'Python', 'Java', 'Go', 'C++', 'SQL', 'Angular', 'Git'],
    cloudAndInfra: ['Azure','AWS', 'Terraform', 'Docker', 'Ansible', 'Renovate', 'GitHub Actions', 'PowerShell', 'Bash'],
    security: ['CodeQL', 'Trivy', 'OWASP ZAP', 'TruffleHog', 'Burp Suite', 'Ghidra', 'Splunk', 'Wazuh'],
    networking: ['Wireguard', 'Xray-Core', 'UFW', 'Wireshark'],
  },
}
