'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const COLS = 20;
const ROWS = 20;
const CELL = 20;
const TICK_MS = 150;
const DIVIDER = '─'.repeat(35);

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Cell = { x: number; y: number };

interface GameState {
  snake: Cell[];
  food: Cell;
  direction: Direction;
  score: number;
  gameOver: boolean;
  running: boolean;
}

const OPPOSITE: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

const DELTA: Record<Direction, { dx: number; dy: number }> = {
  UP: { dx: 0, dy: -1 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  RIGHT: { dx: 1, dy: 0 },
};

function randomFood(snake: Cell[]): Cell {
  let cell: Cell;
  do {
    cell = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some((s) => s.x === cell.x && s.y === cell.y));
  return cell;
}

function makeInitialState(): GameState {
  const cx = Math.floor(COLS / 2);
  const cy = Math.floor(ROWS / 2);
  const snake: Cell[] = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
  return {
    snake,
    food: randomFood(snake),
    direction: 'RIGHT',
    score: 0,
    gameOver: false,
    running: true,
  };
}

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GameState>(makeInitialState());
  const dirBufferRef = useRef<Direction>('RIGHT');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = stateRef.current;

    const style = getComputedStyle(document.documentElement);
    const bg = style.getPropertyValue('--color-bg').trim() || '#0d0d0d';
    const primary = style.getPropertyValue('--color-primary').trim() || '#00ff41';
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

    ctx.fillStyle = primary;
    ctx.globalAlpha = 0.75;
    for (let i = 1; i < state.snake.length; i++) {
      const c = state.snake[i];
      if (!c) continue;
      ctx.fillRect(c.x * CELL + 1, c.y * CELL + 1, CELL - 2, CELL - 2);
    }

    ctx.globalAlpha = 1;
    const head = state.snake[0];
    if (head) {
      ctx.fillRect(head.x * CELL + 1, head.y * CELL + 1, CELL - 2, CELL - 2);
    }

    ctx.fillStyle = '#ff4444';
    ctx.fillRect(
      state.food.x * CELL + 2,
      state.food.y * CELL + 2,
      CELL - 4,
      CELL - 4
    );
  }, []);

  const initGame = useCallback(() => {
    stateRef.current = makeInitialState();
    dirBufferRef.current = 'RIGHT';

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const state = stateRef.current;
      if (state.gameOver) return;

      const pending = dirBufferRef.current;
      const dir = OPPOSITE[state.direction] === pending ? state.direction : pending;

      const head = state.snake[0];
      if (!head) return;

      const d = DELTA[dir];
      const newHead: Cell = { x: head.x + d.dx, y: head.y + d.dy };

      if (
        newHead.x < 0 ||
        newHead.x >= COLS ||
        newHead.y < 0 ||
        newHead.y >= ROWS
      ) {
        const fs = state.score;
        stateRef.current = { ...state, gameOver: true, running: false };
        setFinalScore(fs);
        setGameOver(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        draw();
        return;
      }

      if (
        state.snake
          .slice(0, -1)
          .some((c) => c.x === newHead.x && c.y === newHead.y)
      ) {
        const fs = state.score;
        stateRef.current = { ...state, gameOver: true, running: false };
        setFinalScore(fs);
        setGameOver(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        draw();
        return;
      }

      const ate = newHead.x === state.food.x && newHead.y === state.food.y;
      const newSnake = ate
        ? [newHead, ...state.snake]
        : [newHead, ...state.snake.slice(0, -1)];
      const newFood = ate ? randomFood(newSnake) : state.food;
      const newScore = ate ? state.score + 10 : state.score;

      stateRef.current = {
        snake: newSnake,
        food: newFood,
        direction: dir,
        score: newScore,
        gameOver: false,
        running: true,
      };

      if (ate) setScore(newScore);
      draw();
    }, TICK_MS);

    draw();
    wrapperRef.current?.focus();
  }, [draw]);

  const startGame = useCallback(() => {
    setScore(0);
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
      const dirMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };
      const dir = dirMap[e.key];
      if (dir) {
        e.preventDefault();
        dirBufferRef.current = dir;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

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
      <div style={{ marginBottom: 4 }}>SNAKE.EXE</div>
      <div style={{ color: 'var(--color-border)', marginBottom: 8 }}>{DIVIDER}</div>
      <div style={{ color: 'var(--color-primary)', marginBottom: 12 }}>
        SCORE: {String(score).padStart(3, '0')}
      </div>

      <div
        ref={wrapperRef}
        tabIndex={0}
        style={{
          position: 'relative',
          width: COLS * CELL,
          display: 'inline-block',
          outline: 'none',
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
