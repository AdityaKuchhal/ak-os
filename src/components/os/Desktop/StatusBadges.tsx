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
        top: 12,
        left: 96,
        zIndex: 9999,
        display: 'flex',
        gap: 8,
      }}
    >
      <span style={{ ...badgeBase, backgroundColor: '#00aa44' }}>
        ● Available for opportunities
      </span>
      <a
        href={`https://${OWNER.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...badgeBase, backgroundColor: '#0077b5' }}
      >
        in LinkedIn
      </a>
    </div>
  );
}
