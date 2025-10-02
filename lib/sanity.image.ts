import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { sanityClient } from './sanity.client'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: Image | string) {
    return builder.image(source)
}
