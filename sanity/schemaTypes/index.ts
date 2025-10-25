import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author'
import category from './category'
import project from './project'
import salesperson from './salesperson'
import county from './county'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, project, salesperson, county],
}
