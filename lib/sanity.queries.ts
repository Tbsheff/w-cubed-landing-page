import groq from 'groq'

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  publishedAt,
  "date": coalesce(publishedAt, _updatedAt),
  mainImage,
  "imageUrl": mainImage.asset->url,
  author->{ name, image },
  categories[]->{ title },
  body
}`

export const allPostSlugsQuery = groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`

export const postsListQuery = groq`*[_type == "post"]|order(coalesce(publishedAt,_updatedAt) desc){
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  "date": coalesce(publishedAt, _updatedAt),
  mainImage,
  "imageUrl": mainImage.asset->url,
  author->{ name },
  categories[]->{ title }
}`
