import type { Theme } from '@/lib/constants/theme';

export type { Theme };

export interface App {
  id: string;
  label: string;
  icon: string;
  windowTitle: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  stack: string[];
  role: string;
  outcomes: string;
  repo: string;
  placeholder?: boolean;
}

export interface Experience {
  id: number;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level?: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
}

export interface Wallpaper {
  id: string;
  label: string;
  value: string;
}
