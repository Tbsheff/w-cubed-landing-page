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
  "imageAlt": mainImage.alt,
  author->{ name, image },
  categories[]->{ title },
  body
}`

export const allPostSlugsQuery = groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`

export const postsListQuery = groq`*[_type == "post" && defined(slug.current)]|order(coalesce(publishedAt,_updatedAt) desc){
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  "date": coalesce(publishedAt, _updatedAt),
  mainImage,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  author->{ name },
  categories[]->{ title }
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  publishedAt,
  "date": coalesce(publishedAt, _updatedAt),
  mainImage,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  categories[]->{ title },
  body
}`

export const allProjectSlugsQuery = groq`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`

export const projectsListQuery = groq`*[_type == "project" && defined(slug.current)]|order(coalesce(publishedAt,_updatedAt) desc){
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  "date": coalesce(publishedAt, _updatedAt),
  mainImage,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  categories[]->{ title }
}`

export const allManufacturerSlugsQuery = groq`*[_type == "manufacturer" && defined(slug.current)]{ "slug": slug.current }`

export const manufacturersListQuery = groq`*[_type == "manufacturer" && defined(slug.current)]|order(coalesce(order, 9999) asc, name asc){
  _id,
  name,
  "slug": slug.current,
  category,
  description,
  specialty,
  keyProducts,
  website,
  territoryNote,
  featured,
  order,
  logo,
  "logoUrl": logo.asset->url,
  "logoAlt": logo.alt
}`

export const manufacturerBySlugQuery = groq`*[_type == "manufacturer" && slug.current == $slug][0]{
  _id,
  _updatedAt,
  name,
  "slug": slug.current,
  category,
  description,
  specialty,
  keyProducts,
  website,
  territoryNote,
  featured,
  order,
  logo,
  "logoUrl": logo.asset->url,
  "logoAlt": logo.alt
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  heroBadge,
  heroTitle,
  heroDescription,
  heroImage,
  "heroImageAlt": heroImage.alt,
  primaryCta,
  secondaryCta,
  stats,
  manufacturerStrip[]->{
    name,
    "slug": slug.current,
    category,
    logo,
    "logoUrl": logo.asset->url
  },
  highlights[]{
    title,
    description,
    category,
    states,
    image,
    "imageAlt": image.alt
  }
}`

export const representativesQuery = groq`*[_type == "representative"]|order(coalesce(order, 9999) asc, name asc){
  name,
  "slug": slug.current,
  role,
  phone,
  email,
  states,
  regions,
  servedStates,
  servedCounties[]{
    state,
    county
  },
  photo,
  "photoAlt": photo.alt
}`

export const territoryInfoQuery = groq`*[_type == "territoryInfo"][0]{
  heroTitle,
  heroSubtitle,
  primaryCta,
  secondaryCta,
  coverageBlurb,
  businessHours
}`

export const categoriesListQuery = groq`*[_type == "category"]{ title }`

export const authorsListQuery = groq`*[_type == "author"]{ name }`

export const relatedPostsQuery = groq`*[_type == "post" && slug.current != $slug && count(categories[]->_id[@ in $categoryIds]) > 0] | order(coalesce(publishedAt, _updatedAt) desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  "date": coalesce(publishedAt, _updatedAt),
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt
}`

export const featuredPostsQuery = groq`*[_type == "post" && featured == true && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  "date": coalesce(publishedAt, _updatedAt),
  "imageUrl": mainImage.asset->url
}`
