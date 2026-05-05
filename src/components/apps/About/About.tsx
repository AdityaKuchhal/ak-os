import { OWNER } from '@/lib/constants/os';

const DIVIDER = '═'.repeat(35);

const label: React.CSSProperties = {
  color: 'var(--color-text-dim)',
  width: '11ch',
  flexShrink: 0,
};

const value: React.CSSProperties = {
  color: 'var(--color-text)',
};

function Row({
  k,
  children,
}: {
  k: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <span style={label}>{k}</span>
      <span style={value}>{children}</span>
    </div>
  );
}

export default function About() {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-terminal)',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    padding: 16,
    fontSize: '1rem',
    lineHeight: 1.7,
  };

  const dividerStyle: React.CSSProperties = {
    color: 'var(--color-border)',
    letterSpacing: 0,
  };

  const linkStyle: React.CSSProperties = {
    color: 'var(--color-primary)',
    textDecoration: 'none',
  };

  return (
    <div style={base}>
      <div style={{ marginBottom: 4 }}>ABOUT_ME.INFO</div>
      <div style={dividerStyle}>{DIVIDER}</div>

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <Row k="NAME:     ">{OWNER.name}</Row>
        <Row k="ROLE:     ">{OWNER.role}</Row>
        <Row k="LOCATION: ">{OWNER.location}</Row>
        <Row k="STATUS:   ">
          <span style={{ color: '#00aa44' }}>●</span>
          {' Available for opportunities'}
        </Row>
      </div>

      <div style={dividerStyle}>{DIVIDER}</div>

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <Row k="EMAIL:    ">
          <a
            href={`mailto:${OWNER.email}`}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {OWNER.email}
          </a>
        </Row>
        <Row k="LINKEDIN: ">
          <a
            href={`https://${OWNER.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {OWNER.linkedin}
          </a>
        </Row>
        <Row k="GITHUB:   ">{OWNER.github}</Row>
      </div>

      <div style={dividerStyle}>{DIVIDER}</div>

      <div style={{ marginTop: 8 }}>
        <div style={{ color: 'var(--color-text-dim)', marginBottom: 4 }}>
          BIO:
        </div>
        <div style={{ color: 'var(--color-text)', lineHeight: 1.7 }}>
          Recent graduate with hands-on experience
          <br />
          building and shipping production systems
          <br />
          in Python, Java, and JavaScript. Background
          <br />
          spans ML pipelines, REST APIs, automated
          <br />
          testing, and CI/CD — with internship
          <br />
          experience at Kinectrics, Genpact, and AgroCep.
        </div>
      </div>
    </div>
  );
}
