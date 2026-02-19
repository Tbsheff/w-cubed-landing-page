import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author'
import category from './category'
import project from './project'
import manufacturer from './manufacturer'
import siteSettings from './siteSettings'
import representative from './representative'
import territoryInfo from './territoryInfo'
import state from './state'
import county from './county'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    project,
    manufacturer,
    siteSettings,
    representative,
    territoryInfo,
    state,
    county,
  ],
}
