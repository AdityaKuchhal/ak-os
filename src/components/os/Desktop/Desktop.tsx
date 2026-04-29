'use client';

import { useEffect, useRef } from 'react';
import { startBinaryWallpaper } from '@/lib/wallpapers/binary';

export default function Desktop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary')
      .trim();
    return startBinaryWallpaper(canvasRef.current, color);
  }, []);

  return (
    <>
      <style>{`
        @keyframes scanlines {
          from { background-position: 0 0; }
          to   { background-position: 0 100%; }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-bg)',
          overflow: 'hidden',
        }}
      >
        {/* z-0: Binary wallpaper canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />

        {/* z-10: CRT scan-line overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
            pointerEvents: 'none',
            animation: 'scanlines 8s linear infinite',
            zIndex: 10,
          }}
        />

        {/* z-20: Desktop icon grid placeholder */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }} />

        {/* z-30: Taskbar placeholder */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            zIndex: 30,
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
          }}
        />

        {/* z-40: Window layer placeholder */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 40 }} />
      </div>
    </>
  );
}
