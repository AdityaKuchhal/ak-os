interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  sides: number;
  size: number;
}

const SIDES_OPTIONS = [3, 4, 5] as const;

export function startGeometryWallpaper(
  canvas: HTMLCanvasElement,
  color: string
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let shapes: Shape[] = [];
  let rafId = 0;

  function init() {
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    shapes = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      sides: SIDES_OPTIONS[Math.floor(Math.random() * SIDES_OPTIONS.length)] ?? 3,
      size: 30 + Math.random() * 50,
    }));
  }

  init();

  function draw() {
    rafId = requestAnimationFrame(draw);
    const c = ctx as CanvasRenderingContext2D;
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (const shape of shapes) {
      c.save();
      c.translate(shape.x, shape.y);
      c.rotate(shape.rotation);
      c.strokeStyle = color;
      c.globalAlpha = 0.4;
      c.lineWidth = 1;
      c.beginPath();

      for (let i = 0; i <= shape.sides; i++) {
        const angle = (i / shape.sides) * Math.PI * 2;
        const px = Math.cos(angle) * shape.size;
        const py = Math.sin(angle) * shape.size;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }

      c.stroke();
      c.restore();

      shape.x += shape.vx;
      shape.y += shape.vy;
      shape.rotation += shape.rotSpeed;

      const pad = shape.size;
      if (shape.x < -pad) shape.x = canvas.width + pad;
      if (shape.x > canvas.width + pad) shape.x = -pad;
      if (shape.y < -pad) shape.y = canvas.height + pad;
      if (shape.y > canvas.height + pad) shape.y = -pad;
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
