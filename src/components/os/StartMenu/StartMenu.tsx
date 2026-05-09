'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { APP_LIST, ASCII_ICONS } from '@/lib/constants/apps';
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

interface StartMenuProps {
  openWindow: (title: string, component: ReactNode) => void;
  onClose: () => void;
}

export default function StartMenu({ openWindow, onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        onCloseRef.current();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAppClick = (label: string) => {
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
    }

    openWindow(title, node);
    onCloseRef.current();
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        bottom: 40,
        left: 0,
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        minWidth: 220,
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 100,
      }}
    >
      {APP_LIST.map((app) => (
        <button
          key={app.id}
          onMouseDown={() => handleAppClick(app.label)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-terminal)',
            fontSize: '1rem',
            cursor: 'default',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'var(--color-glow)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'transparent';
          }}
        >
          <span
            style={{
              width: 32,
              color: 'var(--color-primary)',
              flexShrink: 0,
              fontFamily: 'var(--font-terminal)',
            }}
          >
            {ASCII_ICONS[app.label] ?? '[?]'}
          </span>
          {app.label}
        </button>
      ))}
    </div>
  );
}
