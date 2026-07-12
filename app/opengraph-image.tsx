import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'Relicsol — Web design, custom software & AI automation for the USA, UK and Europe';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080808',
          padding: 72,
          position: 'relative',
          fontFamily: 'sans-serif'
        }}
      >
        {/* Ambient orange glow, echoing the hero */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 640,
            background:
              'radial-gradient(circle at center, rgba(249,115,22,0.42) 0%, rgba(249,115,22,0.12) 45%, rgba(8,8,8,0) 70%)',
            display: 'flex'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            left: -200,
            width: 560,
            height: 560,
            borderRadius: 560,
            background:
              'radial-gradient(circle at center, rgba(249,115,22,0.18) 0%, rgba(8,8,8,0) 65%)',
            display: 'flex'
          }}
        />

        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #F97316, #C2410C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 32,
              fontWeight: 700
            }}
          >
            R
          </div>
          <div style={{ color: '#ffffff', fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            Relicsol
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1.02,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <span>We build digital</span>
            <span style={{ display: 'flex', gap: 22 }}>
              systems that
              <span style={{ color: '#F97316' }}>convert.</span>
            </span>
          </div>
          <div style={{ color: '#A1A1AA', fontSize: 30, marginTop: 20, display: 'flex' }}>
            Web design · Custom software · AI automation · SEO
          </div>
        </div>

        {/* Trust bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #262626',
            paddingTop: 28
          }}
        >
          <div style={{ color: '#71717a', fontSize: 24, letterSpacing: 4, display: 'flex' }}>
            EST. 2018 · USA · UK · EUROPE
          </div>
          <div style={{ color: '#F97316', fontSize: 24, fontWeight: 700, display: 'flex' }}>
            relicsol.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
