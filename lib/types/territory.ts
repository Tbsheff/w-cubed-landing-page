export type ServedCounty = {
  state: string
  county: string
}

export type RepCoverage = {
  slug: string
  name: string
  role?: string | null
  phone?: string | null
  email?: string | null
  photoUrl?: string | null
  servedStates: string[]
  servedCounties: ServedCounty[]
}

export type TerritoryInfo = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  businessHours?: Array<{ label?: string | null; value?: string | null }> | null
}

