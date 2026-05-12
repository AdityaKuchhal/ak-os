'use client';

import { useEffect, useRef } from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const onEnterRef = useRef(onEnter);
  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onEnterRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: '#000',
        zIndex: 40,
      }}
    >
      <div
        style={{
          border: '2px solid var(--color-primary)',
          padding: '48px 40px',
          width: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '52px',
            fontWeight: 'bold',
            color: 'transparent',
            WebkitTextStroke: '1.5px var(--color-primary)',
            letterSpacing: '8px',
            margin: '0 0 8px 0',
            textAlign: 'center',
          }}
        >
          ADITYA
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '11px',
            color: 'var(--color-text-dim)',
            letterSpacing: '2px',
            margin: '0 0 32px 0',
            textAlign: 'center',
          }}
        >
          SOFTWARE DEVELOPER · AI/ML · OPEN TO OPPORTUNITIES
        </p>

        <button
          onClick={onEnter}
          style={{
            width: '100%',
            fontFamily: 'var(--font-terminal)',
            fontSize: '13px',
            letterSpacing: '2px',
            padding: '12px',
            background: 'var(--color-primary)',
            color: '#000',
            border: '2px solid var(--color-primary)',
            cursor: 'pointer',
            marginBottom: '8px',
            borderRadius: 0,
          }}
        >
          ▶ START PORTFOLIO
        </button>

        <button
          onClick={onEnter}
          style={{
            width: '100%',
            fontFamily: 'var(--font-terminal)',
            fontSize: '13px',
            letterSpacing: '2px',
            padding: '12px',
            background: 'transparent',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
            cursor: 'pointer',
            borderRadius: 0,
          }}
        >
          ✉ CONTACT ADITYA
        </button>
      </div>
    </div>
  );
}
