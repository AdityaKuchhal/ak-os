import { OWNER } from '@/lib/constants/os';

export default function StatusBadges() {
  const badgeBase: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 10px',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: '#ffffff',
    borderRadius: 0,
    textDecoration: 'none',
    lineHeight: 1.4,
    whiteSpace: 'nowrap' as const,
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '8px',
        right: '12px',
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        zIndex: 50,
      }}
    >
      <a
        href={`https://${OWNER.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        className="glow-subtle"
        style={{ ...badgeBase, backgroundColor: '#0077b5' }}
      >
        in LinkedIn
      </a>
      <a
        href="https://github.com/AdityaKuchhal"
        target="_blank"
        rel="noopener noreferrer"
        className="glow-subtle"
        style={{ ...badgeBase, backgroundColor: '#333333' }}
      >
        gh GitHub
      </a>
      <a
        href="mailto:adityaakuchal@gmail.com"
        className="glow-subtle"
        style={{ ...badgeBase, backgroundColor: '#116633' }}
      >
        ✉ Contact
      </a>
    </div>
  );
}
