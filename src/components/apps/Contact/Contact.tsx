'use client';

import { useState } from 'react';

const DIVIDER = '═'.repeat(35);

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setStatusMsg('All fields are required.');
      return;
    }

    setStatus('sending');
    setStatusMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setStatusMsg('Message sent. I will get back to you soon.');
    } catch {
      setStatus('error');
      setStatusMsg(
        'Failed to send. Please email directly: adityaakuchal@gmail.com'
      );
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-terminal)',
    fontSize: '0.95rem',
    padding: '4px 8px',
    borderRadius: 0,
    outline: 'none',
    flex: 1,
  };

  return (
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
      <div style={{ marginBottom: 4 }}>CONTACT.EXE</div>
      <div style={{ color: 'var(--color-border)', marginBottom: 16 }}>
        {DIVIDER}
      </div>

      {/* Name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{ color: 'var(--color-text-dim)', width: '10ch', flexShrink: 0 }}
        >
          NAME:
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Email */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{ color: 'var(--color-text-dim)', width: '10ch', flexShrink: 0 }}
        >
          EMAIL:
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Message */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            color: 'var(--color-text-dim)',
            width: '10ch',
            flexShrink: 0,
            paddingTop: 4,
          }}
        >
          MESSAGE:
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            ...inputStyle,
            minHeight: 80,
            resize: 'vertical',
            lineHeight: 1.5,
          }}
          spellCheck={false}
        />
      </div>

      {/* Submit */}
      <div style={{ paddingLeft: 'calc(10ch + 8px)', marginBottom: 12 }}>
        <button
          onClick={handleSubmit}
          disabled={status === 'sending'}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg)',
            fontFamily: 'var(--font-terminal)',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 0,
            padding: '8px 16px',
            cursor: status === 'sending' ? 'default' : 'pointer',
            opacity: status === 'sending' ? 0.7 : 1,
          }}
        >
          [ SEND MESSAGE ]
        </button>
      </div>

      {/* Status line */}
      {status === 'sending' && (
        <div style={{ color: 'var(--color-text)' }}>[SENDING...]</div>
      )}
      {status === 'success' && (
        <div style={{ color: '#00aa44' }}>[OK] {statusMsg}</div>
      )}
      {status === 'error' && (
        <div style={{ color: '#ff4444' }}>[ERROR] {statusMsg}</div>
      )}
    </div>
  );
}
