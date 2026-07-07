
import { NextResponse } from 'next/server';
import { getDcHtml } from '../lib/dcPage';

export const runtime = 'nodejs';

export async function GET() {
  const html = getDcHtml('/');
  return new NextResponse(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
