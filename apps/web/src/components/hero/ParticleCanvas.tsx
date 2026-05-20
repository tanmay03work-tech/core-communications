'use client';

import {useEffect, useRef, useState} from 'react';

type Point = {
  x: number;
  y: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const PARTICLE_COUNT = 130;
const CONNECTION_DISTANCE = 130;
const MOUSE_RADIUS = 110;
const COLORS = ['rgba(91, 192, 235, 0.9)', 'rgba(145, 112, 255, 0.85)'];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({length: PARTICLE_COUNT}, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-0.35, 0.35) || 0.12,
    vy: randomBetween(-0.35, 0.35) || -0.12,
    radius: randomBetween(0.3, 1.8),
    color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
  }));
}

function useResizeObserver<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({width: 0, height: 0});

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const {width, height} = entry.contentRect;
      setSize({width, height});
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return {ref, size};
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Point | null>(null);
  const hiddenRef = useRef(false);
  const drawFrameRef = useRef<(() => void) | null>(null);
  const {ref: containerRef, size} = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || size.width === 0 || size.height === 0) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(size.width * ratio);
    canvas.height = Math.floor(size.height * ratio);
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    particlesRef.current = createParticles(size.width, size.height);

    const tick = () => {
      context.clearRect(0, 0, size.width, size.height);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const mouse = mouseRef.current;

        if (mouse) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            particle.vx += (dx / distance) * force * 0.14;
            particle.vy += (dy / distance) * force * 0.14;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        if (particle.x <= 0 || particle.x >= size.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(size.width, particle.x));
        }

        if (particle.y <= 0 || particle.y >= size.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(size.height, particle.y));
        }

        context.beginPath();
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.28;
            context.beginPath();
            context.strokeStyle = `rgba(134, 171, 255, ${opacity})`;
            context.lineWidth = 0.8;
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      if (!hiddenRef.current) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    drawFrameRef.current = tick;
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      drawFrameRef.current = null;
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [size.height, size.width]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      hiddenRef.current = document.hidden;

      if (document.hidden) {
        if (frameRef.current) {
          window.cancelAnimationFrame(frameRef.current);
        }
        return;
      }

      if (drawFrameRef.current) {
        frameRef.current = window.requestAnimationFrame(drawFrameRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        mouseRef.current = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };
      }}
      onPointerLeave={() => {
        mouseRef.current = null;
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
