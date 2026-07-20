'use client';

import { useState, type FormEvent } from 'react';
import { siteConfig } from '@/lib/siteConfig';
import { testimonials } from '@/lib/homeData';

const serviceOptions = [
  { id: 'web', label: 'Web Design' },
  { id: 'software', label: 'Software' },
  { id: 'ai', label: 'AI Automation' },
  { id: 'seo', label: 'SEO' }
];

const trustPoints = [
  'Web design, custom software and AI automation under one roof',
  '200+ projects delivered for businesses in the USA, UK and Europe',
  '4.9 / 5 average client rating across 8+ years',
  'Fixed-price proposals within 48 hours, response within 1 hour'
];

type Status = 'idle' | 'submitting' | 'ok' | 'error';

const fieldStyle: React.CSSProperties = {
  background: '#080808',
  border: '1px solid #262626',
  color: '#ffffff',
  padding: '13px 15px',
  borderRadius: 4,
  fontSize: 14,
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit'
};

export function QuoteSection() {
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [tIndex, setTIndex] = useState(0);

  const toggleService = (id: string) =>
    setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Capture before any await — React nulls e.currentTarget once the
    // event finishes dispatching, so touching it after fetch() throws.
    const form = e.currentTarget;
    setStatus('submitting');
    setMessage('');
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      budget: '',
      services,
      message: String(fd.get('message') || '').trim(),
      newsletter: false
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || 'Something went wrong. Email info@relicsol.com directly.');
        return;
      }
      setStatus('ok');
      setMessage('Received. We reply within one hour.');
      form.reset();
      setServices([]);
    } catch {
      setStatus('error');
      setMessage('Network error. Email info@relicsol.com directly.');
    }
  };

  const t = testimonials[tIndex];

  return (
    <section
      id="quote"
      style={{
        padding: '140px 32px',
        background: '#0f0f0f',
        borderTop: '1px solid #1a1a1a',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '-15%',
          top: '-30%',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(249,115,22,0.14), transparent 60%)',
          pointerEvents: 'none'
        }}
        aria-hidden
      />
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 64,
          alignItems: 'start',
          position: 'relative'
        }}
      >
        {/* Left: compact quote form */}
        <form
          onSubmit={submit}
          noValidate
          style={{
            background: '#161616',
            border: '1px solid #262626',
            borderRadius: 4,
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 40px 100px -40px rgba(0,0,0,0.8)'
          }}
          aria-label="Request a quote"
        >
          <h3
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 28,
              letterSpacing: '-0.02em',
              margin: '0 0 4px',
              textAlign: 'center'
            }}
          >
            Request a Quote
          </h3>
          <p style={{ fontSize: 13, color: '#71717a', margin: '0 0 8px', textAlign: 'center' }}>
            Fixed pricing within 48 hours. No obligation.
          </p>

          <div>
            <label htmlFor="q-name" style={{ display: 'none' }}>Full name</label>
            <input id="q-name" name="name" required placeholder="Full name *" autoComplete="name" style={fieldStyle} />
          </div>
          <div>
            <label htmlFor="q-email" style={{ display: 'none' }}>Email address</label>
            <input id="q-email" name="email" type="email" required placeholder="Email address *" autoComplete="email" style={fieldStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label htmlFor="q-phone" style={{ display: 'none' }}>Phone number</label>
              <input id="q-phone" name="phone" type="tel" placeholder="Phone" autoComplete="tel" style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="q-company" style={{ display: 'none' }}>Company</label>
              <input id="q-company" name="company" placeholder="Company" autoComplete="organization" style={fieldStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} role="group" aria-label="Services you are interested in">
            {serviceOptions.map((s) => {
              const active = services.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleService(s.id)}
                  aria-pressed={active}
                  style={{
                    background: active ? '#F97316' : 'transparent',
                    color: active ? '#fff' : '#A1A1AA',
                    border: `1px solid ${active ? '#F97316' : '#262626'}`,
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    transition: 'all .2s ease'
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div>
            <label htmlFor="q-message" style={{ display: 'none' }}>How can we help?</label>
            <textarea
              id="q-message"
              name="message"
              required
              rows={4}
              placeholder="How can we help? *"
              style={{ ...fieldStyle, resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rl-btn-primary"
            style={{
              background: '#F97316',
              color: '#fff',
              border: 'none',
              padding: '15px 24px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              cursor: status === 'submitting' ? 'wait' : 'pointer',
              opacity: status === 'submitting' ? 0.7 : 1
            }}
          >
            {status === 'submitting' ? 'Sending…' : 'Get My Quote →'}
          </button>
          {status !== 'idle' && message ? (
            <p
              role="status"
              style={{
                fontSize: 13,
                textAlign: 'center',
                margin: 0,
                color: status === 'ok' ? '#22c55e' : status === 'error' ? '#ef4444' : '#A1A1AA'
              }}
            >
              {message}
            </p>
          ) : null}
        </form>

        {/* Right: headline, phone, trust bullets, testimonial */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 'clamp(32px, 4.2vw, 56px)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              margin: '0 0 12px'
            }}
          >
            Ready to speak with a web, software &amp; AI expert?
          </h2>
          <p style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', color: '#A1A1AA', margin: '0 0 36px', fontWeight: 500 }}>
            Email us at{' '}
            <a href={`mailto:${siteConfig.contact.primaryEmail}`} style={{ color: '#F97316', textDecoration: 'none', fontWeight: 700 }}>
              {siteConfig.contact.primaryEmail}
            </a>
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {trustPoints.map((point) => (
              <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 16, color: '#e4e4e7', fontWeight: 500 }}>
                <svg width="18" height="18" viewBox="0 0 256 256" fill="#F97316" style={{ marginTop: 3, flexShrink: 0 }} aria-hidden>
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          {/* Testimonial card */}
          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid #262626',
              borderRadius: 4,
              padding: 28,
              display: 'flex',
              gap: 20,
              alignItems: 'flex-start'
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#F97316,#c2410c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 700,
                color: '#fff',
                fontSize: 16,
                flexShrink: 0
              }}
              aria-hidden
            >
              {t.initials}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#e4e4e7', margin: '0 0 12px' }}>
                “{t.quote}”
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 600 }}>{t.name}</span>
                  <span style={{ color: '#71717a', fontSize: 13 }}> · {t.role}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setTIndex((i) => (i + testimonials.length - 1) % testimonials.length)}
                    aria-label="Previous testimonial"
                    style={{ width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: '1px solid #262626', color: '#A1A1AA', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                      <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setTIndex((i) => (i + 1) % testimonials.length)}
                    aria-label="Next testimonial"
                    style={{ width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: '1px solid #262626', color: '#A1A1AA', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
