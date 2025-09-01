import { CollectionConfig } from "payload";

export const Teams: CollectionConfig = {
  slug: 'teams',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'row',
      fields: [

        { name: 'name', type: 'text', required: true, },
        { name: 'teamLogo', type: 'upload', relationTo: 'media' },
      ]
    },
    {
      name: 'roster',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'teamManager',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'leagues',
      type: 'join',
      collection: 'leagues',
      on: 'teams',
    },
    {
      name: 'events',
      type: 'join',
      collection: 'events',
      on: 'teams'
    },
  ],
};
