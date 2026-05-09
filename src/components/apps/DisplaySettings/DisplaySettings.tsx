'use client';

import { useState } from 'react';
import {
  THEMES,
  THEME_STORAGE_KEY,
  WALLPAPER_STORAGE_KEY,
  BOOT_STORAGE_KEY,
  DEFAULT_THEME,
} from '@/lib/constants/theme';

const DIVIDER = '═'.repeat(35);

interface ThemeOption {
  id: string;
  label: string;
  desc: string;
}

interface WallpaperOption {
  id: string;
  label: string;
  desc: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'phosphor', label: 'Green Phosphor', desc: 'classic CRT green on black' },
  { id: 'amber', label: 'Amber', desc: 'warm vintage monitor' },
  { id: 'white', label: 'White', desc: 'high contrast' },
  { id: 'matrix', label: 'Matrix', desc: 'cascading green (DEFAULT)' },
];

const WALLPAPER_OPTIONS: WallpaperOption[] = [
  { id: 'matrix-rain', label: 'Matrix Rain', desc: 'falling katakana characters' },
  { id: 'starfield', label: 'Starfield', desc: 'warp-speed star streaks' },
  { id: 'retro-grid', label: 'Retro Grid', desc: 'synthwave perspective grid' },
  { id: 'pixel-clouds', label: 'Pixel Clouds', desc: 'drifting pixel clouds' },
  { id: 'cyber-rain', label: 'Cyber Rain', desc: 'neon blue/purple rain' },
  { id: 'binary', label: 'Binary', desc: 'falling 0s and 1s (DEFAULT)' },
  { id: 'geometry', label: 'Geometry', desc: 'floating wireframe shapes' },
  { id: 'solid-color', label: 'Solid Color', desc: 'flat dark navy, no animation' },
  { id: 'none', label: 'None', desc: 'bare desktop' },
];

export default function DisplaySettings() {
  const [theme, setTheme] = useState<string>(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME)
      : DEFAULT_THEME
  );
  const [wallpaper, setWallpaper] = useState<string>(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem(WALLPAPER_STORAGE_KEY) ?? 'binary')
      : 'binary'
  );
  const [bootMode, setBootMode] = useState<string>(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem(BOOT_STORAGE_KEY) ?? 'full')
      : 'full'
  );

  const selectTheme = (t: string) => {
    if (!(THEMES as readonly string[]).includes(t)) return;
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(THEME_STORAGE_KEY, t);
  };

  const selectWallpaper = (w: string) => {
    setWallpaper(w);
    window.dispatchEvent(
      new CustomEvent('ak-os-wallpaper-change', { detail: { wallpaper: w } })
    );
    localStorage.setItem(WALLPAPER_STORAGE_KEY, w);
  };

  const selectBootMode = (mode: string) => {
    setBootMode(mode);
    localStorage.setItem(BOOT_STORAGE_KEY, mode);
  };

  const resetBoot = () => {
    localStorage.removeItem(BOOT_STORAGE_KEY);
    window.location.reload();
  };

  const base: React.CSSProperties = {
    fontFamily: 'var(--font-terminal)',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    padding: 16,
    fontSize: '1rem',
    lineHeight: 1.7,
  };

  return (
    <>
      <style>{`
        .ds-option { cursor: pointer; }
        .ds-option:hover { color: var(--color-primary); }
      `}</style>

      <div style={base}>
        <div style={{ marginBottom: 4 }}>DISPLAY_SETTINGS.CFG</div>
        <div style={{ color: 'var(--color-border)', marginBottom: 16 }}>
          {DIVIDER}
        </div>

        {/* ── SECTION 1: THEME ─────────────────── */}
        <div
          style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: 8 }}
        >
          [THEME]
        </div>
        {THEME_OPTIONS.map((opt) => {
          const selected = theme === opt.id;
          return (
            <div
              key={opt.id}
              className="ds-option"
              onClick={() => selectTheme(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                paddingLeft: 4,
                marginBottom: 2,
              }}
            >
              <span style={{ color: 'var(--color-primary)', width: '1ch', flexShrink: 0 }}>
                {selected ? '●' : '○'}
              </span>
              <span style={{ width: '16ch', flexShrink: 0 }}>{opt.label}</span>
              <span style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem' }}>
                {opt.desc}
              </span>
            </div>
          );
        })}

        <div
          style={{ color: 'var(--color-border)', margin: '16px 0' }}
        >
          {DIVIDER}
        </div>

        {/* ── SECTION 2: WALLPAPER ─────────────── */}
        <div
          style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: 8 }}
        >
          [WALLPAPER]
        </div>
        {WALLPAPER_OPTIONS.map((opt) => {
          const selected = wallpaper === opt.id;
          return (
            <div
              key={opt.id}
              className="ds-option"
              onClick={() => selectWallpaper(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                paddingLeft: 4,
                marginBottom: 2,
              }}
            >
              <span style={{ color: 'var(--color-primary)', width: '1ch', flexShrink: 0 }}>
                {selected ? '●' : '○'}
              </span>
              <span style={{ width: '16ch', flexShrink: 0 }}>{opt.label}</span>
              <span style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem' }}>
                {opt.desc}
              </span>
            </div>
          );
        })}

        <div
          style={{ color: 'var(--color-border)', margin: '16px 0' }}
        >
          {DIVIDER}
        </div>

        {/* ── SECTION 3: BOOT MODE ─────────────── */}
        <div
          style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: 12 }}
        >
          [BOOT MODE]
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ color: 'var(--color-text-dim)', marginRight: 4 }}>
            BOOT MODE:
          </span>
          {(['full', 'skip'] as const).map((mode) => {
            const active = bootMode === mode;
            return (
              <button
                key={mode}
                onClick={() => selectBootMode(mode)}
                style={{
                  backgroundColor: active ? 'var(--color-primary)' : 'transparent',
                  color: active ? 'var(--color-bg)' : 'var(--color-text)',
                  border: active ? 'none' : '1px solid var(--color-border)',
                  fontFamily: 'var(--font-terminal)',
                  fontSize: '1rem',
                  padding: '4px 12px',
                  borderRadius: 0,
                  cursor: 'pointer',
                }}
              >
                [ {mode.toUpperCase()} ]
              </button>
            );
          })}
        </div>

        <button
          onClick={resetBoot}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--color-text-dim)',
            border: '1px solid var(--color-border)',
            fontFamily: 'var(--font-terminal)',
            fontSize: '0.9rem',
            padding: '4px 12px',
            borderRadius: 0,
            cursor: 'pointer',
          }}
        >
          [ RESET BOOT ]
        </button>
      </div>
    </>
  );
}
