import { sanityClient } from '@/lib/sanity.client'
import { projectBySlugQuery, allProjectSlugsQuery } from '@/lib/sanity.queries'
import ProjectClient from './ProjectClient'
import { notFound } from 'next/navigation'
import { urlForImage } from '@/lib/sanity.image'
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import groq from "groq"

export const revalidate = 3600

export async function generateStaticParams() {
    try {
        const slugs: Array<{ slug: string }> = await sanityClient.fetch(allProjectSlugsQuery)
        return slugs.map(({ slug }) => ({ slug }))
    } catch {
        return []
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await sanityClient.fetch<{ title: string; excerpt?: string; imageUrl?: string } | null>(
    groq`*[_type == "project" && slug.current == $slug][0]{ title, "excerpt": coalesce(excerpt, body[0].children[0].text), "imageUrl": mainImage.asset->url }`,
    { slug }
  )
  if (!data) return {}
  return buildMetadata({ title: data.title, description: data.excerpt, path: `/projects/${slug}`, image: data.imageUrl })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    type ProjectResult = {
        title: string
        excerpt?: string
        imageUrl?: string
        mainImage?: any
        date?: string
        categories?: Array<{ title?: string }>
        body?: any
    }

    const data = await sanityClient.fetch<ProjectResult>(projectBySlugQuery, { slug })

    if (!data) return notFound()

    const project = {
        title: data.title,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl || (data.mainImage ? urlForImage(data.mainImage).width(1200).height(600).url() : undefined),
        date: data.date,
        categories: (data.categories || []).map((c) => c.title as string).filter(Boolean),
        body: data.body,
        slug: slug,
        related: [],
    }

    return <ProjectClient project={project} />
}
