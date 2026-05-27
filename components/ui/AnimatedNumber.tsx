'use client';

import { useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  className?: string;
  duration?: number;
  suffix?: string;
}

export function AnimatedNumber({ 
  value, 
  decimals = 2, 
  className = '', 
  duration = 1000,
  suffix = ''
}: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const startValue = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = startValue + (value - startValue) * progress;
      element.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value, decimals, duration, suffix]);

  return <span ref={elementRef}>0{suffix}</span>;
}
