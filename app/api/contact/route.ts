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
  // Anti-abuse fields, set by the client forms
  website?: string; // honeypot — must stay empty
  startedAt?: number; // ms epoch when the form was rendered
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ *
 * Abuse protection
 *
 * This endpoint sends an auto-reply to whatever address is submitted,
 * which makes it a spam relay if left unguarded — a bot farm was using
 * it to mail unsolicited messages to third parties. Every rejection
 * below returns a normal-looking success so bots get no signal about
 * which check caught them, but nothing is ever sent.
 * ------------------------------------------------------------------ */

// Minimum time a human plausibly needs to fill the form.
const MIN_FILL_MS = 3000;

// Per-instance rate limit. Serverless instances do not share memory, so
// this is a speed bump rather than a wall; the heuristics do the heavy work.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const recentByIp = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  if (recentByIp.size > 500) {
    // Bound memory growth on long-lived instances
    for (const [k, v] of recentByIp) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentByIp.delete(k);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
}

/**
 * Returns a short reason string when the submission looks automated,
 * or null when it looks like a real person.
 */
function botSignal(p: Payload): string | null {
  const name = (p.name || '').trim();
  const message = (p.message || '').trim();

  // 1. Honeypot: a field hidden from humans. Only scripts fill it.
  if (p.website && p.website.trim() !== '') return 'honeypot';

  // 2. Submitted faster than a human could type.
  if (typeof p.startedAt === 'number' && Number.isFinite(p.startedAt)) {
    const elapsed = Date.now() - p.startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) return 'too-fast';
  }

  // 3. Random-string names ("NkepBUTkyhSxpzULETNCc") — one long word with
  //    erratic capitalisation, the signature of the farm hitting this form.
  if (!name.includes(' ') && name.length >= 12) {
    let flips = 0;
    for (let i = 1; i < name.length; i++) {
      const a = name[i - 1];
      const b = name[i];
      if (!/[a-zA-Z]/.test(a) || !/[a-zA-Z]/.test(b)) continue;
      if ((a === a.toUpperCase()) !== (b === b.toUpperCase())) flips++;
    }
    if (flips >= 4) return 'gibberish-name';
  }

  // 4. Links in the message body. Real enquiries occasionally include one,
  //    but two or more is reliably spam.
  const linkCount = (message.match(/https?:\/\/|www\.|\[url[=\]]|<a\s/gi) || []).length;
  if (linkCount >= 2) return 'links';

  // 5. Classic spam payload markers.
  if (/\[url=|\[\/url\]|viagra|casino|crypto\s+invest|seo\s+backlinks?\s+package/i.test(message)) {
    return 'spam-markers';
  }

  return null;
}

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

function renderText(p: Payload): string {
  return [
    `New enquiry via relicsol.com`,
    ``,
    `Name: ${p.name || ''}`,
    `Email: ${p.email || ''}`,
    `Company: ${p.company || '-'}`,
    `Phone: ${p.phone || '-'}`,
    `Budget: ${p.budget || '-'}`,
    `Services: ${(p.services || []).join(', ') || '-'}`,
    `Newsletter: ${p.newsletter ? 'yes' : 'no'}`,
    ``,
    `Message:`,
    p.message || ''
  ].join('\n');
}

function autoReplyText(name: string): string {
  return [
    `Thanks, ${name}.`,
    ``,
    `Your enquiry reached the Relicsol team. We reply within one hour during working hours in the USA, UK and Europe.`,
    ``,
    `If you need us sooner, reply to this email or write to ${siteConfig.contact.primaryEmail}.`,
    ``,
    `The Relicsol team`
  ].join('\n');
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

  // --- Abuse gate -------------------------------------------------
  // Nothing past this point sends mail unless the submission looks human.
  // Rejections return a normal success shape so bots cannot probe which
  // rule caught them; the reason is recorded in the function logs only.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const signal = botSignal(payload);
  if (signal) {
    console.warn(`[contact] blocked (${signal}) ip=${ip} name=${JSON.stringify(name)} email=${JSON.stringify(email)}`);
    return NextResponse.json({ ok: true });
  }
  if (rateLimited(ip)) {
    console.warn(`[contact] rate limited ip=${ip}`);
    return NextResponse.json({ ok: true });
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
        html,
        text: renderText(payload)
      }),
      resend.emails.send({
        from,
        to: email,
        subject: 'We got your message — Relicsol',
        html: autoReplyHtml(name),
        text: autoReplyText(name)
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
