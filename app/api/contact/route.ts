import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/siteConfig';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  budget?: string;
  services?: string[];
  message?: string;
  newsletter?: boolean;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderBody(p: Payload): string {
  const rows: [string, string][] = [
    ['Name', p.name || ''],
    ['Email', p.email || ''],
    ['Company', p.company || '—'],
    ['Phone', p.phone || '—'],
    ['Budget', p.budget || '—'],
    ['Services', (p.services || []).join(', ') || '—'],
    ['Newsletter', p.newsletter ? 'yes' : 'no']
  ];
  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#71717a;font-family:monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">${escapeHtml(
          k
        )}</td><td style="padding:6px 12px;color:#111;">${escapeHtml(v)}</td></tr>`
    )
    .join('');
  return `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:32px;">
      <h1 style="font-size:22px;margin:0 0 8px;color:#111;">New enquiry — ${escapeHtml(p.name || '')}</h1>
      <p style="color:#666;margin:0 0 24px;">via relicsol.com contact form</p>
      <table style="width:100%;border-collapse:collapse;background:#f7f7f7;border-radius:6px;overflow:hidden;">${table}</table>
      <h2 style="font-size:16px;color:#111;margin:24px 0 8px;">Message</h2>
      <div style="background:#f7f7f7;padding:16px;border-radius:6px;white-space:pre-wrap;color:#111;font-size:14px;line-height:1.6;">${escapeHtml(
        p.message || ''
      )}</div>
    </div>
  `;
}

function autoReplyHtml(name: string): string {
  return `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:32px;">
      <h1 style="font-size:22px;margin:0 0 12px;">Thanks, ${escapeHtml(name)}.</h1>
      <p style="font-size:15px;line-height:1.65;color:#333;">Your enquiry landed with the Relicsol team. We reply within one hour during working hours in the USA, UK and Europe.</p>
      <p style="font-size:15px;line-height:1.65;color:#333;">If you need us sooner, reply to this email or write directly to ${siteConfig.contact.primaryEmail}.</p>
      <p style="font-size:14px;color:#666;margin-top:32px;">— The Relicsol team</p>
    </div>
  `;
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const message = (payload.message || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || siteConfig.contact.primaryEmail;
  const from = process.env.RESEND_FROM || 'Relicsol Website <onboarding@resend.dev>';

  // Dev fallback: log and succeed so local dev works without configuration
  if (!apiKey) {
    console.log('[contact] RESEND_API_KEY missing — payload:', JSON.stringify(payload, null, 2));
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const subject = `New enquiry from ${name}${payload.budget ? ` — ${payload.budget}` : ''}`;
    const html = renderBody(payload);

    const [notify, autoReply] = await Promise.all([
      resend.emails.send({
        from,
        to,
        subject,
        replyTo: email,
        html
      }),
      resend.emails.send({
        from,
        to: email,
        subject: 'We got your message — Relicsol',
        html: autoReplyHtml(name)
      })
    ]);

    if ('error' in notify && notify.error) {
      console.error('[contact] Resend notify error:', notify.error);
      return NextResponse.json({ error: 'Could not deliver enquiry. Please email info@relicsol.com.' }, { status: 500 });
    }
    if ('error' in autoReply && autoReply.error) {
      console.warn('[contact] Auto-reply failed:', autoReply.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Send failed:', err);
    return NextResponse.json({ error: 'Could not send message.' }, { status: 500 });
  }
}
