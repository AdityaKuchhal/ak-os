'use client';

import { useEffect, useState } from 'react';
import { OS_NAME, OS_VERSION } from '@/lib/constants/os';

const BOOT_LINES = [
  { text: `${OS_NAME} ${OS_VERSION} — BIOS Setup Utility`, bright: false },
  { text: 'Copyright (c) 2026 Aditya Kuchhal', bright: false },
  { text: '', bright: false },
  { text: 'Detecting hardware configuration...', bright: false },
  { text: 'CPU: Software Developer @ 3.6GHz', bright: false },
  { text: 'RAM: 8192MB — Python · Java · TypeScript', bright: false },
  { text: 'GPU: React 19 + Next.js 15 detected', bright: false },
  { text: 'STORAGE: PostgreSQL · MongoDB · Redis', bright: false },
  { text: 'NETWORK: AWS · Docker · GitHub Actions', bright: false },
  { text: '', bright: false },
  { text: 'Loading AK-OS Kernel..............', bright: false },
  { text: 'Running POST diagnostics...', bright: false },
  { text: '[ OK ] Caffeine levels: CRITICAL', bright: true },
  { text: '[ OK ] Imposter syndrome: SUPPRESSED', bright: true },
  { text: '[ OK ] Git commit history: SUSPICIOUSLY CLEAN', bright: true },
  { text: '[ OK ] Open to opportunities: TRUE', bright: true },
  { text: '', bright: false },
  { text: `Loading ${OS_NAME} ${OS_VERSION}...`, bright: false },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= BOOT_LINES.length) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 120);

    const barTimeout = setTimeout(() => setShowBar(true), 200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(barTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-terminal)',
        fontSize: '16px',
        padding: '40px',
      }}
    >
      <div style={{ width: '600px', maxWidth: '90vw' }}>
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              color: line.bright
                ? 'var(--color-primary)'
                : 'var(--color-text-dim)',
              lineHeight: '1.6',
              minHeight: '1.6em',
            }}
          >
            {line.text}
          </div>
        ))}

        {showBar && (
          <div style={{ marginTop: '24px' }}>
            <div
              style={{
                width: '100%',
                height: '12px',
                border: '1px solid var(--color-primary)',
                background: 'transparent',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'var(--color-primary)',
                  transition: 'width 0.04s linear',
                }}
              />
            </div>
            <div
              style={{
                color: 'var(--color-primary)',
                fontSize: '14px',
                textAlign: 'center',
              }}
            >
              LOADING... {progress}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
