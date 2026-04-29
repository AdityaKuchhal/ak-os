'use client';

import { useState } from 'react';
import BootSequence from '@/components/os/Boot/BootSequence';
import WelcomeScreen from '@/components/os/Boot/WelcomeScreen';
import Desktop from '@/components/os/Desktop/Desktop';

type AppState = 'boot' | 'welcome' | 'desktop';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('boot');

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
