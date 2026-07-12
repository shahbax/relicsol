'use client';

import { useRef, type CSSProperties, type ReactNode, type MouseEvent } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  as?: 'a' | 'button';
  className?: string;
  style?: CSSProperties;
  strength?: number; // px displacement toward cursor
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  as,
  className,
  style,
  strength = 6,
  target,
  rel,
  ariaLabel
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  const combined: CSSProperties = { transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', ...style };
  const Tag = (as || (href ? 'a' : 'button')) as any;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      className={className}
      style={combined}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
