import TerritoryClient from "./TerritoryClient"
import { sanityClient } from "@/lib/sanity.client"
import { territoryInfoQuery } from "@/lib/sanity.queries"

export const dynamic = "force-static"

type TerritoryInfoResult = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
}

export default async function TerritoryPage() {
  const territoryInfo = await sanityClient.fetch<TerritoryInfoResult | null>(territoryInfoQuery)

  if (!territoryInfo) {
    throw new Error("CMS territoryInfo missing")
  }

  return (
    <TerritoryClient
      heroTitle={territoryInfo?.heroTitle}
      heroSubtitle={territoryInfo?.heroSubtitle}
      primaryCta={territoryInfo?.primaryCta}
      secondaryCta={territoryInfo?.secondaryCta}
    />
  )
}

