import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'SQL' },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'FastAPI' },
      { name: 'Flask' },
      { name: 'Spring Boot' },
      { name: 'React' },
      { name: 'Next.js' },
    ],
  },
  {
    category: 'Testing',
    skills: [
      { name: 'PyTest' },
      { name: 'JUnit' },
      { name: 'Selenium' },
      { name: 'Unittest' },
      { name: 'Mocha' },
    ],
  },
  {
    category: 'Cloud / DevOps',
    skills: [
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'Jenkins' },
      { name: 'Linux' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'MongoDB' },
      { name: 'Oracle' },
      { name: 'Redis' },
    ],
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'LangChain' },
      { name: 'OpenAI API' },
      { name: 'Pinecone' },
    ],
  },
];
