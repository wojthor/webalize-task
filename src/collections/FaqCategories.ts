import type { CollectionConfig } from 'payload'

export const FaqCategories: CollectionConfig = {
  slug: 'faq-categories',
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
