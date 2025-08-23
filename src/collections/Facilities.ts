import { CollectionConfig } from "payload";

export const Facilities: CollectionConfig = {
  slug: 'facilities',
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
    }
  ],
};
