import { urlForImage } from "@/lib/sanity.image"
import type { RepCoverage, ServedCounty } from "@/lib/types/territory"

type RawRep = {
  slug?: string | null
  name?: string | null
  role?: string | null
  phone?: string | null
  email?: string | null
  states?: (string | null | undefined)[] | null
  servedStates?: (string | null | undefined)[] | null
  servedCounties?: Array<{ state?: string | null; county?: string | null }> | null
  photo?: any
  photoUrl?: string | null
}

const SUPPORTED_STATE_CODES = new Set(["UT", "NV", "ID", "WY"])

const STATE_NAME_TO_CODE: Record<string, string> = {
  utah: "UT",
  nevada: "NV",
  idaho: "ID",
  wyoming: "WY",
}

const normalizeState = (value?: string | null) => {
  if (!value) return ""
  const trimmed = value.trim()
  if (!trimmed) return ""

  const directCode = trimmed.toUpperCase()
  if (SUPPORTED_STATE_CODES.has(directCode)) {
    return directCode
  }

  const fromName = STATE_NAME_TO_CODE[trimmed.toLowerCase()]
  return fromName && SUPPORTED_STATE_CODES.has(fromName) ? fromName : ""
}

const normalizeCounty = (value?: string | null) =>
  value ? value.trim().toLowerCase() : ""

const parseLegacyStates = (values?: (string | null | undefined)[] | null) =>
  (values || [])
    .flatMap((value) => (value ? value.split(/[,&/|]+/) : []))
    .map((value) => normalizeState(value))
    .filter(Boolean)

const dedupe = (values: string[]) => Array.from(new Set(values))

export function normalizeReps(raw: RawRep[]): RepCoverage[] {
  return raw
    .filter((rep) => rep?.slug && rep?.name)
    .map((rep) => {
      const fromNew = (rep.servedStates || []).map(normalizeState).filter(Boolean)
      const servedStates = dedupe(
        fromNew.length > 0 ? fromNew : parseLegacyStates(rep.states)
      )

      const servedCounties =
        (rep.servedCounties || [])
          .map((item) => {
            if (!item) return null
            const state = normalizeState(item.state)
            const county = normalizeCounty(item.county)
            if (!state || !county) return null
            return { state, county }
          })
          .filter(Boolean)
          .filter(
            (item, index, arr) =>
              arr.findIndex((other) => other?.state === item?.state && other?.county === item?.county) ===
              index
          ) as ServedCounty[]

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

