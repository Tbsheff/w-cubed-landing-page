import { sanityFetch } from './live'
import type { TerritoryData, County } from '@/types/sanity'

/**
 * Fetch all territory data including salespeople and counties
 * This is the primary query for map components
 */
export async function getTerritoryData(): Promise<TerritoryData> {
  const query = `{
    "salespeople": *[_type == "salesperson" && active == true] | order(name asc) {
      _id,
      _type,
      name,
      email,
      phone,
      photo {
        asset-> {
          _id,
          url
        }
      },
      active
    },
    "counties": *[_type == "county"] | order(stateCode asc, name asc) {
      _id,
      _type,
      name,
      stateCode,
      fipsCode,
      served,
      salesperson-> {
        _id,
        _type,
        name,
        email,
        phone,
        photo {
          asset-> {
            _id,
            url
          }
        },
        active
      }
    }
  }`

  const data = await sanityFetch<TerritoryData>({
    query,
  })

  return data
}

/**
 * Get all counties for a specific state
 */
export async function getCountiesByState(stateCode: string): Promise<County[]> {
  const query = `*[_type == "county" && stateCode == $stateCode] | order(name asc) {
    _id,
    _type,
    name,
    stateCode,
    fipsCode,
    served,
    salesperson-> {
      _id,
      _type,
      name,
      email,
      phone,
      photo {
        asset-> {
          _id,
          url
        }
      },
      active
    }
  }`

  const data = await sanityFetch<County[]>({
    query,
    params: { stateCode },
  })

  return data
}

/**
 * Get salesperson assigned to a specific county by FIPS code
 */
export async function getSalespersonByFips(fipsCode: string) {
  const query = `*[_type == "county" && fipsCode == $fipsCode][0] {
    salesperson-> {
      _id,
      _type,
      name,
      email,
      phone,
      photo {
        asset-> {
          _id,
          url
        }
      },
      active
    }
  }`

  const data = await sanityFetch<{ salesperson: any }>({
    query,
    params: { fipsCode },
  })

  return data?.salesperson || null
}

/**
 * Get all served counties (for service area display)
 */
export async function getServedCounties(): Promise<County[]> {
  const query = `*[_type == "county" && served == true] | order(stateCode asc, name asc) {
    _id,
    _type,
    name,
    stateCode,
    fipsCode,
    served,
    salesperson-> {
      _id,
      _type,
      name,
      email,
      phone,
      photo {
        asset-> {
          _id,
          url
        }
      },
      active
    }
  }`

  const data = await sanityFetch<County[]>({
    query,
  })

  return data
}
