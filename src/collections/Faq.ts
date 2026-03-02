import type { CollectionConfig } from 'payload'

export const Faq: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'updatedAt'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'faq-categories',
      hasMany: false,
    },
  ],
}
