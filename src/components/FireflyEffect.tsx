import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './FireflyEffect.css';

interface Firefly {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  timeToRedirect: number;
}

const FireflyEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const firefliesRef = useRef<Firefly[]>([]);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize fireflies
    const fireflyCount = Math.min(15, Math.floor(window.innerWidth / 100));
    firefliesRef.current = Array.from({ length: fireflyCount }, () => createFirefly());

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only animate if in view
      if (inView) {
        firefliesRef.current.forEach((firefly) => {
          updateFirefly(firefly, canvas);
          drawFirefly(ctx, firefly);
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView]);

  const createFirefly = (): Firefly => {
    const canvas = canvasRef.current;
    const width = canvas?.width || window.innerWidth;
    const height = canvas?.height || window.innerHeight;
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
      targetX: Math.random() * width,
      targetY: Math.random() * height,
      timeToRedirect: Math.random() * 200 + 50
    };
  };

  const updateFirefly = (firefly: Firefly, canvas: HTMLCanvasElement) => {
    // Pulse effect for alpha
    firefly.alpha += Math.sin(Date.now() / 1000) * 0.002;
    firefly.alpha = Math.max(0.1, Math.min(0.7, firefly.alpha));
    
    // Update position
    firefly.x += firefly.vx;
    firefly.y += firefly.vy;
    
    // Redirect occasionally
    firefly.timeToRedirect--;
    if (firefly.timeToRedirect <= 0) {
      firefly.targetX = Math.random() * canvas.width;
      firefly.targetY = Math.random() * canvas.height;
      firefly.timeToRedirect = Math.random() * 200 + 50;
      
      // Calculate new velocity based on target
      const dx = firefly.targetX - firefly.x;
      const dy = firefly.targetY - firefly.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      firefly.vx = (dx / distance) * firefly.speed;
      firefly.vy = (dy / distance) * firefly.speed;
    }
    
    // Boundary check
    if (firefly.x < 0 || firefly.x > canvas.width || 
        firefly.y < 0 || firefly.y > canvas.height) {
      // Reset to a random position on the edge
      if (Math.random() > 0.5) {
        firefly.x = Math.random() > 0.5 ? 0 : canvas.width;
        firefly.y = Math.random() * canvas.height;
      } else {
        firefly.x = Math.random() * canvas.width;
        firefly.y = Math.random() > 0.5 ? 0 : canvas.height;
      }
      
      firefly.targetX = Math.random() * canvas.width;
      firefly.targetY = Math.random() * canvas.height;
      
      // Calculate new velocity
      const dx = firefly.targetX - firefly.x;
      const dy = firefly.targetY - firefly.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      firefly.vx = (dx / distance) * firefly.speed;
      firefly.vy = (dy / distance) * firefly.speed;
    }
  };

  const drawFirefly = (ctx: CanvasRenderingContext2D, firefly: Firefly) => {
    const glow = ctx.createRadialGradient(
      firefly.x, firefly.y, 0,
      firefly.x, firefly.y, firefly.size * 3
    );
    
    // Gold/amber color for the fireflies
    glow.addColorStop(0, `rgba(255, 213, 79, ${firefly.alpha})`);
    glow.addColorStop(1, 'rgba(255, 213, 79, 0)');
    
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(firefly.x, firefly.y, firefly.size * 3, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="firefly-container" ref={inViewRef}>
      <canvas ref={canvasRef} className="firefly-canvas" />
    </div>
  );
};

export default FireflyEffect;