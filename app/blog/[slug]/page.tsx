import { sanityClient } from '@/lib/sanity.client'
import { postBySlugQuery, allPostSlugsQuery } from '@/lib/sanity.queries'
import PostClient from './PostClient'
import { notFound } from 'next/navigation'
import { urlForImage } from '@/lib/sanity.image'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await sanityClient.fetch(allPostSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  type PostResult = {
    title: string
    excerpt?: string
    imageUrl?: string
    mainImage?: any
    date?: string
    author?: { name?: string; image?: any }
    categories?: Array<{ title?: string }>
    body?: any
  }

  const data = await sanityClient.fetch<PostResult>(postBySlugQuery, { slug: params.slug })

  if (!data) return notFound()

  const post = {
    title: data.title,
    excerpt: data.excerpt,
    imageUrl: data.imageUrl || (data.mainImage ? urlForImage(data.mainImage).width(1200).height(600).url() : undefined),
    date: data.date,
    authorName: data.author?.name,
    authorImageUrl: data.author?.image ? urlForImage(data.author.image).width(160).height(160).url() : undefined,
    categories: (data.categories || []).map((c) => c.title as string).filter(Boolean),
    body: data.body,
    slug: params.slug,
    related: [],
  }

  return <PostClient post={post} />
}
