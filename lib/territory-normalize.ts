import { urlForImage } from "@/lib/sanity.image"
import type { RepCoverage, ServedCounty } from "@/lib/types/territory"

type RawRep = {
  slug?: string | null
  name?: string | null
  role?: string | null
  phone?: string | null
  email?: string | null
  servedStates?: (string | null | undefined)[]
  servedCounties?: Array<ServedCounty | null | undefined>
  photo?: any
  photoUrl?: string | null
}

const normalizeState = (value?: string | null) =>
  value ? value.trim().toUpperCase() : ""

const normalizeCounty = (value?: string | null) =>
  value ? value.trim().toLowerCase() : ""

export function normalizeReps(raw: RawRep[]): RepCoverage[] {
  return raw
    .filter((rep) => rep?.slug && rep?.name)
    .map((rep) => {
      const servedStates = (rep.servedStates || [])
        .map(normalizeState)
        .filter(Boolean)
      const servedCounties =
        (rep.servedCounties || [])
          .map((item) => {
            if (!item) return null
            const state = normalizeState(item.state)
            const county = normalizeCounty(item.county)
            if (!state || !county) return null
            return { state, county }
          })
          .filter(Boolean) as ServedCounty[]

      const photoUrl =
        rep.photoUrl ||
        (rep.photo ? urlForImage(rep.photo).width(200).height(200).fit("crop").url() : null)

      return {
        slug: rep.slug as string,
        name: rep.name as string,
        role: rep.role ?? null,
        phone: rep.phone ?? null,
        email: rep.email ?? null,
        photoUrl,
        servedStates,
        servedCounties,
      }
    })
}

