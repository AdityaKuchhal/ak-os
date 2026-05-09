import { OWNER } from '@/lib/constants/os';

const DIVIDER = '═'.repeat(35);

interface BulletItem {
  main: string;
  cont?: string;
}

interface ExpEntry {
  role: string;
  company: string;
  dates: string;
  bullets: BulletItem[];
}

interface EduEntry {
  school: string;
  program: string;
  date: string;
}

interface SkillRow {
  label: string;
  lines: string[];
}

const EDUCATION: EduEntry[] = [
  {
    school: 'George Brown College',
    program: 'Post-Graduate Diploma, Applied AI Solutions Development',
    date: 'Aug 2025',
  },
  {
    school: 'York University',
    program: 'Post-Graduate Diploma, Back-End and Blockchain Development',
    date: 'May 2024',
  },
  {
    school: 'Amity University',
    program: 'Bachelor of Technology, Computer Science and Engineering',
    date: 'Jul 2023',
  },
];

const EXPERIENCE: ExpEntry[] = [
  {
    role: 'AI/ML Engineer Intern',
    company: 'Kinectrics',
    dates: 'May 2025 – Aug 2025',
    bullets: [
      {
        main: '> Production ML pipeline in Python/FastAPI',
        cont: '  processing 6,800+ records at 16.5ms latency',
      },
      {
        main: '> PyTest unit and integration tests across',
        cont: '  every pipeline component',
      },
      { main: '> CI/CD via GitHub Actions and Docker on AWS' },
      {
        main: '> Profiled and resolved FastAPI throughput',
        cont: '  bottlenecks under concurrent load',
      },
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Genpact',
    dates: 'Jun 2022 – Aug 2022',
    bullets: [
      {
        main: '> Python backend services and REST APIs',
        cont: '  for SaaS automation platform',
      },
      { main: '> Reduced operational processing time by 30%' },
      {
        main: '> PyTest and JUnit coverage across API',
        cont: '  and data pipeline layers',
      },
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'AgroCep',
    dates: 'Mar 2022 – May 2022',
    bullets: [
      {
        main: '> Cloud-native microservices on AWS with',
        cont: '  Docker and CI/CD pipelines',
      },
      {
        main: '> Flask REST APIs with 99.9% uptime across',
        cont: "  1,000+ daily requests",
      },
    ],
  },
];

const SKILLS: SkillRow[] = [
  {
    label: 'Languages:   ',
    lines: ['Python, Java, JavaScript,', 'TypeScript, SQL, HTML, CSS'],
  },
  {
    label: 'Frameworks:  ',
    lines: ['FastAPI, Flask, Spring Boot,', 'React, Next.js'],
  },
  {
    label: 'Testing:     ',
    lines: ['PyTest, JUnit, Selenium,', 'Unittest, Mocha'],
  },
  {
    label: 'Cloud:       ',
    lines: ['AWS, Docker, GitHub Actions,', 'Jenkins, Linux'],
  },
  {
    label: 'Databases:   ',
    lines: ['PostgreSQL, MySQL, MongoDB,', 'Oracle, Redis'],
  },
  { label: 'AI/ML:       ', lines: ['LangChain, OpenAI API, Pinecone'] },
];

function Divider() {
  return (
    <div style={{ color: 'var(--color-border)', lineHeight: 1.4 }}>
      {DIVIDER}
    </div>
  );
}

function SectionBlock({ title }: { title: string }) {
  return (
    <>
      <div style={{ marginTop: 8 }}>
        <Divider />
      </div>
      <div
        style={{ color: 'var(--color-primary)', lineHeight: 1.7 }}
      >
        {title}
      </div>
      <Divider />
    </>
  );
}

function Bullet({ item }: { item: BulletItem }) {
  return (
    <div style={{ color: 'var(--color-text-dim)' }}>
      <div>{item.main}</div>
      {item.cont && <div>{item.cont}</div>}
    </div>
  );
}

export default function Resume() {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-terminal)',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    padding: 16,
    fontSize: '1rem',
    lineHeight: 1.7,
  };

  return (
    <div style={base}>
      {/* File header */}
      <div style={{ marginBottom: 4 }}>RESUME.EXE</div>
      <Divider />

      {/* Contact block */}
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <div style={{ color: 'var(--color-text)' }}>{OWNER.name}</div>
        <div style={{ color: 'var(--color-text-dim)' }}>{OWNER.role}</div>
        <div style={{ color: 'var(--color-text-dim)' }}>
          {OWNER.location} | {OWNER.email}
        </div>
        <div style={{ color: 'var(--color-text-dim)' }}>{OWNER.linkedin}</div>
      </div>

      {/* Education */}
      <SectionBlock title="EDUCATION" />
      {EDUCATION.map((edu) => (
        <div key={edu.school} style={{ marginTop: 8 }}>
          <div style={{ color: 'var(--color-text)' }}>{edu.school}</div>
          <div style={{ color: 'var(--color-text-dim)' }}>{edu.program}</div>
          <div style={{ color: 'var(--color-text-dim)' }}>{edu.date}</div>
        </div>
      ))}

      {/* Experience */}
      <SectionBlock title="EXPERIENCE" />
      {EXPERIENCE.map((exp) => (
        <div key={exp.company} style={{ marginTop: 8 }}>
          <div style={{ color: 'var(--color-text)' }}>
            {exp.role} — {exp.company}
          </div>
          <div style={{ color: 'var(--color-text-dim)' }}>{exp.dates}</div>
          <div style={{ marginTop: 2 }}>
            {exp.bullets.map((b, i) => (
              <Bullet key={i} item={b} />
            ))}
          </div>
        </div>
      ))}

      {/* Skills */}
      <SectionBlock title="SKILLS" />
      <div style={{ marginTop: 8 }}>
        {SKILLS.map((row) => (
          <div key={row.label} style={{ display: 'flex' }}>
            <span
              style={{
                width: '13ch',
                flexShrink: 0,
                color: 'var(--color-text-dim)',
              }}
            >
              {row.label}
            </span>
            <div style={{ color: 'var(--color-text)' }}>
              {row.lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Download button */}
      <div style={{ marginTop: 24 }}>
        <a
          href="/aditya_kuchhal.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg)',
            fontFamily: 'var(--font-terminal)',
            fontSize: '1rem',
            padding: '8px 16px',
            borderRadius: 0,
            textDecoration: 'none',
          }}
        >
          [ DOWNLOAD RESUME ]
        </a>
      </div>
    </div>
  );
}
