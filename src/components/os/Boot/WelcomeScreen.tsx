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
          padding: '56px 48px',
          width: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <svg
          viewBox="0 0 340 70"
          width="340"
          height="70"
          style={{ marginBottom: '8px', overflow: 'visible' }}
        >
          <text
            x="50%"
            y="58"
            textAnchor="middle"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1"
            style={{
              fontFamily: 'var(--font-terminal)',
              fontSize: '62px',
              fontWeight: 'bold',
              letterSpacing: '10px',
            }}
          >
            ADITYA
          </text>
        </svg>

        <p
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '12px',
            color: 'var(--color-primary)',
            letterSpacing: '1px',
            margin: '0 0 6px 0',
            textAlign: 'center',
          }}
        >
          Welcome to AK-OS v1.0
        </p>

        <p
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '10px',
            color: 'var(--color-text-dim)',
            letterSpacing: '2px',
            margin: '0 0 40px 0',
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
