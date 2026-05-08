const DIVIDER = '═'.repeat(35);

interface Achievement {
  title: string;
  lines: string[];
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'PRODUCTION ML PIPELINE',
    lines: [
      'Shipped end-to-end ML system processing',
      '6,800+ records at 16.5ms latency at Kinectrics.',
    ],
  },
  {
    title: '30% EFFICIENCY GAIN',
    lines: [
      'Reduced operational processing time by 30%',
      'via Python backend services at Genpact.',
    ],
  },
  {
    title: '99.9% UPTIME',
    lines: [
      'Maintained 99.9% uptime across 1,000+ daily',
      'requests with cloud-native microservices at AgroCep.',
    ],
  },
  {
    title: 'RAG SYSTEM AT SCALE',
    lines: [
      'Built RAG pipeline handling 500+ queries/day',
      'at sub-2-second latency on AWS Lambda.',
    ],
  },
  {
    title: 'TRIPLE EDUCATED',
    lines: [
      '3 post-secondary credentials: B.Tech Computer',
      'Science, PGD Backend Development, PGD Applied AI.',
    ],
  },
  {
    title: 'FULL STACK SHIPPED',
    lines: [
      'Built and deployed full-stack financial dashboard',
      'with live market data, PostgreSQL, and Docker.',
    ],
  },
  {
    title: 'TEST COVERAGE ADVOCATE',
    lines: [
      'Automated test frameworks across every project —',
      'PyTest, JUnit, Selenium, end-to-end coverage.',
    ],
  },
];

export default function Achievements() {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
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
        <div
          style={{ color: 'var(--color-primary)', marginBottom: 4 }}
        >
          ACHIEVEMENTS.EXE
        </div>
        <div style={{ color: 'var(--color-border)', marginBottom: 16 }}>
          {DIVIDER}
        </div>

        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={a.title}
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 16,
              opacity: 0,
              animation: `fadeIn 300ms ease-out ${i * 80}ms both`,
            }}
          >
            {/* Trophy tag */}
            <span
              style={{
                color: 'var(--color-primary)',
                flexShrink: 0,
                width: '9ch',
              }}
            >
              [TROPHY]
            </span>

            {/* Content */}
            <div>
              <div style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>
                {a.title}
              </div>
              {a.lines.map((line, j) => (
                <div key={j} style={{ color: 'var(--color-text-dim)' }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ color: 'var(--color-border)', marginBottom: 8 }}>
          {DIVIDER}
        </div>
        <div style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>
          [SYSTEM] {ACHIEVEMENTS.length} achievements unlocked.
        </div>
      </div>
    </>
  );
}
