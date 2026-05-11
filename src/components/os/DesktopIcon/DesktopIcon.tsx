'use client';

import { useRef } from 'react';
import type { App } from '@/types';

interface DesktopIconProps {
  app: App;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export default function DesktopIcon({
  app,
  isSelected,
  onSelect,
  onOpen,
}: DesktopIconProps) {
  const lastClickRef = useRef(0);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current < 300) {
      onOpen();
    } else {
      onSelect();
    }
    lastClickRef.current = now;
  };

  const isTextIcon = app.icon === '>_' || app.icon === '{}';

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '72px',
        padding: '6px 4px',
        cursor: 'pointer',
        background: isSelected
          ? 'rgba(0, 255, 65, 0.15)'
          : 'rgba(0, 0, 0, 0.4)',
        border: isSelected
          ? '1px solid var(--color-primary)'
          : '1px solid transparent',
        userSelect: 'none',
        gap: '4px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isTextIcon ? '18px' : '32px',
          color: 'var(--color-primary)',
          fontFamily: isTextIcon ? 'var(--font-terminal)' : 'inherit',
          fontWeight: isTextIcon ? 'bold' : 'normal',
          lineHeight: 1,
        }}
      >
        {app.icon}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-terminal)',
          fontSize: '11px',
          color: isSelected ? 'var(--color-primary)' : 'var(--color-text)',
          textAlign: 'center',
          lineHeight: 1.2,
          wordBreak: 'break-word',
          maxWidth: '68px',
        }}
      >
        {app.label}
      </span>
    </div>
  );
}
