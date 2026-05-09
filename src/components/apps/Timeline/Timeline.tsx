const DIVIDER = '═'.repeat(35);

interface TimelineEntry {
  title: string;
  org: string;
  dates: string;
  lines: string[];
}

interface YearGroup {
  year: number;
  entries: TimelineEntry[];
}

const TIMELINE: YearGroup[] = [
  {
    year: 2025,
    entries: [
      {
        title: 'AI/ML Engineer Intern',
        org: 'Kinectrics',
        dates: 'May 2025 – Aug 2025',
        lines: [
          'Built production ML pipeline processing',
          '6,800+ records at 16.5ms latency.',
          'Automated test coverage across every',
          'pipeline component via PyTest.',
        ],
      },
    ],
  },
  {
    year: 2024,
    entries: [
      {
        title: 'Post-Graduate Diploma',
        org: 'York University',
        dates: 'May 2024',
        lines: [
          'Back-End and Blockchain Development.',
          'Coursework: Microservices, RESTful APIs,',
          'DevOps, CI/CD, TDD.',
        ],
      },
    ],
  },
  {
    year: 2023,
    entries: [
      {
        title: 'Bachelor of Technology',
        org: 'Amity University',
        dates: 'Jul 2023',
        lines: [
          'Computer Science and Engineering.',
          'Coursework: DSA, DBMS, Software Engineering,',
          'OOP.',
        ],
      },
    ],
  },
  {
    year: 2022,
    entries: [
      {
        title: 'Software Developer Intern',
        org: 'Genpact',
        dates: 'Jun 2022 – Aug 2022',
        lines: [
          'Python backend services reducing operational',
          'processing time by 30%.',
        ],
      },
      {
        title: 'Software Engineer Intern',
        org: 'AgroCep',
        dates: 'Mar 2022 – May 2022',
        lines: [
          'Cloud-native microservices on AWS with',
          '99.9% uptime across 1,000+ daily requests.',
        ],
      },
    ],
  },
  {
    year: 2025,
    entries: [
      {
        title: 'Post-Graduate Diploma',
        org: 'George Brown College',
        dates: 'Aug 2025',
        lines: [
          'Applied AI Solutions Development.',
          'Coursework: ML, Deep Learning, NLP,',
          'MLOps, Quality Assurance.',
        ],
      },
    ],
  },
];

interface FlatCard {
  groupIndex: number;
  year: number;
  isFirstInGroup: boolean;
  animIndex: number;
  title: string;
  org: string;
  dates: string;
  lines: string[];
}

let counter = 0;
const FLAT: FlatCard[] = TIMELINE.flatMap((group, gi) =>
  group.entries.map((entry, ei) => ({
    groupIndex: gi,
    year: group.year,
    isFirstInGroup: ei === 0,
    animIndex: counter++,
    ...entry,
  }))
);

export default function Timeline() {
  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        style={{
          fontFamily: 'var(--font-terminal)',
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          padding: 16,
          fontSize: '1rem',
          lineHeight: 1.6,
        }}
      >
        <div style={{ marginBottom: 4 }}>CAREER_TIMELINE.EXE</div>
        <div style={{ color: 'var(--color-border)', marginBottom: 16 }}>
          {DIVIDER}
        </div>

        {FLAT.map((card) => (
          <div key={`${card.groupIndex}-${card.org}`}>
            {/* Year header — only for first entry in each group */}
            {card.isFirstInGroup && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                  marginTop: card.groupIndex === 0 ? 0 : 16,
                }}
              >
                <span
                  style={{ color: 'var(--color-primary)', flexShrink: 0 }}
                >
                  [{card.year}]
                </span>
                <div
                  style={{
                    flex: 1,
                    borderTop: '1px solid var(--color-border)',
                  }}
                />
              </div>
            )}

            {/* Entry card */}
            <div
              style={{
                paddingLeft: 8,
                marginBottom: 12,
                opacity: 0,
                animation: `fadeSlideUp 400ms ease-out ${card.animIndex * 100}ms both`,
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                <span
                  style={{ color: 'var(--color-primary)', flexShrink: 0 }}
                >
                  ▶
                </span>
                <div>
                  <div
                    style={{ color: 'var(--color-text)', fontWeight: 'bold' }}
                  >
                    {card.title}
                  </div>
                  <div style={{ color: 'var(--color-text-dim)' }}>
                    {card.org} · {card.dates}
                  </div>
                  {card.lines.map((line, i) => (
                    <div key={i} style={{ color: 'var(--color-text)' }}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
