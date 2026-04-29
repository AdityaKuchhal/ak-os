'use client';

import { useEffect, useRef, useState } from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

function formatTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [clock, setClock] = useState(() => formatTime(new Date()));
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onEnterRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <style>{`
        @keyframes scanlines {
          from { background-position: 0 0; }
          to   { background-position: 0 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
      <div
        onClick={onEnter}
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-terminal)',
          cursor: 'default',
          userSelect: 'none',
          zIndex: 40,
        }}
      >
        {/* Top — title */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '3rem',
              color: 'var(--color-primary)',
              lineHeight: 1.1,
            }}
          >
            AK-OS v1.0
          </div>
          <div
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-text-dim)',
              letterSpacing: '0.15em',
              marginTop: '0.25rem',
            }}
          >
            SOFTWARE DEVELOPER PORTFOLIO
          </div>
        </div>

        {/* Middle — avatar, greeting, clock */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              border: '2px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              color: 'var(--color-primary)',
            }}
          >
            AK
          </div>
          <div style={{ fontSize: '1.4rem', color: 'var(--color-text)' }}>
            Welcome, Aditya Kuchhal
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              color: 'var(--color-primary)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.05em',
            }}
          >
            {clock}
          </div>
        </div>

        {/* Bottom — enter prompt */}
        <div
          style={{
            fontSize: '1.1rem',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '2px',
          }}
        >
          [ PRESS ENTER OR CLICK TO CONTINUE ]
          <span
            aria-hidden="true"
            style={{ animation: 'blink 1s step-end infinite' }}
          >
            _
          </span>
        </div>

        {/* CRT scan-line overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
            pointerEvents: 'none',
            animation: 'scanlines 8s linear infinite',
            zIndex: 50,
          }}
        />
      </div>
    </>
  );
}
