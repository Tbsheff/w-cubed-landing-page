import type { Metadata } from 'next'

const SITE_URL = 'https://wcubedinc.com'
const SITE_NAME = 'W-Cubed'
const DEFAULT_DESCRIPTION = 'Water-process equipment experts serving Utah, Nevada, Idaho, and Wyoming since 1986.'
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
  const image = opts.image

  const imageFields = image
    ? { images: [{ url: image, width: 1200, height: 630 }] }
    : {}

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      ...imageFields,
      type: opts.type || 'website',
      ...(opts.publishedTime && { publishedTime: opts.publishedTime }),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image && { images: [image] }),
    },
    alternates: { canonical: url },
  }
}
