'use client';

import { useState } from 'react';

const STARTER = `// AK-OS Code Playground
// Write JavaScript and click RUN

function greet(name) {
  return \`Hello, \${name}! Welcome to AK-OS.\`;
}

console.log(greet('Aditya'));
console.log('Current time:', new Date().toLocaleTimeString());`;

export default function Playground() {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState<string[]>([]);

  const run = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Capture all console output during execution
    console.warn = console.error = console.log = (...args) => {
      logs.push(args.map(String).join(' '));
    };

    try {
      new Function(code)();
    } catch (err) {
      setOutput([`[ERROR] ${String(err)}`]);
      return;
    } finally {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    }

    setOutput(logs);
  };

  const textareaStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    borderRadius: 0,
    padding: 8,
    minHeight: 200,
    resize: 'vertical',
    width: '100%',
    fontFamily: 'var(--font-terminal)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const outputStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 0,
    padding: 8,
    minHeight: 120,
    fontFamily: 'var(--font-terminal)',
    fontSize: '0.9rem',
    lineHeight: 1.6,
  };

  return (
    <div
      style={{
        fontFamily: 'var(--font-terminal)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={textareaStyle}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      <div>
        <button
          onClick={run}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg)',
            fontFamily: 'var(--font-terminal)',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 0,
            padding: '6px 16px',
            cursor: 'pointer',
          }}
        >
          [ RUN ]
        </button>
      </div>

      <div style={outputStyle}>
        {output.length === 0 ? (
          <span style={{ color: 'var(--color-text-dim)' }}>
            Output will appear here...
          </span>
        ) : (
          output.map((line, i) => {
            const isError = line.startsWith('[ERROR]');
            return (
              <div
                key={i}
                style={{ color: isError ? '#ff4444' : 'var(--color-text)' }}
              >
                {isError ? line : `> ${line}`}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
