import type { SanityImageAsset } from '@/types/sanity'

/**
 * Get URL for salesperson photo with appropriate sizing
 * Returns placeholder if no photo provided
 */
export function getSalespersonPhotoUrl(
  photo?: SanityImageAsset | null,
  options: { width?: number; height?: number } = {}
): string {
  const { width = 160, height = 160 } = options

  if (!photo?.asset?.url) {
    return `/placeholder.svg?height=${height}&width=${width}&text=Photo`
  }

  // Return the URL directly from the GROQ query result
  // Note: This doesn't use urlFor because we're getting the URL directly from the query
  // If you need image transformations, update the GROQ query to include them
  return photo.asset.url
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')

  // Format as XXX-XXX-XXXX if 10 digits
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  // Return original if not 10 digits
  return phone
}
