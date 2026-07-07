
import { NextResponse } from 'next/server';
import { getDcHtml } from '../../lib/dcPage';

export const runtime = 'nodejs';

export async function GET(_request, { params }) {
  const slug = Array.isArray(params?.slug) ? params.slug.join('/') : '';
  const pathname = '/' + slug;
  const html = getDcHtml(pathname);

  if (!html) {
    return new NextResponse('<!doctype html><html><head><title>404</title></head><body style="font-family:system-ui;padding:40px;background:#080808;color:white"><h1>404</h1><p>Page not found.</p><p><a href="/" style="color:#F97316">Back to homepage</a></p></body></html>', {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }

  return new NextResponse(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
