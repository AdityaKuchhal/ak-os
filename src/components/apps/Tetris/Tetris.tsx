'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const COLS = 10;
const ROWS = 20;
const CELL = 30;
const DIVIDER = '─'.repeat(35);

const COLORS: readonly string[] = [
  '',
  '#00bcd4', // I
  '#ffeb3b', // O
  '#9c27b0', // T
  '#4caf50', // S
  '#f44336', // Z
  '#2196f3', // J
  '#ff9800', // L
];

const LINE_SCORES: readonly number[] = [0, 10, 40, 90, 160];

interface PieceTemplate {
  shape: number[][];
  colorIdx: number;
}

const PIECES: PieceTemplate[] = [
  { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], colorIdx: 1 }, // I
  { shape: [[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]], colorIdx: 2 }, // O
  { shape: [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], colorIdx: 3 }, // T
  { shape: [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]], colorIdx: 4 }, // S
  { shape: [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]], colorIdx: 5 }, // Z
  { shape: [[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], colorIdx: 6 }, // J
  { shape: [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]], colorIdx: 7 }, // L
];

interface ActivePiece {
  shape: number[][];
  colorIdx: number;
  x: number;
  y: number;
}

function makeEmptyBoard(): number[][] {
  return Array.from({ length: ROWS }, () => new Array<number>(COLS).fill(0));
}

function spawnPiece(): ActivePiece {
  const template = PIECES[Math.floor(Math.random() * PIECES.length)]!;
  return {
    shape: template.shape.map((row) => [...row]),
    colorIdx: template.colorIdx,
    x: 3,
    y: -1,
  };
}

function rotate(shape: number[][]): number[][] {
  const n = shape.length;
  const result: number[][] = Array.from({ length: n }, () =>
    new Array<number>(n).fill(0)
  );
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      result[c][n - 1 - r] = shape[r]?.[c] ?? 0;
    }
  }
  return result;
}

function isValid(
  board: number[][],
  shape: number[][],
  x: number,
  y: number
): boolean {
  for (let r = 0; r < shape.length; r++) {
    const row = shape[r];
    if (!row) continue;
    for (let c = 0; c < row.length; c++) {
      if (!row[c]) continue;
      const nx = x + c;
      const ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
      if (ny >= 0 && (board[ny]?.[nx] ?? 0) !== 0) return false;
    }
  }
  return true;
}

function getSpeed(lines: number): number {
  return Math.max(100, 500 - Math.floor(lines / 10) * 50);
}

export default function Tetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<number[][]>(makeEmptyBoard());
  const pieceRef = useRef<ActivePiece | null>(null);
  const scoreRef = useRef(0);
  const linesRef = useRef(0);
  const speedRef = useRef(500);
  const gameOverRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockAndSpawnRef = useRef<() => void>(() => {});
  const gameTickRef = useRef<() => void>(() => {});

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const style = getComputedStyle(document.documentElement);
    const bg = style.getPropertyValue('--color-bg').trim() || '#0d0d0d';
    const borderColor = style.getPropertyValue('--color-border').trim() || '#333';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    ctx.strokeStyle = borderColor;
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, ROWS * CELL);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL);
      ctx.lineTo(COLS * CELL, y * CELL);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const board = boardRef.current;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = board[r]?.[c] ?? 0;
        if (cell > 0) {
          ctx.fillStyle = COLORS[cell] ?? '#fff';
          ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
        }
      }
    }

    const piece = pieceRef.current;
    if (piece) {
      let ghostY = piece.y;
      while (isValid(board, piece.shape, piece.x, ghostY + 1)) ghostY++;
      if (ghostY !== piece.y) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = COLORS[piece.colorIdx] ?? '#fff';
        for (let r = 0; r < piece.shape.length; r++) {
          const row = piece.shape[r];
          if (!row) continue;
          for (let c = 0; c < row.length; c++) {
            if (!row[c]) continue;
            const dr = ghostY + r;
            if (dr >= 0) {
              ctx.fillRect((piece.x + c) * CELL + 1, dr * CELL + 1, CELL - 2, CELL - 2);
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = COLORS[piece.colorIdx] ?? '#fff';
      for (let r = 0; r < piece.shape.length; r++) {
        const row = piece.shape[r];
        if (!row) continue;
        for (let c = 0; c < row.length; c++) {
          if (!row[c]) continue;
          const dr = piece.y + r;
          if (dr >= 0) {
            ctx.fillRect((piece.x + c) * CELL + 1, dr * CELL + 1, CELL - 2, CELL - 2);
          }
        }
      }
    }

    ctx.globalAlpha = 1;
  }, []);

  const initGame = useCallback(() => {
    boardRef.current = makeEmptyBoard();
    scoreRef.current = 0;
    linesRef.current = 0;
    speedRef.current = 500;
    gameOverRef.current = false;
    pieceRef.current = spawnPiece();

    const restartInterval = (speed: number) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => gameTickRef.current(), speed);
    };

    const doLockAndSpawn = () => {
      const piece = pieceRef.current;
      if (!piece) return;

      const newBoard = boardRef.current.map((row) => [...row]);
      for (let r = 0; r < piece.shape.length; r++) {
        const shapeRow = piece.shape[r];
        if (!shapeRow) continue;
        for (let c = 0; c < shapeRow.length; c++) {
          if (!shapeRow[c]) continue;
          const ny = piece.y + r;
          const nx = piece.x + c;
          if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
            newBoard[ny][nx] = piece.colorIdx;
          }
        }
      }

      const cleared = newBoard.filter((row) => row.every((cell) => cell !== 0)).length;
      if (cleared > 0) {
        const remaining = newBoard.filter((row) => row.includes(0));
        const emptyRows = Array.from({ length: cleared }, () =>
          new Array<number>(COLS).fill(0)
        );
        boardRef.current = [...emptyRows, ...remaining];

        const newScore = scoreRef.current + (LINE_SCORES[cleared] ?? 0);
        const newLines = linesRef.current + cleared;
        scoreRef.current = newScore;
        linesRef.current = newLines;
        setScore(newScore);
        setLines(newLines);

        const newSpeed = getSpeed(newLines);
        if (newSpeed !== speedRef.current) {
          speedRef.current = newSpeed;
          restartInterval(newSpeed);
        }
      } else {
        boardRef.current = newBoard;
      }

      const next = spawnPiece();
      if (!isValid(boardRef.current, next.shape, next.x, next.y)) {
        pieceRef.current = null;
        gameOverRef.current = true;
        setFinalScore(scoreRef.current);
        setGameOver(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        pieceRef.current = next;
      }
      draw();
    };

    lockAndSpawnRef.current = doLockAndSpawn;

    const gameTick = () => {
      if (gameOverRef.current) return;
      const piece = pieceRef.current;
      if (!piece) return;

      if (isValid(boardRef.current, piece.shape, piece.x, piece.y + 1)) {
        pieceRef.current = { ...piece, y: piece.y + 1 };
        draw();
      } else {
        doLockAndSpawn();
      }
    };

    gameTickRef.current = gameTick;
    restartInterval(500);
    draw();
  }, [draw]);

  const startGame = useCallback(() => {
    setScore(0);
    setLines(0);
    setGameOver(false);
    setFinalScore(0);
    initGame();
  }, [initGame]);

  useEffect(() => {
    initGame();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [initGame]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const controlled = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '];
      if (controlled.includes(e.key)) e.preventDefault();
      if (gameOverRef.current) return;

      const piece = pieceRef.current;
      if (!piece) return;
      const board = boardRef.current;

      if (e.key === 'ArrowLeft') {
        if (isValid(board, piece.shape, piece.x - 1, piece.y)) {
          pieceRef.current = { ...piece, x: piece.x - 1 };
          draw();
        }
      } else if (e.key === 'ArrowRight') {
        if (isValid(board, piece.shape, piece.x + 1, piece.y)) {
          pieceRef.current = { ...piece, x: piece.x + 1 };
          draw();
        }
      } else if (e.key === 'ArrowDown') {
        if (isValid(board, piece.shape, piece.x, piece.y + 1)) {
          pieceRef.current = { ...piece, y: piece.y + 1 };
          draw();
        } else {
          lockAndSpawnRef.current();
        }
      } else if (e.key === 'ArrowUp') {
        const rotated = rotate(piece.shape);
        if (isValid(board, rotated, piece.x, piece.y)) {
          pieceRef.current = { ...piece, shape: rotated };
          draw();
        }
      } else if (e.key === ' ') {
        let newY = piece.y;
        while (isValid(board, piece.shape, piece.x, newY + 1)) newY++;
        pieceRef.current = { ...piece, y: newY };
        lockAndSpawnRef.current();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [draw]);

  return (
    <div
      style={{
        fontFamily: 'var(--font-terminal)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: 16,
        userSelect: 'none',
      }}
    >
      <div style={{ marginBottom: 4 }}>TETRIS.EXE</div>
      <div style={{ color: 'var(--color-border)', marginBottom: 8 }}>{DIVIDER}</div>
      <div
        style={{
          display: 'flex',
          gap: 24,
          color: 'var(--color-primary)',
          marginBottom: 12,
        }}
      >
        <span>SCORE: {String(score).padStart(4, '0')}</span>
        <span>LINES: {lines}</span>
      </div>

      <div
        style={{
          position: 'relative',
          width: COLS * CELL,
          display: 'inline-block',
        }}
      >
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          style={{ display: 'block' }}
        />

        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.75)',
              gap: 12,
            }}
          >
            <div style={{ color: '#ff4444', fontSize: '1.1rem' }}>
              GAME OVER — SCORE: {finalScore}
            </div>
            <button
              onClick={startGame}
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
              [ RETRY ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
