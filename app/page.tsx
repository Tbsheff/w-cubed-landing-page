import HomePageClient from "./HomePageClient"
import { sanityClient } from "@/lib/sanity.client"
import { siteSettingsQuery, representativesQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"

export const revalidate = 3600

type ManufacturerStripItem = {
  slug: string
  name: string
  logo?: any
  logoUrl?: string | null
}

type SiteSettingsResult = {
  heroBadge?: string | null
  heroTitle?: string | null
  heroDescription?: string | null
  heroImage?: any
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  stats?: Array<{ value?: string | null; label?: string | null; detail?: string | null }>
  manufacturerStrip?: ManufacturerStripItem[] | null
  highlights?: Array<{
    title?: string | null
    description?: string | null
    category?: string | null
    states?: string[]
    image?: any
  }>
}

type RepresentativeResult = {
  name: string
  role?: string | null
  phone?: string | null
  email?: string | null
  states?: string[] | null
  photo?: any
  photoAlt?: string | null
}

export default async function Page() {
  const [data, repsData] = await Promise.all([
    sanityClient.fetch<SiteSettingsResult | null>(siteSettingsQuery),
    sanityClient.fetch<RepresentativeResult[]>(representativesQuery),
  ])

  if (!data) return <HomePageClient />

  const manufacturers =
    data.manufacturerStrip?.filter((m) => m.slug).map((m) => ({
      id: m.slug,
      name: m.name,
      logo:
        m.logoUrl ||
        (m.logo ? urlForImage(m.logo).width(240).height(120).fit("max").url() : "/placeholder.svg"),
    })) || []

  const highlights =
    data.highlights
      ?.filter((h) => h?.title)
      .map((h) => ({
        title: h.title as string,
        description: h.description,
        category: h.category,
        states: h.states,
        image: h.image ? urlForImage(h.image).width(600).height(400).fit("max").url() : null,
      })) || []

  const stats =
    data.stats
      ?.filter((s) => s?.value && s?.label)
      .map((s) => ({
        value: s.value as string,
        label: s.label as string,
        detail: s.detail,
      })) || []

  const hero = {
    badge: data.heroBadge,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImage: data.heroImage ? urlForImage(data.heroImage).width(900).height(700).fit("max").url() : null,
    primaryCta: data.primaryCta,
    secondaryCta: data.secondaryCta,
  }

  const representatives = repsData
    ?.filter((r) => r.name)
    .map((r) => ({
      name: r.name,
      role: r.role,
      phone: r.phone,
      email: r.email,
      territories: r.states ?? [],
      image: r.photo ? urlForImage(r.photo).width(300).height(300).fit("crop").url() : null,
    })) ?? []

  return (
    <HomePageClient
      hero={hero}
      stats={stats}
      manufacturers={manufacturers}
      highlights={highlights}
      representatives={representatives.length > 0 ? representatives : undefined}
    />
  )
}

