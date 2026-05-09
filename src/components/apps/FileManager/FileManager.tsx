'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Projects from '@/components/apps/Projects/Projects';
import Experience from '@/components/apps/Experience/Experience';
import TechStack from '@/components/apps/TechStack/TechStack';

export interface FileManagerProps {
  openWindow: (title: string, component: ReactNode) => void;
}

interface FolderDef {
  id: string;
  label: string;
  files: string[];
}

const DIVIDER = '═'.repeat(35);

const FOLDERS: FolderDef[] = [
  {
    id: 'projects',
    label: 'PROJECTS/',
    files: [
      'Financial_Dashboard.exe',
      'ML_Test_Framework.exe',
      'RAG_QA_System.exe',
      '[5 more coming soon...]',
    ],
  },
  {
    id: 'experience',
    label: 'EXPERIENCE/',
    files: [
      'Kinectrics_2025.log',
      'Genpact_2022.log',
      'AgroCep_2022.log',
    ],
  },
  {
    id: 'skills',
    label: 'SKILLS/',
    files: [
      'Languages.cfg',
      'Frameworks.cfg',
      'Testing.cfg',
      'Cloud_DevOps.cfg',
      'Databases.cfg',
      'AI_ML.cfg',
    ],
  },
];

export default function FileManager({ openWindow }: FileManagerProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleFileClick = (folderId: string) => {
    switch (folderId) {
      case 'projects':
        openWindow('PROJECTS.EXE', <Projects />);
        break;
      case 'experience':
        openWindow('SYSTEM_LOGS.TXT', <Experience />);
        break;
      case 'skills':
        openWindow('TECH_STACK.CFG', <TechStack />);
        break;
    }
  };

  return (
    <>
      <style>{`
        .fm-file { cursor: pointer; }
        .fm-file:hover span:last-child { color: var(--color-primary); }
      `}</style>
      <div
        style={{
          fontFamily: 'var(--font-terminal)',
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          padding: 16,
          fontSize: '1rem',
          lineHeight: 1.7,
        }}
      >
        <div style={{ marginBottom: 4 }}>FILE_MANAGER.EXE</div>
        <div style={{ color: 'var(--color-border)', marginBottom: 16 }}>
          {DIVIDER}
        </div>

        {FOLDERS.map((folder, fi) => {
          const isOpen = openId === folder.id;
          return (
            <div
              key={folder.id}
              style={{ marginBottom: fi < FOLDERS.length - 1 ? 12 : 0 }}
            >
              {/* Folder header */}
              <div
                onClick={() => toggle(folder.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--color-primary)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontWeight: 'bold',
                }}
              >
                <span>{isOpen ? '▼' : '▶'}</span>
                <span>📁 {folder.label}</span>
              </div>

              {/* Animated file list */}
              <div
                style={{
                  maxHeight: isOpen ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 200ms ease',
                }}
              >
                {folder.files.map((file, i) => {
                  const isLast = i === folder.files.length - 1;
                  const treeChar = isLast ? '└──' : '├──';
                  const isPlaceholder = file.startsWith('[');
                  return (
                    <div
                      key={file}
                      className={isPlaceholder ? undefined : 'fm-file'}
                      onClick={
                        isPlaceholder
                          ? undefined
                          : () => handleFileClick(folder.id)
                      }
                      style={{
                        paddingLeft: 20,
                        display: 'flex',
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--color-border)',
                          flexShrink: 0,
                        }}
                      >
                        {treeChar}
                      </span>
                      <span
                        style={{
                          color: isPlaceholder
                            ? 'var(--color-text-dim)'
                            : 'var(--color-text)',
                        }}
                      >
                        {file}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
