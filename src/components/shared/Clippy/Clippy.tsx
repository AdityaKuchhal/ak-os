'use client';

import { useEffect, useRef, useState } from 'react';

const MESSAGES = [
  "It looks like you're building a portfolio. Need help? 🤔",
  "Psst... there's a Snake game hidden in here! 🐍",
  'Looking for a software developer? You found one! 🏅',
  "Try typing 'help' in the Terminal. Go on. 👀",
  'Open to opportunities. Just saying. 💼',
  'The Matrix theme was a great choice. Very hacker. 🟩',
  "You've been here a while. Impressed yet? 😏",
  'Aditya built this whole OS from scratch. No big deal. 🛠️',
];

export default function Clippy() {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setVisible(true), 8000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleNextTip = () => {
    setCurrentMessage((prev) => (prev + 1) % MESSAGES.length);
  };

  const dismiss = () => {
    setVisible(false);
    timerRef.current = setTimeout(() => {
      setCurrentMessage((prev) => {
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
    <div
      style={{
        position: 'fixed',
        bottom: 80,
        right: 20,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        animation: 'bootUp 0.3s ease-out forwards',
        border: '2px solid var(--color-primary)',
        background: '#0a140a',
        width: 260,
        boxShadow: 'rgba(0,0,0,0.5) 6px 6px 0px 0px',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: 'rgb(133, 224, 133)',
          color: 'rgb(5, 5, 5)',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          fontFamily: 'var(--font-terminal)',
          fontSize: '14px',
          fontWeight: 'bold',
          borderBottom: '2px solid rgb(133, 224, 133)',
        }}
      >
        CLIPPY
      </div>

      {/* Message body */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          padding: '12px',
        }}
      >
        <span style={{ fontSize: '24px', flexShrink: 0 }}>📎</span>
        <p
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '14px',
            color: 'var(--color-primary)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {MESSAGES[currentMessage]}
        </p>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
          padding: '0 12px 12px',
        }}
      >
        <button
          onClick={handleNextTip}
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '12px',
            color: 'var(--color-primary)',
            background: 'transparent',
            border: '1px solid var(--color-primary)',
            padding: '3px 10px',
            cursor: 'pointer',
          }}
        >
          Next Tip
        </button>
        <button
          onClick={dismiss}
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '12px',
            color: 'var(--color-primary)',
            background: 'transparent',
            border: '1px solid var(--color-primary)',
            padding: '3px 10px',
            cursor: 'pointer',
          }}
        >
          Go Away
        </button>
      </div>
    </div>
  );
}
