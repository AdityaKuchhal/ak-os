export function startRetroGridWallpaper(
  canvas: HTMLCanvasElement,
  color: string
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let offset = 0;
  let rafId = 0;

  function init() {
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
  }

  init();

  function draw() {
    rafId = requestAnimationFrame(draw);
    const c = ctx as CanvasRenderingContext2D;
    const w = canvas.width;
    const h = canvas.height;

    c.clearRect(0, 0, w, h);
    c.strokeStyle = color;
    c.globalAlpha = 0.6;
    c.lineWidth = 1;

    const vx = w / 2;
    const vy = h * 0.38;
    const numH = 28;
    const numV = 14;

    offset = (offset + 0.4) % numH;

    // Horizontal lines with perspective scroll
    for (let i = 0; i <= numH; i++) {
      const t = ((i + offset) % numH) / numH;
      const y = vy + (h - vy) * Math.pow(t, 2.5);
      if (y < vy || y > h) continue;

      const spread = (y - vy) / (h - vy);
      c.beginPath();
      c.moveTo(vx - spread * w * 0.65, y);
      c.lineTo(vx + spread * w * 0.65, y);
      c.stroke();
    }

    // Vertical lines fanning from vanishing point
    for (let i = 0; i <= numV; i++) {
      const t = i / numV;
      const endX = vx + (t - 0.5) * w * 1.3;
      c.beginPath();
      c.moveTo(vx, vy);
      c.lineTo(endX, h);
      c.stroke();
    }

    c.globalAlpha = 1;
  }

  rafId = requestAnimationFrame(draw);
  window.addEventListener('resize', init);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', init);
  };
}
