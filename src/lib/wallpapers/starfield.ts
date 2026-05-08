interface Star {
  angle: number;
  dist: number;
  prevDist: number;
  speed: number;
}

export function startStarfieldWallpaper(
  canvas: HTMLCanvasElement,
  _color: string
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let stars: Star[] = [];
  let maxDist = 0;

  function init() {
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    maxDist = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);
    stars = Array.from({ length: 200 }, () => {
      const dist = Math.random() * 5;
      return {
        angle: Math.random() * Math.PI * 2,
        dist,
        prevDist: dist,
        speed: Math.random() * 2.5 + 0.5,
      };
    });
  }

  init();

  let rafId = 0;

  function draw() {
    rafId = requestAnimationFrame(draw);
    const c = ctx as CanvasRenderingContext2D;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    c.fillStyle = 'rgba(0, 0, 0, 0.2)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
      star.prevDist = star.dist;
      star.dist += star.speed * (star.dist / 80 + 0.5);

      const x1 = cx + Math.cos(star.angle) * star.prevDist;
      const y1 = cy + Math.sin(star.angle) * star.prevDist;
      const x2 = cx + Math.cos(star.angle) * star.dist;
      const y2 = cy + Math.sin(star.angle) * star.dist;

      const brightness = Math.min(1, star.dist / 120);
      c.strokeStyle = `rgba(255, 255, 255, ${brightness})`;
      c.lineWidth = brightness * 1.5;
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();

      if (star.dist > maxDist) {
        star.dist = Math.random() * 3;
        star.prevDist = star.dist;
        star.angle = Math.random() * Math.PI * 2;
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
