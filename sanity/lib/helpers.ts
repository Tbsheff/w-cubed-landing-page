import { urlFor } from './image'
import type { SanityImageAssetDocument } from 'next-sanity'

/**
 * Get URL for salesperson photo with appropriate sizing
 * Returns placeholder if no photo provided
 */
export function getSalespersonPhotoUrl(
  photo?: SanityImageAssetDocument | null,
  options: { width?: number; height?: number } = {}
): string {
  const { width = 160, height = 160 } = options

  if (!photo) {
    return `/placeholder.svg?height=${height}&width=${width}&text=Photo`
  }

  return urlFor(photo).width(width).height(height).url()
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
