export function startNoneWallpaper(
  canvas: HTMLCanvasElement,
  _color: string
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  function draw() {
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    const c = ctx as CanvasRenderingContext2D;
    c.fillStyle = '#0d0d0d';
    c.fillRect(0, 0, canvas.width, canvas.height);
  }

  draw();
  window.addEventListener('resize', draw);

  return () => window.removeEventListener('resize', draw);
}
