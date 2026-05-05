'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { APP_LIST } from '@/lib/constants/apps';
import DesktopIcon from '@/components/os/DesktopIcon/DesktopIcon';

interface DesktopIconGridProps {
  openWindow: (title: string, component: ReactNode) => void;
}

export default function DesktopIconGrid({ openWindow }: DesktopIconGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpen = (label: string) => {
    openWindow(
      label,
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
  };

  return (
    <>
      <style>{`
        .ak-icon-grid::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="ak-icon-grid"
        style={{
          position: 'absolute',
          left: 8,
          top: 8,
          bottom: 48,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: 84,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          padding: 4,
        }}
      >
        {APP_LIST.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            isSelected={selectedId === app.id}
            onSelect={() => setSelectedId(app.id)}
            onOpen={() => handleOpen(app.label)}
          />
        ))}
      </div>
    </>
  );
}
