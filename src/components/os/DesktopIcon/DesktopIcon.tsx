'use client';

import { useRef } from 'react';
import type { AppEntry } from '@/lib/constants/apps';
import { ASCII_ICONS } from '@/lib/constants/apps';

interface DesktopIconProps {
  app: AppEntry;
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
      lastClickRef.current = 0;
      onOpen();
    } else {
      lastClickRef.current = now;
      onSelect();
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 72,
        height: 72,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        cursor: 'default',
        flexShrink: 0,
        backgroundColor: isSelected ? 'var(--color-glow)' : 'transparent',
        border: isSelected
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-terminal)',
          fontSize: '1.1rem',
          color: 'var(--color-primary)',
          lineHeight: 1,
        }}
      >
        {ASCII_ICONS[app.label] ?? '[?]'}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-terminal)',
          fontSize: '0.7rem',
          color: 'var(--color-text)',
          textAlign: 'center',
          lineHeight: 1.2,
          wordBreak: 'break-word',
          maxWidth: 68,
        }}
      >
        {app.label}
      </span>
    </div>
  );
}
