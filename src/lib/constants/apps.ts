export const APP_LIST = [
  { id: 'terminal', label: 'Terminal', icon: '>_',  windowTitle: 'TERMINAL_V1.0.EXE'     },
  { id: 'files',    label: 'Files',    icon: '📁',  windowTitle: 'FILE_MANAGER.EXE'       },
  { id: 'projects', label: 'Projects', icon: '🗂️', windowTitle: 'PROJECTS.EXE'           },
  { id: 'logs',     label: 'Logs',     icon: '📋',  windowTitle: 'SYSTEM_LOGS.TXT'        },
  { id: 'about',    label: 'About',    icon: '👤',  windowTitle: 'ABOUT_ME.INFO'          },
  { id: 'skills',   label: 'Skills',   icon: '⚙️', windowTitle: 'TECH_STACK.CFG'         },
  { id: 'radar',    label: 'Radar',    icon: '📊',  windowTitle: 'SKILLS_RADAR.EXE'       },
  { id: 'awards',   label: 'Awards',   icon: '🏆',  windowTitle: 'ACHIEVEMENTS.EXE'       },
  { id: 'resume',   label: 'Resume',   icon: '📄',  windowTitle: 'RESUME.EXE'             },
  { id: 'code',     label: 'Code',     icon: '💻',  windowTitle: 'CODE_PLAYGROUND.JS'     },
  { id: 'display',  label: 'Display',  icon: '🖥️', windowTitle: 'DISPLAY_SETTINGS.CFG'   },
  { id: 'tetris',   label: 'Tetris',   icon: '🧱',  windowTitle: 'TETRIS.EXE'             },
  { id: 'snake',    label: 'Snake',    icon: '🐍',  windowTitle: 'SNAKE.EXE'              },
  { id: 'timeline', label: 'Timeline', icon: '📅',  windowTitle: 'TIMELINE.EXE'           },
] as const;

export type AppId = typeof APP_LIST[number]['id'];
