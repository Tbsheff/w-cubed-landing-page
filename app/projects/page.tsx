import ProjectsListClient from "./ProjectsListClient"
import { sanityClient } from "@/lib/sanity.client"
import { projectsListQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"

export const dynamic = 'force-static'

type ProjectsListResultItem = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  date?: string
  mainImage?: any
  imageUrl?: string
  categories?: Array<{ title?: string }>
}

export default async function ProjectsPage() {
  const result = await sanityClient.fetch<ProjectsListResultItem[]>(projectsListQuery)
  const projects = result.map((p) => ({
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.imageUrl || (p.mainImage ? urlForImage(p.mainImage).width(600).height(400).url() : null),
    date: p.date,
    category: p.categories?.[0]?.title,
    tags: (p.categories || []).map((c) => c.title as string).filter(Boolean),
    featured: false,
  }))

  return <ProjectsListClient projects={projects} />
}
