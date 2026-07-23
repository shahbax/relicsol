import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { caseStudies } from '@/lib/caseStudies';
import { blogPosts } from '@/lib/blogPosts';
import { services } from '@/lib/services';
import { locationPages } from '@/lib/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 }
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/portfolio/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.isoDate ? new Date(p.isoDate) : now,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  const locationRoutes: MetadataRoute.Sitemap = locationPages.map((l) => ({
    url: `${base}/${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes, ...locationRoutes];
}
