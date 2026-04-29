export interface AppEntry {
  id: string;
  label: string;
  component: string;
}

export const APP_LIST: AppEntry[] = [
  { id: 'terminal', label: 'Terminal', component: 'Terminal' },
  { id: 'files', label: 'Files', component: 'FileManager' },
  { id: 'projects', label: 'Projects', component: 'Projects' },
  { id: 'logs', label: 'Logs', component: 'Experience' },
  { id: 'about', label: 'About', component: 'About' },
  { id: 'skills', label: 'Skills', component: 'Skills' },
  { id: 'radar', label: 'Radar', component: 'TechStack' },
  { id: 'awards', label: 'Awards', component: 'Achievements' },
  { id: 'resume', label: 'Resume', component: 'Resume' },
  { id: 'code', label: 'Code', component: 'Playground' },
  { id: 'display', label: 'Display', component: 'DisplaySettings' },
  { id: 'tetris', label: 'Tetris', component: 'Tetris' },
  { id: 'snake', label: 'Snake', component: 'Snake' },
  { id: 'timeline', label: 'Timeline', component: 'Timeline' },
];
