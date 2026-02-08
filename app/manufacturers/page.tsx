import ManufacturersClient, { type ManufacturerListItem } from "./ManufacturersClient"
import { sanityClient } from "@/lib/sanity.client"
import { manufacturersListQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Manufacturers",
  description: "Premium water treatment and process equipment from industry-leading manufacturers we represent.",
  path: "/manufacturers",
})

type ManufacturerQueryResult = {
  slug: string
  name: string
  category?: string | null
  description?: string | null
  specialty?: string | null
  keyProducts?: string[]
  website?: string | null
  territoryNote?: string | null
  logo?: any
  logoUrl?: string | null
}

export default async function ManufacturersPage() {
  const results = await sanityClient.fetch<ManufacturerQueryResult[]>(manufacturersListQuery)

  const manufacturers: ManufacturerListItem[] = results.map((m) => ({
    id: m.slug,
    name: m.name,
    category: m.category || null,
    description: m.description || null,
    specialty: m.specialty || null,
    keyProducts: m.keyProducts || [],
    website: m.website || null,
    territoryNote: m.territoryNote || null,
    logo:
      m.logoUrl ||
      (m.logo ? urlForImage(m.logo).width(400).height(200).fit("max").url() : "/placeholder.svg"),
  }))

  return <ManufacturersClient manufacturers={manufacturers} />
}
