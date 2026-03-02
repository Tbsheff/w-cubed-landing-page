import TerritoryClient from "./TerritoryClient"
import { sanityClient } from "@/lib/sanity.client"
import { territoryInfoQuery, representativesQuery } from "@/lib/sanity.queries"
import { normalizeReps } from "@/lib/territory-normalize"
import type { RepCoverage, TerritoryInfo as TerritoryInfoType } from "@/lib/types/territory"

export const dynamic = "force-static"

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

  const safeTerritoryInfo = territoryInfo ?? {}

  const reps: RepCoverage[] = normalizeReps(repsRaw || [])

  return (
    <TerritoryClient
      representatives={reps}
      heroTitle={safeTerritoryInfo.heroTitle}
      heroSubtitle={safeTerritoryInfo.heroSubtitle}
      primaryCta={safeTerritoryInfo.primaryCta}
      secondaryCta={safeTerritoryInfo.secondaryCta}
    />
  )
}

