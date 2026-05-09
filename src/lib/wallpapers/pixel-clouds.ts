interface Cloud {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
}

export function startPixelCloudsWallpaper(
  canvas: HTMLCanvasElement,
  _color: string
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let clouds: Cloud[] = [];
  let rafId = 0;

  function makeCloud(x: number): Cloud {
    return {
      x,
      y: canvas.height * 0.08 + Math.random() * canvas.height * 0.65,
      w: 64 + Math.floor(Math.random() * 8) * 8,
      h: 16 + Math.floor(Math.random() * 2) * 8,
      speed: 0.15 + Math.random() * 0.25,
    };
  }

  function init() {
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    clouds = Array.from({ length: 5 }, (_, i) =>
      makeCloud(Math.random() * canvas.width + i * (canvas.width / 5))
    );
  }

  init();

  function draw() {
    rafId = requestAnimationFrame(draw);
    const c = ctx as CanvasRenderingContext2D;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgba(255, 255, 255, 0.15)';

    for (const cloud of clouds) {
      c.fillRect(cloud.x, cloud.y, cloud.w, cloud.h);
      c.fillRect(cloud.x + 8, cloud.y - 8, cloud.w - 16, cloud.h);
      c.fillRect(cloud.x + 16, cloud.y - 16, cloud.w - 32, 8);

      cloud.x += cloud.speed;
      if (cloud.x > canvas.width + cloud.w) {
        const next = makeCloud(-cloud.w);
        cloud.x = next.x;
        cloud.y = next.y;
        cloud.w = next.w;
        cloud.h = next.h;
        cloud.speed = next.speed;
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
