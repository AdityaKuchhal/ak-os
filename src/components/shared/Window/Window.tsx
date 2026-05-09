'use client';

import { useEffect, useRef, useState } from 'react';
import type { WindowState } from '@/types/window';

interface WindowProps {
  win: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
}

interface DragState {
  dragging: boolean;
  startX: number;
  startY: number;
}

interface WindowColors {
  body: string;
  titleBar: string;
}

function getWindowBg(): WindowColors {
  const theme = document.documentElement.getAttribute('data-theme');
  switch (theme) {
    case 'amber':    return { body: '#140e00', titleBar: '#1f1500' };
    case 'phosphor': return { body: '#0a140a', titleBar: '#0f1f0f' };
    case 'white':    return { body: '#111111', titleBar: '#1a1a1a' };
    default:         return { body: '#0a140a', titleBar: '#0f1f0f' };
  }
}

const BTN_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-terminal)',
  fontSize: '11px',
  color: 'var(--color-primary)',
  background: 'transparent',
  border: '1px solid var(--color-primary)',
  width: '20px',
  height: '18px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  lineHeight: 1,
  borderRadius: 0,
};

export default function Window({
  win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowProps) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [colors, setColors] = useState<WindowColors>(() =>
    typeof document === 'undefined'
      ? { body: '#0a140a', titleBar: '#0f1f0f' }
      : getWindowBg()
  );
  const dragRef = useRef<DragState>({ dragging: false, startX: 0, startY: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.dragging) return;
      setPos({
        x: e.clientX - dragRef.current.startX,
        y: e.clientY - dragRef.current.startY,
      });
    };
    const onUp = () => {
      dragRef.current.dragging = false;
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => setColors(getWindowBg()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    e.preventDefault();
    dragRef.current = {
      dragging: true,
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };
    onFocus(win.id);
  };

  const handleFocus = () => onFocus(win.id);

  const sharedStyle: React.CSSProperties = {
    border: '2px solid var(--color-primary)',
    background: colors.body,
    zIndex: win.zIndex,
    display: win.isMinimized ? 'none' : 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto',
  };

  const containerStyle: React.CSSProperties = win.isMaximized
    ? { ...sharedStyle, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }
    : { ...sharedStyle, position: 'absolute', left: pos.x, top: pos.y, width: win.width, height: win.height };

  return (
    <div style={containerStyle} onMouseDown={handleFocus}>
      {/* Title bar */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        style={{
          height: '28px',
          minHeight: '28px',
          background: colors.titleBar,
          borderBottom: '1px solid var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: win.isMaximized ? 'default' : 'grab',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '13px',
            color: 'var(--color-primary)',
            paddingLeft: '8px',
            textTransform: 'uppercase',
          }}
        >
          {win.title}
        </span>
        <div style={{ display: 'flex', gap: '2px', paddingRight: '6px' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
            onMouseDown={(e) => e.stopPropagation()}
            style={BTN_STYLE}
            aria-label="Minimize"
          >
            _
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
            onMouseDown={(e) => e.stopPropagation()}
            style={BTN_STYLE}
            aria-label={win.isMaximized ? 'Restore' : 'Maximize'}
          >
            □
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
            onMouseDown={(e) => e.stopPropagation()}
            style={BTN_STYLE}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window body */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          background: colors.body,
          padding: '8px',
        }}
        onClick={handleFocus}
      >
        {win.component}
      </div>
    </div>
  );
}
