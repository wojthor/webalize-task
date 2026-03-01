import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    description: 'Footer content shown across the site.',
  },
  fields: [
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
    },
  ],
}
