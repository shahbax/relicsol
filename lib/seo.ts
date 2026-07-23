import type { Metadata } from 'next';

/**
 * Builds a per-page twitter card that mirrors the page's openGraph block.
 * Every route should pass its own title / description / image so the
 * twitter tags are page-specific rather than the site default.
 */
export function twitterCard(opts: {
  title: string;
  description: string;
  image?: string;
}): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title: opts.title,
    description: opts.description,
    images: [opts.image ?? '/opengraph-image']
  };
}
