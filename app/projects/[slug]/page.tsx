import { sanityClient } from '@/lib/sanity.client'
import { projectBySlugQuery, allProjectSlugsQuery } from '@/lib/sanity.queries'
import ProjectClient from './ProjectClient'
import { notFound } from 'next/navigation'
import { urlForImage } from '@/lib/sanity.image'

export const dynamic = 'force-static'

export async function generateStaticParams() {
    const slugs: Array<{ slug: string }> = await sanityClient.fetch(allProjectSlugsQuery)
    return slugs.map(({ slug }) => ({ slug }))
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    type ProjectResult = {
        title: string
        excerpt?: string
        imageUrl?: string
        mainImage?: any
        date?: string
        categories?: Array<{ title?: string }>
        body?: any
    }

    const data = await sanityClient.fetch<ProjectResult>(projectBySlugQuery, { slug: params.slug })

    if (!data) return notFound()

    const project = {
        title: data.title,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl || (data.mainImage ? urlForImage(data.mainImage).width(1200).height(600).url() : undefined),
        date: data.date,
        categories: (data.categories || []).map((c) => c.title as string).filter(Boolean),
        body: data.body,
        slug: params.slug,
        related: [],
    }

    return <ProjectClient project={project} />
}


