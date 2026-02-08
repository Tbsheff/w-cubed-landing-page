import ProjectsListClient from "./ProjectsListClient"
import { sanityClient } from "@/lib/sanity.client"
import { projectsListQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Explore our portfolio of water treatment, pumping, and process equipment projects across the Mountain West.",
  path: "/projects",
})

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
  let result: ProjectsListResultItem[] = []
  try {
    result = await sanityClient.fetch<ProjectsListResultItem[]>(projectsListQuery)
  } catch {
    // Sanity unreachable; render with empty data
  }
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
