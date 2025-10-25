import type { TerritoryData, LegacyTerritoryData } from '@/types/sanity'
import { getSalespersonPhotoUrl } from '@/sanity/lib/helpers'

/**
 * Adapts Sanity territory data to the legacy format expected by map components
 * This allows us to use Sanity CMS without refactoring the entire map component
 */
export function adaptTerritoryDataToLegacyFormat(
  data: TerritoryData
): LegacyTerritoryData {
  // Create REP_INFO structure from salespeople
  const REP_INFO = data.salespeople.reduce(
    (acc, salesperson) => {
      acc[salesperson._id] = {
        id: salesperson._id,
        name: salesperson.name,
        email: salesperson.email,
        phone: salesperson.phone,
        photo: getSalespersonPhotoUrl(salesperson.photo),
      }
      return acc
    },
    {} as Record<string, any>
  )

  // Create county-to-rep mapping by FIPS code
  const countyToRepMap = data.counties.reduce(
    (acc, county) => {
      if (county.salesperson && county.salesperson.active) {
        acc[county.fipsCode] = county.salesperson._id
      }
      return acc
    },
    {} as Record<string, string>
  )

  // Create served counties by state (Set of lowercase county names)
  const SERVED_COUNTIES = data.counties
    .filter((county) => county.served)
    .reduce(
      (acc, county) => {
        if (!acc[county.stateCode]) {
          acc[county.stateCode] = new Set<string>()
        }
        acc[county.stateCode].add(county.name.toLowerCase())
        return acc
      },
      {} as Record<string, Set<string>>
    )

  return {
    REP_INFO,
    countyToRepMap,
    SERVED_COUNTIES,
  }
}

/**
 * Get rep ID for a specific county by FIPS code
 */
export function getRepIdByFips(
  legacyData: LegacyTerritoryData,
  fipsCode: string
): string | undefined {
  return legacyData.countyToRepMap[fipsCode]
}

/**
 * Check if a county is served based on state code and county name
 */
export function isCountyServed(
  legacyData: LegacyTerritoryData,
  stateCode: string,
  countyName: string
): boolean {
  const servedSet = legacyData.SERVED_COUNTIES[stateCode]
  if (!servedSet) return false
  return servedSet.has(countyName.trim().toLowerCase())
}
