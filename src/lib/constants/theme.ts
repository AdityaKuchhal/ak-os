export const THEMES = ['matrix', 'phosphor', 'amber', 'white'] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = 'matrix';
export const THEME_STORAGE_KEY = 'ak-os-theme';
export const WALLPAPER_STORAGE_KEY = 'ak-os-wallpaper';
export const BOOT_STORAGE_KEY = 'ak-os-boot-mode';
