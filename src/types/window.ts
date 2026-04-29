import type { ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  component: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}
