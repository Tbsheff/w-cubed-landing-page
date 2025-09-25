import BlogListClient from "./BlogListClient"
import { sanityClient } from "@/lib/sanity.client"
import { postsListQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"

export const dynamic = 'force-static'

export default async function BlogPage() {
  const result = await sanityClient.fetch(postsListQuery)
  const posts = result.map((p: any) => ({
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.imageUrl || (p.mainImage ? urlForImage(p.mainImage).width(600).height(400).url() : null),
    date: p.date,
    author: p.author?.name,
    category: p.categories?.[0]?.title,
    readTime: undefined,
    tags: (p.categories || []).map((c: any) => c.title),
    featured: false,
  }))

  return <BlogListClient posts={posts} />
}
