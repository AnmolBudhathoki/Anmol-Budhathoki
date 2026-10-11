import { Project, SkillCategory } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'jarvis',
    title: 'Jarvis Desktop Voice Assistant',
    tagline: 'Hero Showcase • Desktop AI & Autonomous Orchestrator',
    category: 'ai',
    featured: true,
    description:
      'Real-time speech recognition engine and autonomous desktop orchestrator. Converts natural human speech into system-level shell commands, automated calendar workflows, and LLM-assisted knowledge synthesis without cloud dependency latency.',
    tags: ['Python', 'SpeechRecognition', 'PyAudio', 'Automation', 'LLM API', 'Local Whisper'],
    metrics: [
      { label: 'Speech Latency', value: '< 180ms' },
      { label: 'Voice SNR', value: '42 dB' },
      { label: 'Command Accuracy', value: '98.4%' },
    ],
    status: 'Production',
    liveUrl: '#',
    githubUrl: 'https://github.com/anmolbudhathoki',
    terminalSnippet: {
      filename: 'jarvis_daemon.py • audio_pipe: [ACTIVE]',
      lines: [
        '> initializing audio input stream (PyAudio)... OK',
        '> loading local whisper speech-to-text pipeline... DONE',
        '[LISTENING] Voice vector detected • SNR: 42dB',
        '"Jarvis, pull latest build telemetry and trigger deploy sequence."',
        '> NLP Parsing: command = "DEPLOY_PRODUCTION" | env = "cloud"',
        '> Status 200: Build pipeline triggered. Notification dispatched.',
      ],
    },
  },
  {
    id: 'bluefox-portal',
    title: 'Blue Fox Official Portal',
    tagline: 'Flagship Commercial Venture • High-Performance Web',
    category: 'web',
    featured: true,
    description:
      'Enterprise agency corporate portal engineered for maximum Core Web Vitals, dynamic case study galleries, fast reactive transitions, and seamless conversion funnels. Built to reflect Blue Fox’s standard of engineering excellence.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Edge Functions'],
    metrics: [
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'First Contentful Paint', value: '0.4s' },
      { label: 'Uptime', value: '99.98%' },
    ],
    status: 'Live Enterprise',
    liveUrl: 'https://bluefox.com.np/',
    githubUrl: 'https://github.com/anmolbudhathoki',
  },
  {
    id: 'ai-paraphraser',
    title: 'AI Paraphrasing & Synthesis Platform',
    tagline: 'NLP Synthesizer & Tone Transformer',
    category: 'ai',
    description:
      'Semantic context rephraser built for linguistic precision, tone calibration (Academic, Casual, Technical), and intelligent summarization using fine-tuned open transformer models via lightweight API endpoints.',
    tags: ['React', 'Python FastAPI', 'HuggingFace Transformers', 'Tailwind CSS', 'Docker'],
    metrics: [
      { label: 'Inference Speed', value: '45 tok/s' },
      { label: 'Grammar Precision', value: '96.2%' },
    ],
    status: 'Production',
    liveUrl: '#',
    githubUrl: 'https://github.com/anmolbudhathoki',
  },
  {
    id: 'cyber-labs',
    title: 'Cybersecurity Recon & Learning Labs',
    tagline: 'Network Defense & Protocol Telemetry Toolkit',
    category: 'security',
    description:
      'Custom packet inspection utility and vulnerability triage toolkit. Inspects protocol telemetry, flags anomalous TCP handshakes, and provides interactive sandboxes for defensive security practices.',
    tags: ['Python', 'Wireshark Libs', 'Linux', 'Sockets', 'Scapy', 'Network Analysis'],
    metrics: [
      { label: 'Packets/sec', value: '120k' },
      { label: 'Signature DB', value: '1,400+' },
    ],
    status: 'Research Lab',
    liveUrl: '#',
    githubUrl: 'https://github.com/anmolbudhathoki',
  },
  {
    id: 'quantum-task',
    title: 'QuantumTask Productivity Suite',
    tagline: 'Experimental Spatial Productivity Engine',
    category: 'web',
    description:
      'Experimental spatial productivity dashboard with offline-first local synchronization, deterministic CRDT conflict resolution, and sub-10ms UI latency for high-output engineering crews.',
    tags: ['TypeScript', 'IndexedDB', 'Web Workers', 'Canvas API', 'CRDTs', 'Vite'],
    metrics: [
      { label: 'Sync Latency', value: '< 8ms' },
      { label: 'Offline Support', value: '100%' },
    ],
    status: 'Active Alpha',
    liveUrl: '#',
    githubUrl: 'https://github.com/anmolbudhathoki',
  },
  {
    id: 'bluefox-erp',
    title: 'Blue Fox Enterprise CRM & Invoicing',
    tagline: 'Enterprise Operations & Client Financial Portal',
    category: 'enterprise',
    description:
      'Full-featured client and project management suite with automated invoicing, localized tax calculations for Nepal (PAN/VAT), and multi-currency billing reconciliation.',
    tags: ['PostgreSQL', 'Express', 'React', 'Tailwind CSS', 'JWT Auth'],
    metrics: [
      { label: 'Monthly Invoices', value: '500+' },
      { label: 'Database Queries', value: '< 12ms' },
    ],
    status: 'Live Enterprise',
    liveUrl: 'https://bluefox.com.np/',
    githubUrl: 'https://github.com/anmolbudhathoki',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming & Core Systems',
    icon: 'terminal',
    color: '#3891fc',
    description: 'The algorithmic spine and foundation of computational engineering.',
    skills: [
      { name: 'Python', level: 'production', details: 'FastAPI, PyAudio, Automation, Data Pipelines' },
      { name: 'TypeScript', level: 'production', details: 'Strict typing, Generics, Node, React' },
      { name: 'JavaScript (ESNext)', level: 'production', details: 'Asynchronous event loops, V8 optimization' },
      { name: 'Java', level: 'production', details: 'OOP architecture, Spring Boot basics' },
      { name: 'C / C++', level: 'expanding', details: 'Pointers, memory management, low-level data structures' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Architecture',
    icon: 'desktop_windows',
    color: '#00dbe9',
    description: 'Pixel-precise, fluid interfaces tuned for Core Web Vitals and accessible design.',
    skills: [
      { name: 'Next.js (App Router)', level: 'production', details: 'Server Components, SSR, ISR, Edge caching' },
      { name: 'React 19 / 18', level: 'production', details: 'Custom hooks, Context, Suspense, Concurrent mode' },
      { name: 'Tailwind CSS v4', level: 'production', details: 'Modern token systems, high-density layouts' },
      { name: 'HTML5 Semantic DOM', level: 'production', details: 'WCAG AAA accessibility, Microdata' },
      { name: 'WebGL & Canvas Shaders', level: 'expanding', details: 'GLSL frag shaders, 60fps ambient visualizers' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Distributed Services',
    icon: 'dns',
    color: '#4d8eff',
    description: 'Microservices, reliable data pipelines, and secure transactional APIs.',
    skills: [
      { name: 'Python FastAPI', level: 'production', details: 'Async routes, Pydantic validation, OpenAPI specs' },
      { name: 'Node.js / Express', level: 'production', details: 'Middleware pipelines, REST APIs, WebSockets' },
      { name: 'RESTful API Engineering', level: 'production', details: 'Clean contract design, rate-limiting, auth' },
      { name: 'PostgreSQL', level: 'production', details: 'Relational schemas, indexing, complex aggregations' },
      { name: 'SQLite / Redis', level: 'expanding', details: 'Fast in-memory caching and embedded data engines' },
    ],
  },
  {
    id: 'security',
    title: 'Cybersecurity & Infrastructure',
    icon: 'shield_locked',
    color: '#ffb4ab',
    description: 'Defensive posture, hardened network daemons, and automated deployment pipelines.',
    skills: [
      { name: 'Linux Administration', level: 'production', details: 'Ubuntu, Debian, systemd, shell scripting' },
      { name: 'Network Protocols (TCP/IP)', level: 'production', details: 'Wireshark packet triage, socket servers' },
      { name: 'Git & GitHub Actions CI/CD', level: 'production', details: 'Automated test runners, release scripts' },
      { name: 'Kali Security Tooling', level: 'expanding', details: 'Defensive lab auditing, reconnaissance' },
    ],
  },
  {
    id: 'ai-orchestration',
    title: 'AI, LLMs & Workflow Automation',
    icon: 'smart_toy',
    color: '#00F0FF',
    description: 'Connecting frontier machine learning models with local operating system endpoints and reactive interfaces.',
    skills: [
      { name: 'OpenAI & Claude APIs', level: 'production', details: 'Structured outputs, tool calling, latency optimization' },
      { name: 'Systematic Prompt Engineering', level: 'production', details: 'Few-shot templates, evaluation benchmarks' },
      { name: 'Desktop Automation Scripts', level: 'production', details: 'OS automation, keyboard/mouse macros, file watchers' },
      { name: 'Whisper Speech Pipelines', level: 'production', details: 'Local STT transcription and voice-controlled triggers' },
      { name: 'Autonomous Agentic Flows', level: 'expanding', details: 'Multi-step self-correcting task execution loops' },
    ],
  },
];

export const BLUE_FOX_SERVICES = [
  {
    icon: 'code',
    title: 'Web Engineering',
    description: 'High-speed Next.js portals, PWAs, and enterprise web solutions engineered for maximum performance.',
    highlight: '99+ Core Web Vitals',
  },
  {
    icon: 'terminal',
    title: 'Custom Software',
    description: 'Tailored management, ERP, CRM, and mission-critical automated pipelines for high-velocity teams.',
    highlight: 'Bespoke Architecture',
  },
  {
    icon: 'smartphone',
    title: 'Mobile Applications',
    description: 'Reactive cross-platform iOS & Android platforms delivering silky-smooth user experiences.',
    highlight: 'Offline-First Ready',
  },
  {
    icon: 'query_stats',
    title: 'Digital Marketing & Growth',
    description: 'Data-driven performance strategy, conversion rate optimization, and technical search visibility.',
    highlight: 'Data-Backed ROI',
  },
  {
    icon: 'palette',
    title: 'Brand & UI/UX Systems',
    description: 'Holistic product design systems, obsidian interfaces, and brand identities with unmistakable character.',
    highlight: 'Design Systems',
  },
];
