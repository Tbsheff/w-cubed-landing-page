import { sanityClient } from '@/lib/sanity.client'
import { postBySlugQuery, allPostSlugsQuery } from '@/lib/sanity.queries'
import PostClient from './PostClient'
import { notFound } from 'next/navigation'
import { urlForImage } from '@/lib/sanity.image'
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import groq from "groq"

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await sanityClient.fetch(allPostSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await sanityClient.fetch<{ title: string; excerpt?: string; imageUrl?: string; publishedAt?: string } | null>(
    groq`*[_type == "post" && slug.current == $slug][0]{ title, "excerpt": coalesce(excerpt, body[0].children[0].text), "imageUrl": mainImage.asset->url, publishedAt }`,
    { slug }
  )
  if (!data) return {}
  return buildMetadata({
    title: data.title,
    description: data.excerpt,
    path: `/blog/${slug}`,
    image: data.imageUrl,
    type: 'article',
    publishedTime: data.publishedAt,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
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

  const data = await sanityClient.fetch<PostResult>(postBySlugQuery, { slug })

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
    slug: slug,
    related: [],
  }

  return <PostClient post={post} />
}
