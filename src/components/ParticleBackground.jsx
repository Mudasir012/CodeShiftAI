import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 55;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function ParticleBackground({ className = '' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', () => { mouseRef.current = { x: -9999, y: -9999 }; });

    // Init particles
    const chars = '01ABCDEF><{}[]//\\;'.split('');
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: randomBetween(-0.15, 0.15),
      vy: randomBetween(-0.15, 0.15),
      alpha: randomBetween(0.04, 0.2),
      size: Math.random() > 0.7 ? 11 : 9,
      char: chars[Math.floor(Math.random() * chars.length)],
      charSwapTimer: 0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 0.25;
          p.vy += (dy / dist) * force * 0.25;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Randomly swap character
        p.charSwapTimer++;
        if (p.charSwapTimer > 80 + Math.random() * 120) {
          p.char = chars[Math.floor(Math.random() * chars.length)];
          p.charSwapTimer = 0;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#0A0A0A';
        ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillText(p.char, p.x, p.y);
      });

      // Draw faint connecting lines between close particles
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.globalAlpha = (1 - d / 90) * 0.06;
            ctx.strokeStyle = '#0A0A0A';
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ opacity: 0.35 }}
    />
  );
}
