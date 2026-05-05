const DIVIDER = '═'.repeat(35);

interface BulletLine {
  main: string;
  cont?: string;
}

interface LogEntry {
  startDate: string;
  endDate: string;
  role: string;
  org: string;
  span: string;
  bullets: BulletLine[];
}

const LOG_ENTRIES: LogEntry[] = [
  {
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    role: 'AI/ML Engineer Intern',
    org: 'Kinectrics',
    span: 'May 2025 - Aug 2025',
    bullets: [
      {
        main: '> Built production ML pipeline in Python/FastAPI',
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
    startDate: '2022-06-01',
    endDate: '2022-08-31',
    role: 'Software Developer Intern',
    org: 'Genpact',
    span: 'Jun 2022 - Aug 2022',
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
    startDate: '2022-03-01',
    endDate: '2022-05-31',
    role: 'Software Engineer Intern',
    org: 'AgroCep',
    span: 'Mar 2022 - May 2022',
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

const dim: React.CSSProperties = { color: 'var(--color-text-dim)' };
const primary: React.CSSProperties = { color: 'var(--color-primary)' };
const text: React.CSSProperties = { color: 'var(--color-text)' };

function LogLine({
  date,
  tag,
  value,
  tagStyle,
}: {
  date: string;
  tag: string;
  value: string;
  tagStyle: React.CSSProperties;
}) {
  const padded = tag.length === 3 ? `[${tag}]  ` : `[${tag}] `;
  return (
    <div style={{ lineHeight: 1.6 }}>
      <span style={dim}>[{date}] </span>
      <span style={tagStyle}>{padded}</span>
      <span style={text}>{value}</span>
    </div>
  );
}

function Bullet({ item }: { item: BulletLine }) {
  return (
    <div style={text}>
      <div>{item.main}</div>
      {item.cont && <div>{item.cont}</div>}
    </div>
  );
}

export default function Experience() {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-terminal)',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    padding: 16,
    fontSize: '0.95rem',
    lineHeight: 1.7,
  };

  return (
    <div style={base}>
      <div style={{ marginBottom: 4 }}>SYSTEM_LOGS.TXT</div>

      {LOG_ENTRIES.map((entry, index) => (
        <div key={entry.startDate}>
          <div style={{ ...dim, marginBottom: 4 }}>{DIVIDER}</div>

          <LogLine
            date={entry.startDate}
            tag="INFO"
            value="SESSION STARTED"
            tagStyle={dim}
          />
          <LogLine
            date={entry.startDate}
            tag="ROLE"
            value={entry.role}
            tagStyle={primary}
          />
          <LogLine
            date={entry.startDate}
            tag="ORG"
            value={entry.org}
            tagStyle={primary}
          />
          <LogLine
            date={entry.startDate}
            tag="SPAN"
            value={entry.span}
            tagStyle={dim}
          />

          <div
            style={{
              color: 'var(--color-border)',
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            --
          </div>

          {entry.bullets.map((b, i) => (
            <Bullet key={i} item={b} />
          ))}

          <div style={{ marginTop: 4, lineHeight: 1.6 }}>
            <span style={dim}>[{entry.endDate}] </span>
            <span style={dim}>[INFO] </span>
            <span style={text}>SESSION ENDED</span>
          </div>

          {index === LOG_ENTRIES.length - 1 && (
            <div style={{ ...dim, marginTop: 8 }}>{DIVIDER}</div>
          )}
        </div>
      ))}

      <div style={{ marginTop: 4, lineHeight: 1.6 }}>
        <span style={dim}>[SYSTEM] </span>
        <span style={text}>
          End of log. {LOG_ENTRIES.length} sessions found.
        </span>
      </div>
    </div>
  );
}
