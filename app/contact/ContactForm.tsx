'use client';

import { useState, type FormEvent } from 'react';

const budgets = [
  { id: 'under-1k', label: '< $1,000' },
  { id: '1k-1.5k', label: '$1,000 – $1,500' },
  { id: '1.5k-2k', label: '$1,500 – $2,000' },
  { id: '2k-5k', label: '$2,000 – $5,000' },
  { id: '5k-plus', label: '$5,000+' }
];

const serviceOptions = [
  { id: 'web', label: 'Web Design & Development' },
  { id: 'software', label: 'Software Development' },
  { id: 'ai', label: 'AI Automation' },
  { id: 'seo', label: 'SEO & Marketing' },
  { id: 'other', label: 'Something else' }
];

type Status = 'idle' | 'submitting' | 'ok' | 'error';

const inputStyle: React.CSSProperties = {
  background: '#0f0f0f',
  border: '1px solid #262626',
  color: '#ffffff',
  padding: '14px 16px',
  borderRadius: 4,
  fontSize: 15,
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit'
};
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono), monospace',
  fontSize: 11,
  color: '#A1A1AA',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: 10
};

export function ContactForm() {
  const [budget, setBudget] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  const toggleService = (id: string) => {
    setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      budget,
      services,
      message: String(formData.get('message') || '').trim(),
      newsletter: formData.get('newsletter') === 'on'
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
        setMessage(data?.error || 'Something went wrong. Please email info@relicsol.com directly.');
        return;
      }
      setStatus('ok');
      setMessage('Thanks — your message is in. We will reply within one hour.');
      (e.currentTarget as HTMLFormElement).reset();
      setBudget('');
      setServices([]);
    } catch {
      setStatus('error');
      setMessage('Network error. Please email info@relicsol.com directly.');
    }
  };

  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label htmlFor="name" style={labelStyle}>Full name *</label>
          <input id="name" name="name" required autoComplete="name" style={inputStyle} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" style={inputStyle} placeholder="you@company.com" />
        </div>
      </div>

      {/* Company + Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label htmlFor="company" style={labelStyle}>Company</label>
          <input id="company" name="company" autoComplete="organization" style={inputStyle} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" style={inputStyle} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      {/* Budget */}
      <div>
        <div style={labelStyle}>Estimated budget</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {budgets.map((b) => {
            const active = budget === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudget(b.id)}
                aria-pressed={active}
                style={{
                  background: active ? '#F97316' : 'transparent',
                  color: active ? '#fff' : '#A1A1AA',
                  border: `1px solid ${active ? '#F97316' : '#262626'}`,
                  padding: '10px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all .25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services */}
      <div>
        <div style={labelStyle}>Services you need (select any that apply)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
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
                  padding: '10px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" style={labelStyle}>What are you building? *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="A few sentences on the project, your business, and the outcome you're after."
        />
      </div>

      {/* Newsletter */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#A1A1AA', fontSize: 14, cursor: 'pointer' }}>
        <input type="checkbox" name="newsletter" style={{ width: 16, height: 16, accentColor: '#F97316' }} />
        Send me one useful build tip every other week (no spam, unsubscribe any time).
      </label>

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rl-btn-primary"
          style={{
            background: '#F97316',
            color: '#fff',
            border: 'none',
            padding: '16px 32px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 600,
            cursor: status === 'submitting' ? 'wait' : 'pointer',
            opacity: status === 'submitting' ? 0.7 : 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Enquiry →'}
        </button>
        {status !== 'idle' && message ? (
          <span
            role="status"
            style={{
              fontSize: 14,
              color: status === 'ok' ? '#22c55e' : status === 'error' ? '#ef4444' : '#A1A1AA'
            }}
          >
            {message}
          </span>
        ) : null}
      </div>
    </form>
  );
}
