import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    // Disable CDN to avoid stale/null responses during active authoring
    useCdn: false,
})
