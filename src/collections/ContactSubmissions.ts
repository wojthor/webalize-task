import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'companyName', 'createdAt'],
    description: 'Read-only list of contact form submissions.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'phonePrefix',
      type: 'text',
    },
    {
      name: 'preferredTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'privacyPolicyAccepted',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
