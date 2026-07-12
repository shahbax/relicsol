'use client';

import { useState } from 'react';
import type { ServiceFAQ } from '@/lib/services';

export function ServiceFAQClient({ faqs }: { faqs: ServiceFAQ[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: '1px solid #262626', padding: '24px 0' }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 24,
                fontFamily: 'var(--font-jakarta), sans-serif',
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: '-0.015em',
                padding: 0
              }}
            >
              <span>{f.q}</span>
              <span
                style={{
                  color: '#F97316',
                  fontSize: 24,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform .3s ease'
                }}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen ? (
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#A1A1AA', margin: '16px 0 0', maxWidth: 700 }}>{f.a}</p>
            ) : null}
          </div>
        );
      })}
      <div style={{ borderTop: '1px solid #262626' }} />
    </div>
  );
}
