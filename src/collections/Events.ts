import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: 'events',
  fields: [
    { name: 'name', type: 'text' },
    { name: 'time', type: 'text' },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'misc',
      options: [
        { value: 'game', label: 'Game' },
        { value: 'openSkate', label: 'Open Skate' },
        { value: 'stickPuck', label: 'Stick and Puck' },
        { value: 'freestyleSkate', label: 'Freestyle Skate' },
        { value: 'openField', label: 'Open Field' },
        { value: 'openCourt', label: 'Open Court' },
        { value: 'privateEvent', label: 'Private Event' },
        { value: 'misc', label: 'Miscellaneous' },
      ],
    },
    { name: 'facility', type: 'relationship', relationTo: 'facilities' },
    { name: 'teams', type: 'relationship', relationTo: 'teams', hasMany: true, maxRows: 2 }
    // TODO: Update to support pulling in facility venues
    /* {
      name: 'venue',
      type: 'text',
      admin: {
        components: {
          Field: './components/VenueSelectField',
        }
      },
    }, */
  ],
};
