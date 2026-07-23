'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  target: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
};

// useLayoutEffect warns when run on the server; fall back to useEffect there.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function CountUp({
  target,
  suffix = '',
  duration = 1600,
  decimals = 0,
  className,
  style
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // Start at the final value. The server renders the real number (crawlable
  // without JS) and the client's first render matches it, so hydration is clean.
  const [value, setValue] = useState(target);
  const animated = useRef(false);

  // Before the browser paints on the client, drop to 0 so the count-up can
  // play from empty. Reduced-motion users keep the final value untouched.
  useIsoLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setValue(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animated.current) {
            animated.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(target * eased);
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      {suffix}
    </span>
  );
}
