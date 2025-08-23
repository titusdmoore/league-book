import { CollectionConfig } from "payload";

export const Facilities: CollectionConfig = {
  slug: 'facilities',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'location', type: 'text' },
    {
      name: 'venues',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'events',
      type: 'join',
      collection: 'events',
      on: 'facility',
    }
  ],
};
