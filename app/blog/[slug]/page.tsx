import { sanityClient } from '@/lib/sanity.client'
import { postBySlugQuery, allPostSlugsQuery } from '@/lib/sanity.queries'
import PostClient from './PostClient'
import { urlForImage } from '@/lib/sanity.image'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await sanityClient.fetch(allPostSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const data = await sanityClient.fetch(postBySlugQuery, { slug: params.slug })

  if (!data) return null

  const post = {
    title: data.title,
    excerpt: data.excerpt,
    imageUrl: data.imageUrl || (data.mainImage ? urlForImage(data.mainImage).width(1200).height(600).url() : undefined),
    date: data.date,
    authorName: data.author?.name,
    authorImageUrl: data.author?.image ? urlForImage(data.author.image).width(160).height(160).url() : undefined,
    categories: (data.categories || []).map((c: any) => c.title),
    body: data.body,
    slug: params.slug,
    related: [],
  }

  return <PostClient post={post} />
}
