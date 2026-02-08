import type { Metadata } from "next"
import TerritoryClient from "./TerritoryClient"
import { sanityClient } from "@/lib/sanity.client"
import { territoryInfoQuery, representativesQuery } from "@/lib/sanity.queries"
import { normalizeReps } from "@/lib/territory-normalize"
import { buildMetadata } from "@/lib/metadata"
import type { RepCoverage, TerritoryInfo as TerritoryInfoType } from "@/lib/types/territory"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Territory Coverage",
  description: "W-Cubed serves Utah, Nevada, Idaho, and Wyoming with dedicated territory representatives.",
  path: "/territory",
})

type TerritoryInfoResult = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
}

export default async function TerritoryPage() {
  const [territoryInfo, repsRaw] = await Promise.all([
    sanityClient.fetch<TerritoryInfoResult | null>(territoryInfoQuery),
    sanityClient.fetch(representativesQuery),
  ])

  const reps: RepCoverage[] = normalizeReps(repsRaw || [])

  return (
    <TerritoryClient
      representatives={reps}
      heroTitle={territoryInfo?.heroTitle}
      heroSubtitle={territoryInfo?.heroSubtitle}
      primaryCta={territoryInfo?.primaryCta}
      secondaryCta={territoryInfo?.secondaryCta}
    />
  )
}

