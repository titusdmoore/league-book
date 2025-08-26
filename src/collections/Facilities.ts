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
      type: 'row',
      fields: [
        { name: 'openTime', type: 'date', admin: { date: { pickerAppearance: 'timeOnly' } } },
        { name: 'closeTime', type: 'date', admin: { date: { pickerAppearance: 'timeOnly' } } },
      ]
    },
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
