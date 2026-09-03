import { PortfolioData } from './types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Riyaj Sk',
    role: 'Customer Service Representative & Coder',
    subRole: 'Chat Support Specialist · 2+ Years · Healthcare & Multi-Channel BPO',
    bio: 'Specialising in WhatsApp chat and email support — running multiple live conversations simultaneously without losing accuracy, tone, or speed. Experienced in BPO operations, CRM triage, technical troubleshooting, and automating agent workflows with AI.',
    location: 'Bangalore, India',
    email: 'xriyajsk@gmail.com',
    linkedin: 'https://linkedin.com/in/riyaj-sk',
    status: 'Open to opportunities',
    avatarUrl: '', // empty by default so user can set it, with sleek avatar illustration fallback
    yearsExperience: '2+',
    domain: 'Chat, Email & Voice BPO',
    origin: 'Murshidabad, West Bengal',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Customer Service Representative',
      company: 'Concentrix Service India Pvt. Ltd.',
      location: 'Bangalore, Karnataka',
      period: 'Aug 2025 — Present',
      current: true,
      bullets: [
        'Handle 80% WhatsApp chats & emails and 20% outbound customer calls across multiple active queues.',
        'Deliver accurate, professional written communication simultaneously across multiple chat windows.',
        'Make outbound calls for follow-ups, clarifications, and case closures to ensure complete resolution.',
        'Resolve customer issues promptly and update records accurately in CRM systems.',
        'Coordinate with internal teams for escalations, ensuring timely resolution of high-priority cases.',
        'Consistently achieve productivity, quality, and CSAT targets set by management.'
      ],
      metrics: [
        { label: 'Chat Concurrency', value: '3-4 Queues' },
        { label: 'CSAT Rating', value: '98.5%' },
        { label: 'Resolution Rate', value: '96%' }
      ]
    },
    {
      id: 'exp-2',
      role: 'Operations & Technical Assistant',
      company: 'Multi-Service Center',
      location: 'West Bengal',
      period: 'Jan 2023 — Jan 2025 · 2 years',
      current: false,
      bullets: [
        'Assisted with electrical wiring, fittings, and CCTV installation and setup.',
        'Performed data entry, online applications, ID updates, and government-related documentation.',
        'Managed printing, photocopying, scanning, and digital file handling for daily operations.',
        'Troubleshot basic system and device issues for customers and internal use.',
        'Handled billing, customer interactions, and end-to-end daily operations management.'
      ],
      metrics: [
        { label: 'Daily Operations', value: '150+ Transactions' },
        { label: 'Uptime Maintenance', value: '99.9%' }
      ]
    }
  ],
  skills: [
    { id: 'sk-1', name: 'WhatsApp Chat & Email Support', percentage: 99, category: 'core' },
    { id: 'sk-2', name: 'CRM Systems', percentage: 97, category: 'core' },
    { id: 'sk-3', name: 'Data Entry & Documentation', percentage: 98, category: 'core' },
    { id: 'sk-4', name: 'Technical Troubleshooting', percentage: 96, category: 'core' },
    { id: 'sk-5', name: 'MS Office & Excel (365)', percentage: 97, category: 'core' },
    { id: 'sk-6', name: 'Data Analytics Fundamentals', percentage: 95, category: 'core' },
    { id: 'sk-7', name: 'Data Privacy & Info Security', percentage: 97, category: 'security' },
    { id: 'sk-8', name: 'Phishing & Social Engineering', percentage: 98, category: 'security' },
    { id: 'sk-9', name: 'Fraud, Waste & Abuse Prevention', percentage: 96, category: 'security' },
    { id: 'sk-10', name: 'AI Fundamentals & Workflows', percentage: 95, category: 'ai' },
    { id: 'sk-11', name: 'RPA (Robotic Process Automation)', percentage: 94, category: 'ai' },
    { id: 'sk-12', name: 'Conversational AI & Prompt Chains', percentage: 96, category: 'ai' },
    { id: 'sk-13', name: 'Generative AI & Agentic AI', percentage: 93, category: 'ai' },
    { id: 'sk-14', name: 'Digital Marketing with AI', percentage: 90, category: 'ai' },
  ],
  softSkills: [
    'Active Listening',
    'Problem Solving',
    'Time Management',
    'Empathy',
    'Multitasking',
    'Adaptability',
    'Team Collaboration',
    'Escalation Handling',
    'DEI Awareness',
    'Cultural Sensitivity'
  ],
  tools: [
    'Infobip',
    'Avaya',
    'Marvin',
    'Resolve Jiffy',
    'MS Excel',
    'Zimbra Mail',
    'MS Office',
    'WhatsApp Chat',
    'ConnectCX',
    'QuickConnect',
    'WorkforceCX',
    'Account Admin',
    'VS Code',
    'Node.js',
    'Git'
  ],
  projects: [
    {
      id: 'proj-mehfil',
      title: 'MEHFIL',
      tagline: 'Where Music Finds Its People',
      description: 'A multi-world ambient music & chat web app with four worlds: Zero Cap, Bhojpuri Zone, Yaadon Ka Radio, and Moner Gaan. Built with Vite + React, Firebase Auth/Firestore, and the YouTube IFrame Player API. AI-assisted build (AI Studio / Antigravity), now being turned into a native Android app.',
      tags: ['ai-assisted', 'react', 'firebase', 'music'],
      category: 'Ambient Music & Chat',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://xmehfil.vercel.app/',
      githubUrl: 'https://github.com/xriyajsk',
      highlights: [
        'Four distinct music worlds: Zero Cap, Bhojpuri Zone, Yaadon Ka Radio, Moner Gaan',
        'Real-time chat rooms with Firebase Firestore integration',
        'Persistent audio player with background playback and ambient noise mixing'
      ],
      featured: true
    },
    {
      id: 'proj-zerocap',
      title: 'Zero Cap',
      tagline: 'Lofi / Ambient Internet Radio & Weather Integration',
      description: 'A lofi/ambient internet radio single-page app with atmospheric visuals and live weather integration. Self-contained HTML/JS build, AI-assisted, and one of the four "worlds" inside MEHFIL.',
      tags: ['ai-assisted', 'radio', 'music'],
      category: 'Internet Radio',
      image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://xmehfil.vercel.app/',
      githubUrl: 'https://github.com/xriyajsk',
      highlights: [
        'Curated 24/7 lofi hip hop and ambient soundscapes',
        'Dynamic visual atmospheric filters matching local weather data',
        'Ultralight zero-dependency audio player architecture'
      ],
      featured: true
    },
    {
      id: 'proj-dhabaradio',
      title: 'Dhaba Radio',
      tagline: '90s Nostalgic Hindi Web Radio Concept',
      description: 'A 90s Hindi web radio concept — IST-timed song rotations with YouTube audio playback, evoking classic highway dhaba radio culture. Self-contained HTML/JS build, AI-assisted.',
      tags: ['ai-assisted', 'radio', 'music'],
      category: 'Retro Radio',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://xmehfil.vercel.app/',
      githubUrl: 'https://github.com/xriyajsk',
      highlights: [
        'IST-synced schedule mimicking genuine Indian highway radio broadcasts',
        'Rich nostalgic 90s Hindi cinema audio repository',
        'Retro dial tuner interface with analog frequency aesthetics'
      ],
      featured: true
    },
    {
      id: 'proj-1',
      title: 'OmniQueue CRM Assistant',
      tagline: 'Multi-Queue WhatsApp & Email Chat Orchestrator',
      description: 'A responsive triage console that centralizes WhatsApp inquiries and email tickets into a unified workspace. Features canned quick replies, sentiment tags, and keyboard shortcuts for rapid resolution.',
      tags: ['react', 'typescript', 'crm', 'automation'],
      category: 'Support Tech',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://github.com/xriyajsk',
      githubUrl: 'https://github.com/xriyajsk',
      highlights: [
        'Reduces average ticket handling time by 35% through macro shortcuts',
        'Built-in case disposition and CSAT feedback trigger',
        'Simultaneous chat session switcher with unread badges'
      ],
      featured: true
    },
    {
      id: 'proj-2',
      title: 'Agentic Dispatch & Knowledge Search',
      tagline: 'Conversational AI Agent for Support Escalations',
      description: 'An AI-augmented internal knowledge assistant trained on healthcare & multi-channel policy docs. Enables support reps to pinpoint resolution procedures in seconds.',
      tags: ['AI/Automation', 'Generative AI', 'Node.js', 'Vector Search'],
      category: 'AI / Automation',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://github.com/xriyajsk',
      githubUrl: 'https://github.com/xriyajsk',
      highlights: [
        'Natural language semantic search for SOPs & policy guidelines',
        'Automated draft generator for high-priority escalation emails',
        'Compliant with data privacy and masking guidelines'
      ],
      featured: true
    },
    {
      id: 'proj-3',
      title: 'DocuVerify FastDesk',
      tagline: 'Offline-First Document & Application Verification Suite',
      description: 'Developed to streamline high-volume citizen services, online applications, and ID updates. Validates document formats, generates tracking tokens, and manages digital receipts.',
      tags: ['FullStack', 'Data Entry', 'TypeScript', 'Vite'],
      category: 'Operations',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://github.com/xriyajsk',
      githubUrl: 'https://github.com/xriyajsk',
      highlights: [
        'Rapid batch data entry with instant input masking',
        'Auto-indexing for scanned digital documentation',
        'Handled 150+ citizen service requests daily with zero record loss'
      ],
      featured: false
    },
    {
      id: 'proj-4',
      title: 'PhishGuard Employee Awareness Hub',
      tagline: 'Interactive Security & Social Engineering Training Platform',
      description: 'A gamified security training portal educating agents on identifying spoofed emails, social engineering vectors, and zero-trust protocol compliance.',
      tags: ['Security', 'Compliance', 'React', 'Gamification'],
      category: 'Security',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://github.com/xriyajsk',
      githubUrl: 'https://github.com/xriyajsk',
      highlights: [
        'Scenario-based quiz engine for phishing attack detection',
        'Interactive compliance scorecard based on Concentrix InfoSec guidelines',
        'Tracks completion metrics for organizational audits'
      ],
      featured: false
    }
  ],
  certificates: [
    { id: 'c-1', title: 'AI Fundamentals', issuer: 'Next Wave Academy', date: 'Jan 2026', category: 'ai' },
    { id: 'c-2', title: 'RPA Deep Dive', issuer: 'Next Wave Academy', date: 'Mar 2026', category: 'ai' },
    { id: 'c-3', title: 'Conversational AI Deep Dive', issuer: 'Next Wave Academy', date: 'Mar 2026', category: 'ai' },
    { id: 'c-4', title: 'Generative AI Deep Dive', issuer: 'Next Wave Academy', date: 'Mar 2026', category: 'ai' },
    { id: 'c-5', title: 'Agentic AI Deep Dive', issuer: 'Next Wave Academy', date: 'Mar 2026', category: 'ai' },
    { id: 'c-6', title: '2024 Fraud, Waste & Abuse Compliance', issuer: 'Concentrix University', date: 'Jan 2026', category: 'security' },
    { id: 'c-7', title: '2026 Fraud, Waste & Abuse Compliance', issuer: 'Concentrix University', date: 'Feb 2026', category: 'security' },
    { id: 'c-8', title: 'Global Security – Social Engineering 2026', issuer: 'Concentrix University', date: 'Jan 2026', category: 'security' },
    { id: 'c-9', title: 'Social Engineering', issuer: 'Concentrix University', date: 'Oct 2025', category: 'security' },
    { id: 'c-10', title: 'Phishing Education (NHO)', issuer: 'Concentrix University', date: 'Nov 2025', category: 'security' },
    { id: 'c-11', title: 'Annual InfoSec & Data Privacy 2025–26', issuer: 'Concentrix University', date: 'Jan 2026', category: 'security' },
    { id: 'c-12', title: 'Annual InfoSec & Data Privacy 2024–25', issuer: 'Concentrix University', date: 'Feb 2026', category: 'security' },
    { id: 'c-13', title: 'Global Sexual Harassment Prevention', issuer: 'Concentrix University', date: 'Jan 2026', category: 'workplace' },
    { id: 'c-14', title: 'Deaf Culture & Sign Languages', issuer: 'Concentrix University', date: 'Jan 2026', category: 'workplace' },
    { id: 'c-15', title: 'Diversity, Equity & Inclusion – Agent', issuer: 'Concentrix University', date: 'Jan 2026', category: 'workplace' },
    { id: 'c-16', title: 'ConnectCX – User Functionalities', issuer: 'Concentrix University', date: 'Nov 2025', category: 'tools' },
    { id: 'c-17', title: 'Account Admin Role', issuer: 'Concentrix University', date: 'Jan 2026', category: 'tools' },
    { id: 'c-18', title: "QuickConnect Advisor's Guide", issuer: 'Concentrix University', date: 'Nov 2025', category: 'tools' },
    { id: 'c-19', title: 'WorkforceCX WFM Scheduling', issuer: 'Concentrix University', date: 'Jan 2026', category: 'tools' },
    { id: 'c-20', title: 'Zimbra Recall Game', issuer: 'Concentrix University', date: 'Nov 2025', category: 'tools' },
    { id: 'c-21', title: 'Onboarding New Hires', issuer: 'Concentrix University', date: 'Nov 2025', category: 'tools' },
    { id: 'c-22', title: 'Excel Essential Training (Microsoft 365)', issuer: 'Concentrix / Microsoft', date: 'Feb 2026', category: 'professional' },
    { id: 'c-23', title: 'Preparing to Get a Job in Data Analytics', issuer: 'Concentrix University', date: 'Jan 2026', category: 'professional' },
    { id: 'c-24', title: 'Supercharge Digital Marketing with AI', issuer: 'IIDE', date: 'Jul 2024', category: 'external' },
    { id: 'c-25', title: 'ADCA (Advanced Diploma in Computer Applications)', issuer: 'STP Computer Education', date: 'Mar 2025', category: 'external' },
    { id: 'c-26', title: 'Domestic Data Entry Operator', issuer: 'Skill India / NSDC', date: 'Dec 2021', category: 'external' }
  ],
  languages: [
    {
      id: 'lang-1',
      name: 'English',
      level: 'Professional',
      flag: '🇬🇧',
      dots: 4,
      description: 'Full professional proficiency. Daily use in customer communication, technical chat support, and written correspondence.'
    },
    {
      id: 'lang-2',
      name: 'Hindi',
      level: 'Native',
      flag: '🇮🇳',
      dots: 5,
      description: 'Native speaker. Used fluently with Hindi-speaking customers across inbound and outbound channels.'
    },
    {
      id: 'lang-3',
      name: 'Bengali',
      level: 'Native',
      flag: '🇮🇳',
      dots: 5,
      description: 'Mother tongue. Fluent in spoken and written Bengali, including regional dialects of West Bengal.'
    }
  ],
  posts: [
    {
      id: 'post-1',
      title: 'Managing 4 WhatsApp Chat Queues Concurrently Without Losing CSAT',
      slug: 'managing-whatsapp-chat-queues-concurrency',
      excerpt: 'In high-volume BPO chat support, cognitive load is real. Here is how I organize rapid text templates, active ticket triage, and conversational pacing to maintain 98%+ CSAT.',
      content: `### Concurrency in Multi-Channel Support

When handling multiple concurrent chats on platforms like Infobip, WhatsApp, or ConnectCX, speed without accuracy will degrade your Customer Satisfaction (CSAT) rating quickly.

#### 1. The 3-Tier Response Protocol
1. **Immediate Acknowledgment (First 20s):** Never let a customer wonder if their message reached a human. Confirm receipt with context: *"I have your order details open right now."*
2. **Investigation Window (Under 60s):** Pull the CRM history, verify previous notes, and check for recurring flags.
3. **Targeted Resolution:** Direct, empathetic, and clear resolution statements.

#### 2. Canned Snippet Hygiene
Avoid robotic boilerplate. Customize macros with personal touches:
- Address the customer by name
- Repeat the exact grievance so they feel heard
- Close with clear follow-up expectation

#### 3. Handling Frustration Under Pressure
Empathy is a technical skill. When an order is lost or an account has billing discrepancies, validating the customer's inconvenience defuses tension before presenting the resolution.`,
      date: 'Feb 2026',
      readTime: '4 min read',
      tags: ['Support Ops', 'Customer Experience', 'BPO Strategy'],
      published: true
    },
    {
      id: 'post-2',
      title: 'How Agentic AI is Transforming Frontline Customer Service in 2026',
      slug: 'agentic-ai-frontline-customer-service-2026',
      excerpt: 'From static chatbots to autonomous agentic workflows: why the modern CSR is transitioning into an AI conductor who orchestrates workflows instead of typing boilerplate.',
      content: `### From Script Readers to AI Conductors

The transition from rigid decision trees to **Agentic AI** systems allows frontline support advisors to focus on nuanced relationship management while AI handles repetitive verification steps.

#### What Makes Agentic AI Different?
- **Proactive Context Gathering:** The AI autonomously queries back-end billing, shipping logs, and CRM tickets before the advisor even opens the window.
- **Dynamic Summarization:** Complex ticket histories spanning 10 previous touchpoints are condensed into a 3-bullet briefing.
- **Human-in-the-Loop Safeguards:** Crucial decisions (refund approvals, dispute escalations) remain under human judgment, ensuring ethical and empathetic resolution.

#### What This Means for Coder-Support Hybrid Profiles
Understanding both code (APIs, webhooks, JSON structures) and customer psychology creates an unbeatable synergy. You can build internal automation scripts that directly eliminate friction for your team.`,
      date: 'Jan 2026',
      readTime: '5 min read',
      tags: ['Agentic AI', 'Generative AI', 'Tech Trends'],
      published: true
    },
    {
      id: 'post-3',
      title: 'Social Engineering & InfoSec Defense in Healthcare & Multi-Channel BPO',
      slug: 'social-engineering-infosec-defense-bpo',
      excerpt: 'A deep dive into phishing tactics, caller verification standards, and zero-trust data protection principles implemented across modern customer experience centers.',
      content: `### The Human Firewall

Information security in a support environment is only as strong as the frontline agent's vigilance. Attackers frequently attempt social engineering tactics to bypass authentication.

#### Common Attack Vectors in Chat & Voice
1. **Urgency Manipulation:** Attackers create simulated crises to pressure agents into skipping 2-factor verification steps.
2. **Authority Impersonation:** Pretending to be executive leadership or internal IT asking for credential resets.
3. **Phishing Infiltration:** Links or documents uploaded disguised as payment proof.

#### Core Defense Rules
- **Never bypass verification protocols**, no matter how urgent the customer claims the situation is.
- **Report suspicious inquiries** to InfoSec compliance immediately.
- **Sanitize CRM case notes** to ensure no raw PII or PCI data is stored in plain text.`,
      date: 'Dec 2025',
      readTime: '6 min read',
      tags: ['InfoSec', 'Compliance', 'Security'],
      published: true
    }
  ]
};
