'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import About from '@/components/apps/About/About';
import Resume from '@/components/apps/Resume/Resume';
import Projects from '@/components/apps/Projects/Projects';
import Experience from '@/components/apps/Experience/Experience';
import TechStack from '@/components/apps/TechStack/TechStack';
import Contact from '@/components/apps/Contact/Contact';
import Certifications from '@/components/apps/Certifications/Certifications';
import { skillCategories } from '@/data/skills';
import { OWNER, OS_NAME, OS_VERSION } from '@/lib/constants/os';

export interface TerminalProps {
  openWindow: (title: string, component: ReactNode) => void;
}

interface HistoryEntry {
  command: string;
  output: string[];
}

const PROMPT = 'root@ak-os:~$';

const FORTUNES = [
  '"First, solve the problem. Then, write the code."',
  '"Code is like humor. When you have to explain it, it\'s bad."',
  '"Make it work, make it right, make it fast."',
  '"The best code is no code at all."',
  '"Simplicity is the soul of efficiency."',
];

function getHelp(): string[] {
  return [
    'Available commands:',
    '  help      — show this help message',
    '  whoami    — display user identity',
    '  neofetch  — display system info',
    '  ls        — list all apps',
    '  cat       — read a file (usage: cat FILENAME)',
    '  open      — launch an app (usage: open APPNAME)',
    '  clear     — clear terminal output',
    '  cowsay    — ASCII cow with a message',
    '  fortune   — random developer quote',
    '  coffee    — ASCII art coffee cup',
  ];
}

function getWhoami(): string[] {
  return [
    `Name:     ${OWNER.name}`,
    `Role:     ${OWNER.role}`,
    `Location: ${OWNER.location}`,
    `Email:    ${OWNER.email}`,
    'Status:   Available for opportunities',
  ];
}

function getNeofetch(): string[] {
  return [
    "        .:'          root@ak-os",
    "    __ :'__          ----------",
    ` .'${'`'}  ${'`'}-'  ${'`'}${'`'}.      OS:     ${OS_NAME} ${OS_VERSION}`,
    ":          .-'       Host:   adityakuchhal.com",
    ':         :          Kernel: Next.js 15 + React 19',
    ' :         `-;       Shell:  TypeScript 5',
    "  `.__.-.__.'        Lang:   Python · Java · TypeScript",
    '                     Tools:  FastAPI · PyTest · Docker',
    '                     Cloud:  AWS · GitHub Actions',
    '                     DB:     PostgreSQL · MongoDB',
    '                     AI:     LangChain · OpenAI · Pinecone',
    '                     Uptime: Available for opportunities',
  ];
}

function getLs(): string[] {
  return [
    'TERMINAL_V1.0.EXE   ABOUT_ME.INFO       RESUME.EXE',
    'PROJECTS.EXE        SYSTEM_LOGS.TXT     TECH_STACK.CFG',
    'SKILLS_RADAR.EXE    CERTS.LOG           TIMELINE.EXE',
    'ACHIEVEMENTS.EXE    FILE_MANAGER.EXE    PLAYGROUND.JS',
    'DISPLAY_SETTINGS.CFG  SNAKE.EXE         TETRIS.EXE',
  ];
}

function getCat(arg: string): string[] {
  const upper = arg.trim().toUpperCase();
  if (upper === 'ABOUT_ME.INFO') return getWhoami();
  if (upper === 'RESUME.EXE')
    return ["Run 'open resume' to view full resume"];
  if (upper === 'TECH_STACK.CFG') {
    return skillCategories.map(
      (cat) =>
        `${cat.category}: ${cat.skills.map((s) => s.name).join(' · ')}`
    );
  }
  return [`cat: ${arg}: No such file or directory`];
}

function getCowsay(): string[] {
  return [
    ' ______________________',
    '< Keep shipping. >',
    ' ----------------------',
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
  ];
}

function getFortune(): string[] {
  return [FORTUNES[Math.floor(Math.random() * FORTUNES.length)] ?? FORTUNES[0]];
}

function getCoffee(): string[] {
  return [
    '    ( (',
    '     ) )',
    '  ........',
    '  |      |]',
    '  \\      /',
    "   `----'",
    '  ☕ Brewing...',
  ];
}

const WELCOME: HistoryEntry = {
  command: '',
  output: [
    `${OS_NAME} Terminal ${OS_VERSION}`,
    "Type 'help' for available commands.",
    '',
  ],
};

export default function Terminal({ openWindow }: TerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cmdHistoryRef = useRef<string[]>([]);
  const historyIdxRef = useRef(-1);
  const draftRef = useRef('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = () => inputRef.current?.focus();

  const handleCommand = (raw: string) => {
    const trimmed = raw.trim();
    const parts = trimmed.split(/\s+/);
    const cmd = (parts[0] ?? '').toLowerCase();
    const arg = parts.slice(1).join(' ');

    let output: string[] = [];
    let shouldClear = false;

    switch (cmd) {
      case 'help':
        output = getHelp();
        break;
      case 'whoami':
        output = getWhoami();
        break;
      case 'neofetch':
        output = getNeofetch();
        break;
      case 'ls':
        output = getLs();
        break;
      case 'cat':
        output = arg ? getCat(arg) : ['usage: cat FILENAME'];
        break;
      case 'open': {
        if (!arg) {
          output = ['usage: open APPNAME'];
          break;
        }
        switch (arg.toLowerCase()) {
          case 'about':
            openWindow('ABOUT_ME.INFO', <About />);
            output = ['Opening ABOUT_ME.INFO...'];
            break;
          case 'resume':
            openWindow('RESUME.EXE', <Resume />);
            output = ['Opening RESUME.EXE...'];
            break;
          case 'projects':
            openWindow('PROJECTS.EXE', <Projects />);
            output = ['Opening PROJECTS.EXE...'];
            break;
          case 'logs':
            openWindow('SYSTEM_LOGS.TXT', <Experience />);
            output = ['Opening SYSTEM_LOGS.TXT...'];
            break;
          case 'skills':
            openWindow('TECH_STACK.CFG', <TechStack />);
            output = ['Opening TECH_STACK.CFG...'];
            break;
          case 'contact':
            openWindow('CONTACT.EXE', <Contact />);
            output = ['Opening CONTACT.EXE...'];
            break;
          case 'certs':
            openWindow('CERTS.LOG', <Certifications />);
            output = ['Opening CERTS.LOG...'];
            break;
          default:
            output = [`open: command not found: ${arg}`];
        }
        break;
      }
      case 'clear':
        shouldClear = true;
        break;
      case 'cowsay':
        output = getCowsay();
        break;
      case 'fortune':
        output = getFortune();
        break;
      case 'coffee':
        output = getCoffee();
        break;
      case '':
        output = [];
        break;
      default:
        output = [
          `command not found: ${cmd}. Type 'help' for available commands.`,
        ];
    }

    if (trimmed) {
      cmdHistoryRef.current.push(trimmed);
      historyIdxRef.current = -1;
      draftRef.current = '';
    }

    if (shouldClear) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command: trimmed, output }]);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const cmds = cmdHistoryRef.current;
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmds.length === 0) return;
      if (historyIdxRef.current === -1) {
        draftRef.current = input;
        historyIdxRef.current = cmds.length - 1;
      } else if (historyIdxRef.current > 0) {
        historyIdxRef.current--;
      }
      setInput(cmds[historyIdxRef.current] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdxRef.current === -1) return;
      if (historyIdxRef.current < cmds.length - 1) {
        historyIdxRef.current++;
        setInput(cmds[historyIdxRef.current] ?? '');
      } else {
        historyIdxRef.current = -1;
        setInput(draftRef.current);
      }
    }
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
      <div
        onClick={focusInput}
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-terminal)',
          fontSize: '1rem',
          cursor: 'text',
          minHeight: '100%',
          paddingBottom: 36,
          boxSizing: 'border-box',
        }}
      >
        {/* Output history */}
        {history.map((entry, i) => (
          <div key={i}>
            {entry.command && (
              <div>
                <span style={{ color: 'var(--color-primary)' }}>
                  {PROMPT}&nbsp;
                </span>
                <span>{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div key={j} style={{ whiteSpace: 'pre' }}>
                {line === '' ? ' ' : line}
              </div>
            ))}
          </div>
        ))}
        <div ref={bottomRef} />

        {/* Input line — sticky at bottom */}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'var(--color-bg)',
            paddingTop: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              color: 'var(--color-primary)',
              flexShrink: 0,
              marginRight: 4,
            }}
          >
            {PROMPT}
          </span>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <span style={{ whiteSpace: 'pre', pointerEvents: 'none' }}>
              {input}
            </span>
            <span
              style={{
                animation: 'blink 1s step-end infinite',
                pointerEvents: 'none',
              }}
            >
              |
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                historyIdxRef.current = -1;
              }}
              onKeyDown={handleKeyDown}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'transparent',
                caretColor: 'transparent',
                fontFamily: 'var(--font-terminal)',
                fontSize: '1rem',
                padding: 0,
                margin: 0,
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
