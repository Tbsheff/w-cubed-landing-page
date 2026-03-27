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
  categories[]->{ title },
  body
}`

export const allProjectSlugsQuery = groq`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`

export const projectsListQuery = groq`*[_type == "project"]|order(coalesce(publishedAt,_updatedAt) desc){
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, body[0].children[0].text),
  "date": coalesce(publishedAt, _updatedAt),
  mainImage,
  "imageUrl": mainImage.asset->url,
  categories[]->{ title }
}`

export const allManufacturerSlugsQuery = groq`*[_type == "manufacturer" && defined(slug.current)]{ "slug": slug.current }`

export const manufacturersListQuery = groq`*[_type == "manufacturer"]|order(coalesce(order, 9999) asc, name asc){
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
  "logoUrl": logo.asset->url
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
  "logoUrl": logo.asset->url
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  heroBadge,
  heroEyebrow,
  heroTitle,
  heroDescription,
  heroImage,
  companyStoryImage,
  companyStoryImageAlt,
  heroSlides[]{
    image,
    alt,
    tags,
    slideLabel,
    slideTitle,
    slideLocation
  },
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
    image
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
  photo
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
