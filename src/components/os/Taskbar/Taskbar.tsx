'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import StartMenu from '@/components/os/StartMenu/StartMenu';
import type { WindowState } from '@/types/window';

interface TaskbarProps {
  windows: WindowState[];
  onFocusWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  openWindow: (title: string, component: ReactNode) => void;
}

function formatTime(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export default function Taskbar({
  windows,
  onFocusWindow,
  onMinimizeWindow,
  openWindow,
}: TaskbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setClock(formatTime(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  const btnBase: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-terminal)',
    fontSize: '0.9rem',
    cursor: 'default',
    padding: '2px 8px',
    borderRadius: 0,
    whiteSpace: 'nowrap' as const,
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        zIndex: 30,
        backgroundColor: '#0a140a',
        borderTop: '1px solid var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        fontFamily: 'var(--font-terminal)',
      }}
    >
      {/* Left: START button + menu */}
      <div style={{ position: 'relative' }}>
        <button
          onMouseDown={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          style={{
            ...btnBase,
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
          }}
        >
          <span style={{ fontSize: '0.75em', marginRight: 2 }}>≡</span>
          {' START'}
        </button>
        {menuOpen && (
          <StartMenu
            openWindow={openWindow}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>

      {/* Center: open window labels */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          flex: 1,
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0 8px',
        }}
      >
        {windows.map((w) => (
          <button
            key={w.id}
            onClick={() => {
              if (w.isMinimized) onMinimizeWindow(w.id);
              onFocusWindow(w.id);
            }}
            style={{
              ...btnBase,
              maxWidth: 140,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: w.isMinimized ? 0.5 : 1,
            }}
          >
            {w.title}
          </button>
        ))}
      </div>

      {/* Right: live clock */}
      <div
        style={{
          color: 'var(--color-primary)',
          fontSize: '0.9rem',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}
      >
        {clock}
      </div>
    </div>
  );
}
