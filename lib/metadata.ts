import type { Metadata } from 'next'

const SITE_URL = 'https://wcubedinc.com'
const SITE_NAME = 'W-Cubed'
const DEFAULT_DESCRIPTION = 'Water-process equipment experts serving Utah, Nevada, Idaho, and Wyoming since 1986.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`

export function buildMetadata(opts: {
  title: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
}): Metadata {
  const title = opts.title
  const description = opts.description || DEFAULT_DESCRIPTION
  const url = opts.path ? `${SITE_URL}${opts.path}` : SITE_URL
  const image = opts.image || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630 }],
      type: opts.type || 'website',
      ...(opts.publishedTime && { publishedTime: opts.publishedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  }
}
