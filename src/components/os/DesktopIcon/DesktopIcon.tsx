'use client';

import { useRef, useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        cursor: 'pointer',
        background: isSelected
          ? 'rgba(133, 224, 133, 0.15)'
          : isHovered
          ? 'rgba(133, 224, 133, 0.08)'
          : 'transparent',
        border: isSelected
          ? '1px solid var(--color-primary)'
          : isHovered
          ? '1px dashed var(--color-primary)'
          : '1px dashed transparent',
        userSelect: 'none',
        gap: '4px',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isTextIcon ? '18px' : '30px',
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
          fontSize: '14px',
          color: isSelected ? 'var(--color-primary)' : 'var(--color-text)',
          textAlign: 'center',
          lineHeight: 1.2,
          wordBreak: 'break-word',
          maxWidth: '62px',
        }}
      >
        {app.label}
      </span>
    </div>
  );
}
