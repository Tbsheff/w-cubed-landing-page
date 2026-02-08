import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import type { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlForImage(value).width(800).fit('max').auto('format').url()
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
