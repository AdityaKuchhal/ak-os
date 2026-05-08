'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { APP_LIST } from '@/lib/constants/apps';
import DesktopIcon from '@/components/os/DesktopIcon/DesktopIcon';
import About from '@/components/apps/About/About';
import Resume from '@/components/apps/Resume/Resume';
import Projects from '@/components/apps/Projects/Projects';
import Experience from '@/components/apps/Experience/Experience';
import TechStack from '@/components/apps/TechStack/TechStack';
import Terminal from '@/components/apps/Terminal/Terminal';
import SkillsRadar from '@/components/apps/Skills/SkillsRadar';
import Timeline from '@/components/apps/Timeline/Timeline';
import Achievements from '@/components/apps/Achievements/Achievements';

interface DesktopIconGridProps {
  openWindow: (title: string, component: ReactNode) => void;
}

export default function DesktopIconGrid({ openWindow }: DesktopIconGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpen = (label: string) => {
    let title = label;
    let node: ReactNode = (
      <div
        style={{
          padding: '1rem',
          fontFamily: 'var(--font-terminal)',
          color: 'var(--color-text)',
          fontSize: '1.1rem',
        }}
      >
        {label} — coming soon
      </div>
    );

    if (label === 'About') {
      title = 'ABOUT_ME.INFO';
      node = <About />;
    } else if (label === 'Resume') {
      title = 'RESUME.EXE';
      node = <Resume />;
    } else if (label === 'Projects') {
      title = 'PROJECTS.EXE';
      node = <Projects />;
    } else if (label === 'Logs') {
      title = 'SYSTEM_LOGS.TXT';
      node = <Experience />;
    } else if (label === 'Skills') {
      title = 'TECH_STACK.CFG';
      node = <TechStack />;
    } else if (label === 'Terminal') {
      title = 'TERMINAL_V1.0.EXE';
      node = <Terminal openWindow={openWindow} />;
    } else if (label === 'Radar') {
      title = 'SKILLS_RADAR.EXE';
      node = <SkillsRadar />;
    } else if (label === 'Timeline') {
      title = 'TIMELINE.EXE';
      node = <Timeline />;
    } else if (label === 'Awards') {
      title = 'ACHIEVEMENTS.EXE';
      node = <Achievements />;
    }

    openWindow(title, node);
  };

  return (
    <>
      <style>{`
        .ak-icon-grid::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="ak-icon-grid"
        style={{
          position: 'absolute',
          left: 8,
          top: 8,
          bottom: 48,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: 84,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          padding: 4,
        }}
      >
        {APP_LIST.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            isSelected={selectedId === app.id}
            onSelect={() => setSelectedId(app.id)}
            onOpen={() => handleOpen(app.label)}
          />
        ))}
      </div>
    </>
  );
}
