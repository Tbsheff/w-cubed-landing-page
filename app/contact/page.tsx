import type { Metadata } from "next"
import ContactClient from "./ContactClient"
import { sanityClient } from "@/lib/sanity.client"
import { representativesQuery, territoryInfoQuery } from "@/lib/sanity.queries"
import { normalizeReps } from "@/lib/territory-normalize"
import { buildMetadata } from "@/lib/metadata"
import type { RepCoverage, TerritoryInfo } from "@/lib/types/territory"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with W-Cubed for water treatment equipment solutions, project quotes, and technical support.",
  path: "/contact",
})

type RepresentativeResult = {
  name: string
  slug?: string | null
  role?: string | null
  phone?: string | null
  email?: string | null
  servedStates?: string[] | null
  servedCounties?: Array<{ state?: string | null; county?: string | null }> | null
  photo?: any
}

type TerritoryInfoResult = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  businessHours?: Array<{ label?: string | null; value?: string | null }>
}

export default async function ContactPage() {
  let representatives: RepresentativeResult[] = []
  let territoryInfo: TerritoryInfoResult | null = null
  try {
    ;[representatives, territoryInfo] = await Promise.all([
      sanityClient.fetch<RepresentativeResult[]>(representativesQuery),
      sanityClient.fetch<TerritoryInfoResult | null>(territoryInfoQuery),
    ])
  } catch {
    // Sanity unreachable; render with fallback data
  }

  const normalizedReps: RepCoverage[] = normalizeReps(representatives || [])

  return (
    <ContactClient
      representatives={normalizedReps}
      territoryInfo={territoryInfo ?? undefined}
    />
  )
}
