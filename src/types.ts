export interface Profile {
  name: string;
  role: string;
  subRole: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  status: string;
  avatarUrl: string;
  yearsExperience: string;
  domain: string;
  origin: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  percentage: number;
  category: 'core' | 'ai' | 'security' | 'soft' | 'tool';
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  featured?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'ai' | 'security' | 'workplace' | 'tools' | 'professional' | 'external';
  credentialUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
  flag: string;
  dots: number; // out of 5
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

export interface PortfolioData {
  profile: Profile;
  experiences: Experience[];
  skills: SkillCategory[];
  softSkills: string[];
  tools: string[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  posts: BlogPost[];
}

export interface AdminUser {
  email: string;
  name: string;
  picture?: string;
  isAdmin: boolean;
  token?: string;
}

export type ThemeMode = 'dark' | 'light';

export type PageId = 'home' | 'about' | 'experience' | 'certifications' | 'work' | 'contact' | 'admin' | 'not-found';
