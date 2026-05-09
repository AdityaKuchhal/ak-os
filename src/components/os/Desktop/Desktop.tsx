'use client';

import { useEffect, useRef } from 'react';
import { startBinaryWallpaper } from '@/lib/wallpapers/binary';
import { startMatrixRainWallpaper } from '@/lib/wallpapers/matrix-rain';
import { startStarfieldWallpaper } from '@/lib/wallpapers/starfield';
import { startRetroGridWallpaper } from '@/lib/wallpapers/retro-grid';
import { startPixelCloudsWallpaper } from '@/lib/wallpapers/pixel-clouds';
import { startCyberRainWallpaper } from '@/lib/wallpapers/cyber-rain';
import { startGeometryWallpaper } from '@/lib/wallpapers/geometry';
import { startSolidColorWallpaper } from '@/lib/wallpapers/solid-color';
import { startNoneWallpaper } from '@/lib/wallpapers/none';
import { useWindowManager } from '@/lib/hooks/useWindowManager';
import Window from '@/components/shared/Window/Window';
import Taskbar from '@/components/os/Taskbar/Taskbar';
import DesktopIconGrid from '@/components/os/Desktop/DesktopIconGrid';
import StatusBadges from '@/components/os/Desktop/StatusBadges';
import { WALLPAPER_STORAGE_KEY } from '@/lib/constants/theme';

function launchWallpaper(
  name: string,
  canvas: HTMLCanvasElement,
  color: string
): () => void {
  switch (name) {
    case 'matrix-rain':  return startMatrixRainWallpaper(canvas, color);
    case 'starfield':    return startStarfieldWallpaper(canvas, color);
    case 'retro-grid':   return startRetroGridWallpaper(canvas, color);
    case 'pixel-clouds': return startPixelCloudsWallpaper(canvas, color);
    case 'cyber-rain':   return startCyberRainWallpaper(canvas, color);
    case 'geometry':     return startGeometryWallpaper(canvas, color);
    case 'solid-color':  return startSolidColorWallpaper(canvas, color);
    case 'none':         return startNoneWallpaper(canvas, color);
    default:             return startBinaryWallpaper(canvas, color);
  }
}

export default function Desktop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
  } = useWindowManager();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();

    const savedWallpaper =
      localStorage.getItem(WALLPAPER_STORAGE_KEY) ?? 'binary';
    let cleanup = launchWallpaper(savedWallpaper, canvas, getColor());

    const handleWallpaperChange = (e: Event) => {
      const wallpaper = (
        e as CustomEvent<{ wallpaper: string }>
      ).detail.wallpaper;
      cleanup();
      cleanup = launchWallpaper(wallpaper, canvas, getColor());
    };

    window.addEventListener('ak-os-wallpaper-change', handleWallpaperChange);

    return () => {
      cleanup();
      window.removeEventListener(
        'ak-os-wallpaper-change',
        handleWallpaperChange
      );
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes scanlines {
          from { background-position: 0 0; }
          to   { background-position: 0 100%; }
        }
      `}</style>

      <StatusBadges />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-bg)',
          overflow: 'hidden',
        }}
      >
        {/* z-0: Wallpaper canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />

        {/* z-10: CRT scan-line overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
            pointerEvents: 'none',
            animation: 'scanlines 8s linear infinite',
            zIndex: 10,
          }}
        />

        {/* z-20: Desktop icon grid */}
        <DesktopIconGrid openWindow={openWindow} />

        {/* z-30: Taskbar */}
        <Taskbar
          windows={windows}
          onFocusWindow={focusWindow}
          onMinimizeWindow={minimizeWindow}
          openWindow={openWindow}
        />

        {/* z-40: Window layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 40,
            pointerEvents: 'none',
          }}
        >
          {windows
            .filter((w) => !w.isMinimized)
            .map((w) => (
              <Window
                key={w.id}
                win={w}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onMaximize={maximizeWindow}
                onFocus={focusWindow}
              />
            ))}
        </div>
      </div>
    </>
  );
}
