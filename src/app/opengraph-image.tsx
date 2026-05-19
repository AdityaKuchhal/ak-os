import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AK-OS — Aditya Kuchhal Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0d0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          color: '#00ff41',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 16 }}>
          AK-OS v2.0
        </div>
        <div style={{ fontSize: 32, color: '#008f11', marginBottom: 32 }}>
          Aditya Kuchhal — Software Developer
        </div>
        <div style={{ fontSize: 20, color: '#008f11' }}>
          adityakuchhal.com
        </div>
      </div>
    ),
    { ...size }
  );
}
