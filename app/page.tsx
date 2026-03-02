import HomePageClient from "./HomePageClient"
import { sanityClient } from "@/lib/sanity.client"
import { siteSettingsQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"

export const dynamic = "force-static"

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
  heroSlides?: Array<{
    image?: any
    alt?: string | null
    tags?: string[] | null
    slideLabel?: string | null
    slideTitle?: string | null
  }> | null
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

export default async function Page() {
  const data = await sanityClient.fetch<SiteSettingsResult | null>(siteSettingsQuery)

  if (!data) throw new Error("CMS siteSettings missing")

  const manufacturers =
    data.manufacturerStrip?.map((m) => {
      if (!m.slug) throw new Error("CMS manufacturer missing slug")
      return {
        id: m.slug,
        name: m.name,
        logo:
          m.logoUrl ||
          (m.logo ? urlForImage(m.logo).width(240).height(120).fit("max").url() : "/placeholder.svg"),
      }
    }) || []

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

  if (!data.heroTitle || !data.heroDescription) throw new Error("CMS hero content missing")
  if (!stats.length) throw new Error("CMS stats missing")
  if (!manufacturers.length) throw new Error("CMS manufacturers strip missing")
  if (!highlights.length) throw new Error("CMS highlights missing")

  const hero = {
    badge: data.heroBadge,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImage: data.heroImage ? urlForImage(data.heroImage).width(900).height(700).fit("max").url() : null,
    heroSlides:
      data.heroSlides
        ?.filter((slide) => slide?.image)
        .map((slide) => ({
          image: slide.image ? urlForImage(slide.image).width(900).height(700).fit("max").url() : null,
          alt: slide.alt,
          tags: (slide.tags || []).filter(Boolean),
          slideLabel: slide.slideLabel,
          slideTitle: slide.slideTitle,
        })) || [],
    primaryCta: data.primaryCta,
    secondaryCta: data.secondaryCta,
  }

  return (
    <HomePageClient
      hero={hero}
      stats={stats}
      manufacturers={manufacturers}
      highlights={highlights}
    />
  )
}

