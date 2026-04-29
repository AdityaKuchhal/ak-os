import type { Experience } from '@/types';

export const experience: Experience[] = [
  {
    id: 1,
    company: 'Kinectrics',
    title: 'AI/ML Engineer Intern',
    startDate: 'May 2025',
    endDate: 'Aug 2025',
    highlights: [
      'Production ML pipeline in Python/FastAPI processing 6,800+ records at 16.5ms latency',
      'PyTest unit and integration tests across every pipeline component',
      'CI/CD via GitHub Actions and Docker on AWS',
      'Profiled and resolved FastAPI throughput bottlenecks under concurrent load',
    ],
  },
  {
    id: 2,
    company: 'Genpact',
    title: 'Software Developer Intern',
    startDate: 'Jun 2022',
    endDate: 'Aug 2022',
    highlights: [
      'Python backend services and REST APIs for SaaS automation platform',
      'Reduced operational processing time by 30%',
      'PyTest and JUnit coverage across API and data pipeline layers',
    ],
  },
  {
    id: 3,
    company: 'AgroCep',
    title: 'Software Engineer Intern',
    startDate: 'Mar 2022',
    endDate: 'May 2022',
    highlights: [
      'Cloud-native microservices on AWS with Docker and CI/CD pipelines',
      'Flask REST APIs with 99.9% uptime across 1,000+ daily requests',
    ],
  },
];
