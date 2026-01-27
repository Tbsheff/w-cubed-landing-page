import ContactClient from "./ContactClient"
import { sanityClient } from "@/lib/sanity.client"
import { representativesQuery, territoryInfoQuery } from "@/lib/sanity.queries"
import { normalizeReps } from "@/lib/territory-normalize"
import type { RepCoverage, TerritoryInfo } from "@/lib/types/territory"

export const dynamic = "force-static"

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
  const representatives = await sanityClient.fetch<RepresentativeResult[]>(representativesQuery)
  const territoryInfo = await sanityClient.fetch<TerritoryInfoResult | null>(territoryInfoQuery)

  if (!territoryInfo) {
    throw new Error("CMS territoryInfo missing")
  }

  const normalizedReps: RepCoverage[] = normalizeReps(representatives || [])

  return (
    <ContactClient
      representatives={normalizedReps}
      territoryInfo={territoryInfo as TerritoryInfo}
    />
  )
}

