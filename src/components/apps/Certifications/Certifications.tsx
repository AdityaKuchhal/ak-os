'use client';

const DIVIDER = '═'.repeat(35);

const CERTS = [
  { name: 'IBM Python for Data Science',            issuer: 'IBM',      platform: 'Coursera' },
  { name: 'Data Analysis with R Programming',       issuer: 'Google',   platform: 'Coursera' },
  { name: 'Data Warehousing and Business Intelligence', issuer: 'Coursera', platform: 'Coursera' },
  { name: 'Text Mining and Analytics',              issuer: 'Coursera', platform: 'Coursera' },
  { name: 'The Python Mega Course',                 issuer: 'Udemy',    platform: 'Udemy'    },
] as const;

const CERT_DELAYS = CERTS.map((_, i) => i * 80);

export default function Certifications() {
  return (
    <>
      <style>{`
        @keyframes certFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
      <div
        style={{
          fontFamily: 'var(--font-terminal)',
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          padding: 16,
          overflowY: 'auto',
          fontSize: '1rem',
          lineHeight: 1.7,
        }}
      >
        <div style={{ marginBottom: 4 }}>CERTS.LOG</div>
        <div style={{ color: 'var(--color-border)', marginBottom: 16 }}>{DIVIDER}</div>

        {CERTS.map((cert, i) => (
          <div
            key={cert.name}
            style={{
              marginBottom: 16,
              opacity: 0,
              animation: 'certFadeIn 400ms ease-out forwards',
              animationDelay: `${CERT_DELAYS[i] ?? 0}ms`,
            }}
          >
            <div>
              <span style={{ color: 'var(--color-primary)' }}>[CERT]</span>{' '}
              <span style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>
                {cert.name}
              </span>
            </div>
            <div style={{ paddingLeft: '7ch' }}>
              <span style={{ color: 'var(--color-text-dim)' }}>Issuer:{'     '}</span>
              <span style={{ color: 'var(--color-text)' }}>{cert.issuer}</span>
            </div>
            <div style={{ paddingLeft: '7ch' }}>
              <span style={{ color: 'var(--color-text-dim)' }}>Platform:{'   '}</span>
              <span style={{ color: 'var(--color-text)' }}>{cert.platform}</span>
            </div>
            <div style={{ paddingLeft: '7ch' }}>
              <span style={{ color: 'var(--color-text-dim)' }}>Status:{'     '}</span>
              <span style={{ color: '#00aa44' }}>●</span>
              <span style={{ color: 'var(--color-text)' }}> Verified</span>
            </div>
          </div>
        ))}

        <div style={{ color: 'var(--color-border)', marginBottom: 8 }}>{DIVIDER}</div>
        <div style={{ color: 'var(--color-text-dim)' }}>
          [SYSTEM] {CERTS.length} certifications on record.
        </div>
      </div>
    </>
  );
}
