"use client";

import { useEffect, useRef } from "react";

const defaultFormat = (value: number) => String(Math.round(value));

export function useCountUp(target: number, duration = 1500, delay = 0, format: (value: number) => string = defaultFormat) {
  const ref = useRef<HTMLSpanElement>(null);
  const formatRef = useRef(format);

  useEffect(() => { formatRef.current = format; });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (ref.current) ref.current.textContent = formatRef.current(target);
      return;
    }
    let raf = 0;
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (ref.current) ref.current.textContent = formatRef.current(target * eased);
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);

  return ref;
}
