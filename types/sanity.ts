import type { SanityImageAssetDocument } from 'next-sanity'

// Sanity image asset structure as returned by GROQ queries
export interface SanityImageAsset {
  asset?: {
    _id: string
    url: string
  }
}

export interface Salesperson {
  _id: string
  _type: 'salesperson'
  name: string
  email: string
  phone: string
  photo?: SanityImageAsset
  active: boolean
}

export interface County {
  _id: string
  _type: 'county'
  name: string
  stateCode: string
  fipsCode: string
  served: boolean
  salesperson?: Salesperson
}

export interface TerritoryData {
  salespeople: Salesperson[]
  counties: County[]
}

// Legacy format types (for adapter compatibility)
export interface LegacyRepInfo {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
}

export interface LegacyTerritoryData {
  REP_INFO: Record<string, LegacyRepInfo>
  countyToRepMap: Record<string, string> // FIPS -> Rep ID
  SERVED_COUNTIES: Record<string, Set<string>> // State -> County names
}
