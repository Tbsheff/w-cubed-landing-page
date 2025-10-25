/**
 * Feature flags for gradual rollout of new features
 */

/**
 * Check if we should use Sanity CMS for territory data
 * Set NEXT_PUBLIC_USE_SANITY_TERRITORIES=true to enable
 * Defaults to false for safety
 */
export function useSanityTerritories(): boolean {
  return process.env.NEXT_PUBLIC_USE_SANITY_TERRITORIES === 'true'
}
