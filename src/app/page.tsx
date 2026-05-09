'use client';

import { useEffect, useState } from 'react';
import BootSequence from '@/components/os/Boot/BootSequence';
import WelcomeScreen from '@/components/os/Boot/WelcomeScreen';
import Desktop from '@/components/os/Desktop/Desktop';

type AppState = 'boot' | 'welcome' | 'desktop';

export default function Home() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [appState, setAppState] = useState<AppState>('boot');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#0d0d0d',
          color: '#00ff41',
          fontFamily: 'monospace',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>AK-OS v1.0</div>
        <div style={{ fontSize: '1rem', marginBottom: '24px', color: '#008f11' }}>
          SYSTEM ERROR: Display resolution too low
        </div>
        <div
          style={{ fontSize: '0.9rem', maxWidth: '300px', lineHeight: 1.6 }}
        >
          AK-OS requires a desktop browser.<br />
          Please visit adityakuchhal.com on a laptop or desktop for the full
          experience.
        </div>
        <div style={{ marginTop: '32px', fontSize: '0.8rem', color: '#008f11' }}>
          [ adityakuchhal.com ]
        </div>
      </div>
    );
  }

  if (appState === 'boot') {
    return (
      <BootSequence onComplete={() => setAppState('welcome')} />
    );
  }

  if (appState === 'welcome') {
    return (
      <WelcomeScreen onEnter={() => setAppState('desktop')} />
    );
  }

  return <Desktop />;
}
