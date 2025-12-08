import ManufacturerDetailClient, { type ManufacturerDetail } from "./ManufacturerDetailClient"
import { sanityClient } from "@/lib/sanity.client"
import { allManufacturerSlugsQuery, manufacturerBySlugQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

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
  const slugs: Array<{ slug: string }> = await sanityClient.fetch(allManufacturerSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ManufacturerPage({ params }: { params: { slug: string } }) {
  const data = await sanityClient.fetch<ManufacturerResult | null>(manufacturerBySlugQuery, {
    slug: params.slug,
  })

  if (!data) {
    return notFound()
  }

  const manufacturer: ManufacturerDetail = {
    slug: params.slug,
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

