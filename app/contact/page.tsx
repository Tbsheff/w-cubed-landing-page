import ContactClient from "./ContactClient"
import { sanityClient } from "@/lib/sanity.client"
import { representativesQuery, territoryInfoQuery } from "@/lib/sanity.queries"

export const dynamic = "force-static"

type RepresentativeResult = {
  name: string
  role?: string | null
  phone?: string | null
  email?: string | null
  states?: string[] | null
}

type TerritoryInfoResult = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  businessHours?: Array<{ label?: string | null; value?: string | null }>
}

export default async function ContactPage() {
  const representatives = await sanityClient.fetch<RepresentativeResult[]>(representativesQuery)
  const territoryInfo = await sanityClient.fetch<TerritoryInfoResult | null>(territoryInfoQuery)

  if (!representatives || representatives.length === 0) {
    throw new Error("CMS representatives missing")
  }
  if (!territoryInfo) {
    throw new Error("CMS territoryInfo missing")
  }

  const normalizedReps =
    representatives.map((rep) => ({
      ...rep,
      role: rep.role ?? undefined,
      phone: rep.phone ?? undefined,
      email: rep.email ?? undefined,
      states: rep.states ?? undefined,
    })) || []

  return <ContactClient representatives={normalizedReps} territoryInfo={territoryInfo} />
}

