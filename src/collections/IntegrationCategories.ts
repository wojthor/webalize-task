import type { CollectionConfig } from 'payload'

export const IntegrationCategories: CollectionConfig = {
  slug: 'integration-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
