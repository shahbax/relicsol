/** @type {import('next').NextConfig} */

// Legacy WordPress URL map. These run at the Vercel edge (not middleware),
// so they cost nothing at runtime and are applied before any rendering.
// Next.js normalises trailing slashes before matching, so `/about/` and
// `/about` both hit a `/about` source — no duplicate rules needed.
const wordpressRedirects = [
  // Core pages
  { source: '/about-2', destination: '/about', permanent: true },
  { source: '/contact-us', destination: '/contact', permanent: true },
  { source: '/our-services', destination: '/', permanent: true },
  { source: '/services', destination: '/', permanent: true },
  { source: '/home', destination: '/', permanent: true },

  // Portfolio items that lived at the WordPress root
  { source: '/loiseau-2', destination: '/portfolio/loiseau-2', permanent: true },

  // Blog posts published under WordPress slugs
  {
    source: '/how-ai-automation-can-save-yourbusiness-20-hours-per-week',
    destination: '/blog/ai-automation',
    permanent: true
  },
  {
    source: '/how-much-does-a-business-website-cost-in-2026-usa-uk-guide',
    destination: '/blog/website-cost',
    permanent: true
  },

  // WordPress taxonomy and feeds
  { source: '/category/:slug*', destination: '/blog', permanent: true },
  { source: '/tag/:slug*', destination: '/blog', permanent: true },
  { source: '/author/:slug*', destination: '/about', permanent: true },
  { source: '/feed', destination: '/blog', permanent: true },
  { source: '/comments/feed', destination: '/blog', permanent: true },
  { source: '/blog/feed', destination: '/blog', permanent: true },

  // WordPress system paths — never leak these
  { source: '/wp-admin/:path*', destination: '/', permanent: true },
  { source: '/wp-content/:path*', destination: '/', permanent: true },
  { source: '/wp-includes/:path*', destination: '/', permanent: true },
  { source: '/wp-json/:path*', destination: '/', permanent: true },
  { source: '/wp-login.php', destination: '/', permanent: true },
  { source: '/wp-cron.php', destination: '/', permanent: true },
  { source: '/xmlrpc.php', destination: '/', permanent: true },
  { source: '/wp-sitemap.xml', destination: '/sitemap.xml', permanent: true },
  { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true }
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return wordpressRedirects;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
