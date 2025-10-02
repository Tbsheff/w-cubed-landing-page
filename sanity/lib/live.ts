import { client } from './client'
import type { QueryParams } from 'next-sanity'

type SanityFetchArgs<TParams extends QueryParams = QueryParams> = {
  query: string
  params?: TParams
}

export async function sanityFetch<TResult, TParams extends QueryParams = QueryParams>({
  query,
  params,
}: SanityFetchArgs<TParams>): Promise<TResult> {
  if (params && Object.keys(params).length > 0) {
    return client.fetch<TResult>(query, params)
  }
  return client.fetch<TResult>(query)
}
