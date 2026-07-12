'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  scale?: boolean;
};

export function Reveal({
  children,
  as = 'div',
  delayMs = 0,
  threshold = 0.15,
  once = true,
  className,
  style,
  scale = false
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delayMs);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    const safety = setTimeout(() => setVisible(true), 1800);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [delayMs, threshold, once]);

  const Tag = as as any;
  const attr = scale ? { 'data-reveal-scale': visible ? 'in' : '' } : { 'data-reveal': visible ? 'in' : '' };
  return (
    <Tag ref={ref} {...attr} className={className} style={style}>
      {children}
    </Tag>
  );
}
