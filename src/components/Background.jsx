import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Background = () => {
  const { currentTheme } = useTheme();
  const canvasRef = useRef(null);

  const themeColor =
    currentTheme === 'purple' ? [124, 58, 237] :
    currentTheme === 'cyan'   ? [0, 229, 255] :
    currentTheme === 'red'    ? [244, 63, 94] : [255, 255, 255];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NUM = 80;
    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const [r, g, b] = themeColor;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [currentTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" style={{ backgroundColor: '#111827' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Gradient Orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%',
        width: '40%', height: '40%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%',
        width: '40%', height: '40%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.14), transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
        backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.07) 50%)',
        backgroundSize: '100% 2px',
      }} />
    </div>
  );
};

export default Background;
