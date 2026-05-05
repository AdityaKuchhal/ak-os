'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { APP_LIST, ASCII_ICONS } from '@/lib/constants/apps';
import About from '@/components/apps/About/About';
import Resume from '@/components/apps/Resume/Resume';

interface StartMenuProps {
  openWindow: (title: string, component: ReactNode) => void;
  onClose: () => void;
}

export default function StartMenu({ openWindow, onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        onCloseRef.current();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAppClick = (label: string) => {
    let title = label;
    let node: ReactNode = (
      <div
        style={{
          padding: '1rem',
          fontFamily: 'var(--font-terminal)',
          color: 'var(--color-text)',
          fontSize: '1.1rem',
        }}
      >
        {label} — coming soon
      </div>
    );

    if (label === 'About') {
      title = 'ABOUT_ME.INFO';
      node = <About />;
    } else if (label === 'Resume') {
      title = 'RESUME.EXE';
      node = <Resume />;
    }

    openWindow(title, node);
    onCloseRef.current();
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        bottom: 40,
        left: 0,
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        minWidth: 220,
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 100,
      }}
    >
      {APP_LIST.map((app) => (
        <button
          key={app.id}
          onMouseDown={() => handleAppClick(app.label)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-terminal)',
            fontSize: '1rem',
            cursor: 'default',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'var(--color-glow)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'transparent';
          }}
        >
          <span
            style={{
              width: 32,
              color: 'var(--color-primary)',
              flexShrink: 0,
              fontFamily: 'var(--font-terminal)',
            }}
          >
            {ASCII_ICONS[app.label] ?? '[?]'}
          </span>
          {app.label}
        </button>
      ))}
    </div>
  );
}
