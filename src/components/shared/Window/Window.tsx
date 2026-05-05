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

export default function Window({
  win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowProps) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
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

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    e.preventDefault();
    dragRef.current = {
      dragging: true,
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };
    onFocus(win.id);
  };

  const containerStyle: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        inset: 0,
        zIndex: win.zIndex,
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
      }
    : {
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
      };

  return (
    <div
      style={containerStyle}
      onMouseDown={() => onFocus(win.id)}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        style={{
          height: 32,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 8,
          paddingRight: 4,
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          border: '1px solid var(--color-border)',
          fontFamily: 'var(--font-terminal)',
          fontSize: '1rem',
          color: 'var(--color-text)',
          cursor: win.isMaximized ? 'default' : 'move',
          userSelect: 'none',
        }}
      >
        <span>{win.title}</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {/* Minimize */}
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
            style={btnStyle('var(--color-text-dim)')}
            aria-label="Minimize"
          >
            [_]
          </button>
          {/* Maximize */}
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
            style={btnStyle('var(--color-text-dim)')}
            aria-label={win.isMaximized ? 'Restore' : 'Maximize'}
          >
            [□]
          </button>
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
            style={btnStyle('#ff4444')}
            aria-label="Close"
          >
            [X]
          </button>
        </div>
      </div>

      {/* Content body */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'var(--color-bg)',
          padding: 8,
          border: '1px solid var(--color-border)',
          borderTop: 'none',
        }}
      >
        {win.component}
      </div>
    </div>
  );
}

function btnStyle(color: string): React.CSSProperties {
  return {
    width: 32,
    height: 20,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 0,
    color,
    fontFamily: 'var(--font-terminal)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}
