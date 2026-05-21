<div align="center">

```
█████╗ ██╗  ██╗      ██████╗ ███████╗
██╔══██╗██║ ██╔╝     ██╔═══██╗██╔════╝
███████║█████╔╝      ██║   ██║███████╗
██╔══██║██╔═██╗      ██║   ██║╚════██║
██║  ██║██║  ██╗     ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝      ╚═════╝ ╚══════╝
```

# AK-OS v2.0

**An OS-themed interactive developer portfolio — built from scratch.**

[![Live](https://img.shields.io/badge/Live-adityakuchhal.com-85e085?style=flat-square&logo=vercel&logoColor=black)](https://adityakuchhal.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## What is this?

AK-OS is a fully interactive, OS-themed portfolio that runs in your browser. It boots up like a real operating system — complete with a BIOS sequence, desktop environment, draggable windows, a working terminal, games, and a Clippy easter egg. Every window is a different section of the portfolio.

No templates. No UI libraries. Built entirely with Next.js 15, TypeScript, and raw CSS.

---

## Features

### OS Shell
- **BIOS Boot Sequence** — animated POST diagnostics with dynamic progress bar tied to boot lines
- **Welcome Screen** — glitch-animated name, CTA buttons, bootUp animation
- **Desktop Environment** — drag, minimize, maximize, close windows
- **Window Manager** — full z-index stacking, focus management, spawn positioning
- **Taskbar** — START menu, open window labels, live clock
- **Desktop Icons** — 2-column grid, hover states, double-click to open

### Portfolio Windows
- **About** — personal intro and background
- **Resume** — embedded PDF viewer with download
- **Projects** — case study grid (real + placeholder projects)
- **Experience** — system log aesthetic timeline
- **Tech Stack** — categorized skill tags
- **Skills Radar** — pure SVG radar chart
- **Career Timeline** — visual milestone tracker
- **Achievements** — trophy-style highlights
- **Certifications** — credential log

### Interactive Tools
- **Terminal** — 10+ commands (`help`, `whoami`, `ls`, `cat`, `neofetch`, and more)
- **File Manager** — navigable folder tree
- **Code Playground** — live JavaScript execution environment
- **Display Settings** — 9 animated wallpapers × 4 color themes × boot toggle
- **Contact** — mailto-wired contact badge + start menu entry

### Games & Easter Eggs
- **Snake** — classic snake game
- **Tetris** — fully playable Tetris
- **Clippy** — appears after 8s, cycles through 8 witty tips, auto-rotates every 6.5s

### Visual System
- **CRT Overlay** — dual-layer phosphor flicker + moving scanline beam
- **Phosphor Glow** — text-shadow glow system across UI elements
- **bootUp Animation** — CRT power-on effect on every window open
- **Glitch Effect** — CSS clip-rect glitch on welcome screen name
- **9 Wallpapers** — Matrix Rain, Starfield, Retro Grid, Pixel Clouds, Cyber Rain, Binary, Geometry, Solid Color, None
- **4 Themes** — Matrix (default), Green Phosphor, Amber, White
- **Mobile Gate** — SYSTEM ERROR screen for viewports < 768px

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + inline styles |
| Email | Resend |
| Deployment | Vercel |
| CI | GitHub Actions |

**No external UI libraries.** Every component — windows, radar chart, terminal, games — is built from scratch.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/contact/        # Resend email API route
│   ├── globals.css         # Theme vars, CRT overlay, glow system
│   └── layout.tsx          # Root layout + CRT overlay divs
├── components/
│   ├── os/                 # Boot, Desktop, Taskbar, StartMenu, Icons
│   ├── apps/               # All 14 portfolio windows
│   └── shared/             # Window chrome, Clippy
├── lib/
│   ├── constants/          # OS metadata, theme tokens, app list
│   ├── hooks/              # useWindowManager
│   └── wallpapers/         # 9 canvas animation modules
├── data/                   # Projects, experience, skills, certs
└── types/                  # Global TypeScript types
```

---

## Local Development

```bash
git clone https://github.com/AdityaKuchhal/ak-os.git
cd ak-os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx   # For contact form email
```

---

## Terminal Commands

Once inside the OS, open the Terminal and try:

| Command | Description |
|---|---|
| `help` | List all available commands |
| `whoami` | Display owner info |
| `ls` | List all applications |
| `neofetch` | System info in neofetch style |
| `cat resume` | Open resume window |
| `open <app>` | Open any application by name |
| `clear` | Clear terminal output |
| `matrix` | Toggle Matrix rain wallpaper |

---

<div align="center">

Built by [Aditya Kuchhal](https://adityakuchhal.com) · [LinkedIn](https://linkedin.com/in/aditya-kuchhal) · [GitHub](https://github.com/AdityaKuchhal)

</div>
