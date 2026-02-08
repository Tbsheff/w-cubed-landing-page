import ManufacturerDetailClient, { type ManufacturerDetail } from "./ManufacturerDetailClient"
import { sanityClient } from "@/lib/sanity.client"
import { allManufacturerSlugsQuery, manufacturerBySlugQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import groq from "groq"

export const revalidate = 3600

type ManufacturerResult = {
  slug: string
  name: string
  category?: string | null
  description?: string | null
  keyProducts?: string[]
  website?: string | null
  specialty?: string | null
  territoryNote?: string | null
  logo?: any
  logoUrl?: string | null
}

export async function generateStaticParams() {
  try {
    const slugs: Array<{ slug: string }> = await sanityClient.fetch(allManufacturerSlugsQuery)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await sanityClient.fetch<{ name: string; description?: string; logoUrl?: string } | null>(
    groq`*[_type == "manufacturer" && slug.current == $slug][0]{ name, description, "logoUrl": logo.asset->url }`,
    { slug }
  )
  if (!data) return {}
  return buildMetadata({ title: data.name, description: data.description, path: `/manufacturers/${slug}`, image: data.logoUrl })
}

export default async function ManufacturerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await sanityClient.fetch<ManufacturerResult | null>(manufacturerBySlugQuery, {
    slug,
  })

  if (!data) {
    return notFound()
  }

  const manufacturer: ManufacturerDetail = {
    slug: slug,
    name: data.name,
    category: data.category,
    description: data.description,
    keyProducts: data.keyProducts || [],
    website: data.website,
    specialty: data.specialty,
    territoryNote: data.territoryNote,
    logo:
      data.logoUrl ||
      (data.logo ? urlForImage(data.logo).width(500).height(240).fit("max").url() : undefined),
  }

  return <ManufacturerDetailClient manufacturer={manufacturer} />
}
