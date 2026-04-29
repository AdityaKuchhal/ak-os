import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import type { WindowState } from '@/types/window';

let zCounter = 1000;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = useCallback((title: string, component: ReactNode) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const x = vw * 0.52 + Math.random() * 80;
    const y = 60 + Math.random() * 60;

    setWindows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        component,
        x,
        y,
        width: 600,
        height: 480,
        isMinimized: false,
        isMaximized: false,
        zIndex: ++zCounter,
      },
    ]);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter } : w))
    );
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
  };
}
