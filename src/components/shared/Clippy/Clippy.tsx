'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Try dragging the windows around! Yes, they actually move. 🖱️',
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

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % MESSAGES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '56px',
        right: '12px',
        minWidth: '280px',
        maxWidth: '420px',
        width: 'fit-content',
        border: '2px solid var(--color-primary)',
        boxShadow: 'rgba(0,0,0,0.5) 6px 6px 0px 0px',
        animation: 'bootUp 0.3s ease-out forwards',
        zIndex: 998,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: 'rgb(133, 224, 133)',
          color: 'rgb(5, 5, 5)',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          fontFamily: 'var(--font-terminal)',
          fontSize: '13px',
          fontWeight: 'bold',
          borderBottom: '1px solid rgb(133, 224, 133)',
        }}
      >
        <span>📎 Clippy</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setVisible(false)}
            style={{
              fontFamily: 'var(--font-terminal)',
              fontSize: '12px',
              background: 'transparent',
              border: '1px solid rgb(5,5,5)',
              color: 'rgb(5,5,5)',
              width: '18px',
              height: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            _
          </button>
          <button
            onClick={() => setVisible(false)}
            style={{
              fontFamily: 'var(--font-terminal)',
              fontSize: '12px',
              background: 'transparent',
              border: '1px solid rgb(5,5,5)',
              color: 'rgb(5,5,5)',
              width: '18px',
              height: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            X
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          background: '#000',
          padding: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <span style={{ fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>
            📎
          </span>
          <p
            style={{
              fontFamily: 'var(--font-terminal)',
              fontSize: '13px',
              color: 'var(--color-primary)',
              margin: 0,
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
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
          }}
        >
          <button
            onClick={() =>
              setCurrentMessage((prev) => (prev + 1) % MESSAGES.length)
            }
            className="glow-bright"
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
            onClick={() => setVisible(false)}
            style={{
              fontFamily: 'var(--font-terminal)',
              fontSize: '12px',
              color: 'var(--color-text-dim)',
              background: 'transparent',
              border: '1px solid var(--color-text-dim)',
              padding: '3px 10px',
              cursor: 'pointer',
              opacity: 0.5,
            }}
          >
            Go Away
          </button>
        </div>
      </div>
    </div>
  );
}
