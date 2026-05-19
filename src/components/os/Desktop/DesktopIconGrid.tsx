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
import FileManager from '@/components/apps/FileManager/FileManager';
import Playground from '@/components/apps/Playground/Playground';
import DisplaySettings from '@/components/apps/DisplaySettings/DisplaySettings';
import Snake from '@/components/apps/Snake/Snake';
import Tetris from '@/components/apps/Tetris/Tetris';

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
    } else if (label === 'Files') {
      title = 'FILE_MANAGER.EXE';
      node = <FileManager openWindow={openWindow} />;
    } else if (label === 'Code') {
      title = 'CODE_PLAYGROUND.JS';
      node = <Playground />;
    } else if (label === 'Display') {
      title = 'DISPLAY_SETTINGS.CFG';
      node = <DisplaySettings />;
    } else if (label === 'Snake') {
      title = 'SNAKE.EXE';
      node = <Snake />;
    } else if (label === 'Tetris') {
      title = 'TETRIS.EXE';
      node = <Tetris />;
    }

    openWindow(title, node);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '8px',
          top: '8px',
          bottom: '48px',
          zIndex: 20,
          display: 'grid',
          gridTemplateColumns: '80px 80px',
          gridAutoRows: 'min-content',
          gap: '4px',
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '168px',
          alignContent: 'start',
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
