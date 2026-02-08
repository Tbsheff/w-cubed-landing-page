import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity.client'
import groq from 'groq'

const SITE_URL = 'https://wcubedinc.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects, manufacturers] = await Promise.all([
    sanityClient.fetch<Array<{ slug: string; _updatedAt: string }>>(
      groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<Array<{ slug: string; _updatedAt: string }>>(
      groq`*[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<Array<{ slug: string; _updatedAt: string }>>(
      groq`*[_type == "manufacturer" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/manufacturers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/territory`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const dynamicPages: MetadataRoute.Sitemap = [
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...manufacturers.map((m) => ({
      url: `${SITE_URL}/manufacturers/${m.slug}`,
      lastModified: new Date(m._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticPages, ...dynamicPages]
}
