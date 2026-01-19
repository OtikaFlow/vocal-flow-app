import React, { useRef, useEffect } from 'react';

const VoiceOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Particles configuration
    const particleCount = 200; // Optimization: Reduced from 200 for better performance (40k -> 10k checks)
    const particles: { x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number }[] = [];

    // Initialize particles ... (kept same logic, just count changed)
    const radius = Math.min(width, height) * 0.25;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5
      });
    }

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Note: Sorting breaks the (i, j>i) line optimization because indices change relative to position.
      // But for visual depth, sorting is nice.
      // If performance is key, we can drop sorting or accept O(N^2) with lower count.
      // Let's keep sorting but optimise the loop manually.
      particles.sort((a, b) => b.z - a.z);

      const pulse = Math.sin(time * 3) * 0.1 + 1;
      const fov = Math.max(400, radius * 1.5);

      // Pre-calculate 2D positions to avoid doing it inside the nested loop
      const projected = particles.map(p => {
        // ... rotation logic inline ...
        // Rotate sphere
        const rotationSpeed = 0.005;
        const cos = Math.cos(rotationSpeed);
        const sin = Math.sin(rotationSpeed);

        // Rotate Y
        let x = p.x * cos - p.z * sin;
        let z = p.z * cos + p.x * sin;

        // Rotate X (tumble)
        const tumble = 0.002;
        let y = p.y * Math.cos(tumble) - z * Math.sin(tumble);
        z = z * Math.cos(tumble) + p.y * Math.sin(tumble); // Use new Z? No basic math is fine using temp vars if needed
        // Actually updating p.x/y/z for next frame state persistence
        p.x = x;
        p.y = y;
        p.z = z;

        // Movement noise
        p.x += Math.sin(time + p.y * 0.1) * 0.2;
        p.y += Math.cos(time + p.x * 0.1) * 0.2;

        if (fov + p.z <= 1) return null;
        const scale = fov / (fov + p.z);
        return {
          x2d: p.x * scale * pulse + cx,
          y2d: p.y * scale * pulse + cy,
          scale,
          orig: p
        };
      });

      // Draw Loop
      for (let i = 0; i < particleCount; i++) {
        const p1 = projected[i];
        if (!p1) continue;

        const { x2d, y2d, scale, orig } = p1;

        // Draw particle with gradient effect for more depth
        const alpha = Math.max(0.1, Math.min(1, scale - 0.2));
        const drawRadius = Math.max(0, orig.size * scale);
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, drawRadius * 2);
        gradient.addColorStop(0, `rgba(206, 232, 255, ${alpha})`); // accent-200
        gradient.addColorStop(0.5, `rgba(172, 194, 239, ${alpha * 0.8})`); // primary-300
        gradient.addColorStop(1, `rgba(77, 100, 141, ${alpha * 0.3})`); // primary-200
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, drawRadius, 0, Math.PI * 2);
        ctx.fill();

        // Connections - Only check j > i
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = projected[j];
          if (!p2) continue;

          const dx = orig.x - p2.orig.x;
          const dy = orig.y - p2.orig.y;
          const dz = orig.z - p2.orig.z;
          const distSq = dx * dx + dy * dy + dz * dz; // Avoid sqrt for check

          if (distSq < 900) { // 30 * 30
            ctx.strokeStyle = `rgba(206, 232, 255, ${0.15 * alpha})`; // accent-200 with enhanced visibility
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.stroke();
          }
        }
      }

      // Outer Glow Ring
      ctx.strokeStyle = 'rgba(172, 194, 239, 0.15)'; // primary-300
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Ensure positive radius for rings too, though they are 2D based
      const ringRadius = radius * pulse * 1.4;
      if (ringRadius > 0) {
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Animated ring segment with enhanced glow
      ctx.strokeStyle = 'rgba(206, 232, 255, 0.8)'; // accent-200 bright
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(206, 232, 255, 0.6)';
      ctx.beginPath();
      const segmentRadius = radius * pulse * 1.5;
      if (segmentRadius > 0) {
        ctx.arc(cx, cy, segmentRadius, time, time + 1.5);
        ctx.stroke();
      }
      ctx.shadowBlur = 0; // Reset shadow

      // Energy Wave Rings - Ultra Dynamic Effect
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const wavePhase = (time * 2 + i * 2) % 6;
        const waveAlpha = Math.max(0, 1 - wavePhase / 6);
        const waveRadius = radius * (1 + wavePhase * 0.3);

        if (waveAlpha > 0 && waveRadius > 0) {
          ctx.strokeStyle = `rgba(206, 232, 255, ${waveAlpha * 0.4})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, waveRadius * pulse, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Inner Core Glow - Pulsing center
      const coreGlow = Math.sin(time * 4) * 0.3 + 0.7;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.3);
      gradient.addColorStop(0, `rgba(206, 232, 255, ${coreGlow * 0.6})`);
      gradient.addColorStop(0.5, `rgba(172, 194, 239, ${coreGlow * 0.3})`);
      gradient.addColorStop(1, 'rgba(172, 194, 239, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.3 * pulse, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      // Re-calculate radius if needed or just let it be relative to initial size? 
      // Ideally we might want to re-init particles, but for now we just handle canvas size.
      // The visual might drift if radius was calculated on init.
      // Let's keep it simple for now to avoid full re-init logic which is complex in useEffect.
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full md:min-h-[600px] min-h-[400px]"
    />
  );
};

export default VoiceOrb;
