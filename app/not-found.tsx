import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found (404)',
  description: 'The page you are looking for does not exist.'
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '160px 32px 80px',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: 640 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: '#F97316',
            letterSpacing: '0.2em',
            marginBottom: 24,
            textTransform: 'uppercase'
          }}
        >
          Error 404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 700,
            color: '#ffffff',
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.98,
            letterSpacing: '-0.045em',
            margin: '0 0 24px'
          }}
        >
          Page not found.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 40px' }}>
          The page you were looking for does not exist or was moved. Head back home or explore our work.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            className="rl-btn-primary"
            style={{
              background: '#F97316',
              color: '#fff',
              textDecoration: 'none',
              padding: '16px 28px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/portfolio"
            className="rl-btn-secondary"
            style={{
              background: 'transparent',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '16px 28px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid #262626'
            }}
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
