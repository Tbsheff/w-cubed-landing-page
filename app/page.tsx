import HomePageClient from "./HomePageClient"
import { sanityClient } from "@/lib/sanity.client"
import { siteSettingsQuery, representativesQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import type { Image } from "sanity"

export const dynamic = "force-static"

type ManufacturerStripItem = {
  slug: string
  name: string
  logo?: Image
  logoUrl?: string | null
}

type SiteSettingsResult = {
  heroBadge?: string | null
  heroTitle?: string | null
  heroDescription?: string | null
  heroImage?: Image
  heroSlides?: Array<{
    image?: Image
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
    image?: Image
  }>
}

type RepResult = {
  name: string
  slug: string
  role?: string | null
  phone?: string | null
  email?: string | null
  states?: string[] | null
  regions?: string | null
  photo?: Image
}

export default async function Page() {
  const [data, repsRaw] = await Promise.all([
    sanityClient.fetch<SiteSettingsResult | null>(siteSettingsQuery),
    sanityClient.fetch<RepResult[]>(representativesQuery),
  ])

  if (!data) throw new Error("CMS siteSettings missing")

  const manufacturers =
    data.manufacturerStrip
      ?.filter((m) => Boolean(m.slug))
      .map((m) => {
      return {
        id: m.slug,
        name: m.name,
        logo: m.logo
          ? urlForImage(m.logo).width(180).height(90).fit("max").auto("format").quality(60).url()
          : m.logoUrl || "/placeholder.svg",
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
        image: h.image
          ? urlForImage(h.image).width(540).height(360).fit("max").auto("format").quality(60).url()
          : null,
      })) || []

  const stats =
    data.stats
      ?.filter((s) => s?.value && s?.label)
      .map((s) => ({
        value: s.value as string,
        label: s.label as string,
        detail: s.detail,
      })) || []

  const representatives = (repsRaw || []).map((rep) => ({
    name: rep.name,
    title: rep.regions || "",
    territories: rep.states || [],
    phone: rep.phone || "",
    email: rep.email || "",
    role: rep.role || "",
    image: rep.photo
      ? urlForImage(rep.photo).width(128).height(128).fit("crop").auto("format").quality(62).url()
      : undefined,
  }))

  if (!data.heroTitle || !data.heroDescription) throw new Error("CMS hero content missing")
  if (!stats.length) throw new Error("CMS stats missing")
  if (!manufacturers.length) throw new Error("CMS manufacturers strip missing")
  if (!highlights.length) throw new Error("CMS highlights missing")

  const hero = {
    badge: data.heroBadge,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImage: data.heroImage
      ? urlForImage(data.heroImage).width(760).height(570).fit("max").auto("format").quality(60).url()
      : null,
    heroSlides:
      data.heroSlides
        ?.filter((slide) => slide?.image)
        .map((slide) => ({
          image: slide.image
            ? urlForImage(slide.image).width(760).height(570).fit("max").auto("format").quality(60).url() ?? ""
            : "",
          alt: slide.alt ?? "",
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
      representatives={representatives}
    />
  )
}
