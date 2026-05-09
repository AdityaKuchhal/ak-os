const NEON_BLUE = '#00bfff';

export function startCyberRainWallpaper(
  canvas: HTMLCanvasElement,
  _color: string
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const CHAR_SIZE = 14;
  let columns: number[] = [];

  function init() {
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    const count = Math.max(1, Math.floor(canvas.width / CHAR_SIZE));
    columns = Array.from({ length: count }, () =>
      Math.floor(Math.random() * (canvas.height / CHAR_SIZE))
    );
  }

  init();

  const frameInterval = 1000 / 30;
  let lastTime = 0;
  let rafId = 0;

  function draw(timestamp: number) {
    rafId = requestAnimationFrame(draw);
    if (timestamp - lastTime < frameInterval) return;
    lastTime = timestamp;

    const c = ctx as CanvasRenderingContext2D;
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = NEON_BLUE;
    c.font = `${CHAR_SIZE}px monospace`;
    c.textBaseline = 'top';

    for (let i = 0; i < columns.length; i++) {
      const char = Math.random() > 0.5 ? '1' : '0';
      c.fillText(char, i * CHAR_SIZE, columns[i] * CHAR_SIZE);
      if (columns[i] * CHAR_SIZE > canvas.height && Math.random() > 0.975) {
        columns[i] = 0;
      } else {
        columns[i]++;
      }
    }
  }

  rafId = requestAnimationFrame(draw);
  window.addEventListener('resize', init);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', init);
  };
}
