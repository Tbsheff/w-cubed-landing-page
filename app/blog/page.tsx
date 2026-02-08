import BlogListClient from "./BlogListClient"
import { sanityClient } from "@/lib/sanity.client"
import { postsListQuery, categoriesListQuery, authorsListQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Industry insights, technical guides, and news about water treatment equipment and solutions.",
  path: "/blog",
})

type PostsListResultItem = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  date?: string
  mainImage?: any
  imageUrl?: string
  author?: { name?: string }
  categories?: Array<{ title?: string }>
}

export default async function BlogPage() {
  const [result, categoriesResult, authorsResult] = await Promise.all([
    sanityClient.fetch<PostsListResultItem[]>(postsListQuery),
    sanityClient.fetch<Array<{ title?: string }>>(categoriesListQuery),
    sanityClient.fetch<Array<{ name?: string }>>(authorsListQuery),
  ])
  const posts = result.map((p) => ({
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.imageUrl || (p.mainImage ? urlForImage(p.mainImage).width(600).height(400).url() : null),
    date: p.date,
    author: p.author?.name,
    category: p.categories?.[0]?.title,
    readTime: undefined,
    tags: (p.categories || []).map((c) => c.title as string).filter(Boolean),
    featured: false,
  }))

  const categories = categoriesResult
    .map((c) => c.title)
    .filter(Boolean) as string[]
  const authors = authorsResult
    .map((a) => a.name)
    .filter(Boolean) as string[]

  return <BlogListClient posts={posts} categories={categories} authors={authors} />
}
