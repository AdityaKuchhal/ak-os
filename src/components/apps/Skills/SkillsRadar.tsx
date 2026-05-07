'use client';

import { useState } from 'react';

interface Skill {
  label: string;
  legend: string;
  value: number;
}

interface HoveredPoint {
  index: number;
  svgX: number;
  svgY: number;
}

const SKILLS: Skill[] = [
  { label: 'Frontend', legend: 'FRONTEND', value: 75 },
  { label: 'Backend', legend: 'BACKEND', value: 90 },
  { label: 'DevOps', legend: 'DEVOPS', value: 80 },
  { label: 'AI/ML', legend: 'AI/ML', value: 85 },
  { label: 'Databases', legend: 'DATABASES', value: 80 },
  { label: 'System Design', legend: 'SYSTEM DESIGN', value: 70 },
];

const CX = 200;
const CY = 200;
const R = 150;
const N = SKILLS.length;
const RINGS = 5;
const TOOLTIP_W = 130;
const TOOLTIP_H = 24;

function axisAngle(i: number): number {
  return -Math.PI / 2 + (i * 2 * Math.PI) / N;
}

function pointAt(i: number, r: number): [number, number] {
  const a = axisAngle(i);
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function toPolyStr(pts: [number, number][]): string {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

function textAnchor(i: number): 'start' | 'middle' | 'end' {
  const x = Math.cos(axisAngle(i));
  if (Math.abs(x) < 0.3) return 'middle';
  return x > 0 ? 'start' : 'end';
}

function barStr(value: number): string {
  const filled = Math.round(value / 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled);
}

export default function SkillsRadar() {
  const [hovered, setHovered] = useState<HoveredPoint | null>(null);

  const rings = Array.from({ length: RINGS }, (_v, ri) => {
    const r = R * ((ri + 1) / RINGS);
    return toPolyStr(Array.from({ length: N }, (_u, i) => pointAt(i, r)));
  });

  const dataPoints: [number, number][] = SKILLS.map((s, i) =>
    pointAt(i, R * (s.value / 100))
  );
  const dataPolyStr = toPolyStr(dataPoints);

  const ttX =
    hovered !== null && hovered.svgX + 8 + TOOLTIP_W > 400
      ? hovered.svgX - TOOLTIP_W - 8
      : (hovered?.svgX ?? 0) + 8;
  const ttY =
    hovered !== null && hovered.svgY - TOOLTIP_H - 4 < 0
      ? (hovered?.svgY ?? 0) + 4
      : (hovered?.svgY ?? 0) - TOOLTIP_H - 4;

  return (
    <>
      <style>{`
        @keyframes drawIn {
          from { stroke-dashoffset: 2000; }
          to   { stroke-dashoffset: 0; }
        }
        .radar-stroke {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: drawIn 1000ms ease-out forwards;
        }
      `}</style>

      <div
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-terminal)',
          padding: 16,
        }}
      >
        {/* SVG chart */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg
            width={400}
            height={400}
            viewBox="0 0 400 400"
            style={{ overflow: 'visible' }}
          >
            {/* Concentric ring polygons */}
            {rings.map((pts, ri) => (
              <polygon
                key={ri}
                points={pts}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth={1}
              />
            ))}

            {/* Axis lines */}
            {SKILLS.map((_s, i) => {
              const [x, y] = pointAt(i, R);
              return (
                <line
                  key={i}
                  x1={CX}
                  y1={CY}
                  x2={x}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeWidth={1}
                />
              );
            })}

            {/* Axis labels */}
            {SKILLS.map((s, i) => {
              const [x, y] = pointAt(i, R + 22);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  dy=".35em"
                  textAnchor={textAnchor(i)}
                  fill="var(--color-text)"
                  fontFamily="var(--font-terminal)"
                  fontSize={11}
                >
                  {s.label}
                </text>
              );
            })}

            {/* Data polygon — fill */}
            <polygon
              points={dataPolyStr}
              fill="var(--color-primary)"
              fillOpacity={0.2}
              stroke="none"
            />

            {/* Data polygon — animated stroke */}
            <polygon
              className="radar-stroke"
              points={dataPolyStr}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={2}
            />

            {/* Data point circles */}
            {dataPoints.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill="var(--color-primary)"
                style={{ cursor: 'crosshair' }}
                onMouseEnter={() =>
                  setHovered({ index: i, svgX: x, svgY: y })
                }
                onMouseLeave={() => setHovered(null)}
              />
            ))}

            {/* Tooltip */}
            {hovered !== null && (
              <g pointerEvents="none">
                <rect
                  x={ttX}
                  y={ttY}
                  width={TOOLTIP_W}
                  height={TOOLTIP_H}
                  fill="var(--color-surface)"
                  stroke="var(--color-border)"
                  strokeWidth={1}
                  rx={0}
                />
                <text
                  x={ttX + 8}
                  y={ttY + TOOLTIP_H / 2}
                  dy=".35em"
                  fill="var(--color-text)"
                  fontFamily="var(--font-terminal)"
                  fontSize={11}
                >
                  {SKILLS[hovered.index]?.label}:{' '}
                  {SKILLS[hovered.index]?.value}%
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div style={{ marginTop: 8 }}>
          {SKILLS.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                lineHeight: 1.8,
                fontSize: '0.95rem',
              }}
            >
              <span
                style={{
                  color: 'var(--color-text-dim)',
                  width: '14ch',
                  flexShrink: 0,
                }}
              >
                {s.legend}
              </span>
              <span style={{ letterSpacing: '0.02em' }}>{barStr(s.value)}</span>
              <span style={{ color: 'var(--color-primary)' }}>
                {s.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
