'use client';

import { useEffect, useRef, useState } from 'react';

const MESSAGES = [
  "It looks like you're building a portfolio. Need help?",
  "Try typing 'neofetch' in the terminal!",
  'Did you know you can change themes in Display Settings?',
  'Have you tried the Snake game yet?',
  "Type 'open about' in the terminal to learn more about Aditya.",
  'Looking for a software developer? You found one!',
  'Try opening multiple windows at once!',
  'The code playground supports any JavaScript. Go wild.',
];

export default function Clippy() {
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setVisible(true), 8000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    timerRef.current = setTimeout(() => {
      setMessageIndex((prev) => {
        let next = Math.floor(Math.random() * MESSAGES.length);
        while (next === prev && MESSAGES.length > 1) {
          next = Math.floor(Math.random() * MESSAGES.length);
        }
        return next;
      });
      setVisible(true);
    }, 60000);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes clippySlideIn {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          animation: 'clippySlideIn 300ms ease-out forwards',
          border: '2px solid var(--color-primary)',
          background: '#0a140a',
          width: 240,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: '#0f1f0f',
            borderBottom: '1px solid var(--color-primary)',
            padding: '4px 8px',
            fontFamily: 'var(--font-terminal)',
            fontSize: '0.85rem',
            color: 'var(--color-primary)',
          }}
        >
          📎 CLIPPY
        </div>

        {/* Content */}
        <div
          style={{
            padding: 12,
            fontFamily: 'var(--font-terminal)',
            fontSize: '0.85rem',
            color: 'var(--color-text)',
            lineHeight: 1.5,
          }}
        >
          <div style={{ marginBottom: 10 }}>{MESSAGES[messageIndex]}</div>
          <button
            onClick={handleDismiss}
            style={{
              fontFamily: 'var(--font-terminal)',
              fontSize: '11px',
              color: 'var(--color-text-dim)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              padding: '2px 8px',
              cursor: 'pointer',
              display: 'block',
              marginLeft: 'auto',
              marginTop: '8px',
            }}
          >
            Go Away
          </button>
        </div>
      </div>
    </>
  );
}
