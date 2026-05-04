'use client';

import { useEffect, useRef, useState } from 'react';
import { BOOT_STORAGE_KEY } from '@/lib/constants/theme';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  'AK-OS v1.0 — BIOS Setup Utility',
  'Copyright (c) 2026 Aditya Kuchhal',
  '',
  'Detecting hardware configuration...',
  'CPU: Software Developer @ 3.6GHz',
  'RAM: 8192MB — Python · Java · TypeScript',
  'GPU: React 19 + Next.js 15 detected',
  'STORAGE: PostgreSQL · MongoDB · Redis',
  'NETWORK: AWS · Docker · GitHub Actions',
  '',
  'Running POST diagnostics...',
  '[ OK ] ML pipeline initialized',
  '[ OK ] REST API layer loaded',
  '[ OK ] CI/CD pipeline connected',
  '[ OK ] Test framework armed',
  '',
  'Loading AK-OS v1.0...',
  'Welcome, Aditya.',
] as const;

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (localStorage.getItem(BOOT_STORAGE_KEY) === 'skip') {
      onCompleteRef.current();
      return;
    }

    const count = BOOT_MESSAGES.length;
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_MESSAGES.forEach((_msg, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * 80));
    });

    timers.push(setTimeout(() => setFading(true), count * 80 + 600));
    timers.push(
      setTimeout(() => onCompleteRef.current(), count * 80 + 600 + 400)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @keyframes scanlines {
          from { background-position: 0 0; }
          to   { background-position: 0 100%; }
        }
        @media (max-width: 640px) {
          .boot-text { font-size: 1rem !important; }
        }
      `}</style>
      <div
        className="boot-text"
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-terminal)',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          padding: '2rem',
          overflow: 'hidden',
          zIndex: 40,
          opacity: fading ? 0 : 1,
          transition: 'opacity 400ms ease',
        }}
      >
        {(BOOT_MESSAGES.slice(0, visibleCount) as readonly string[]).map(
          (line, i) => (
            <div key={i}>{line || ' '}</div>
          )
        )}

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
