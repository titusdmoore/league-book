import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: 'events',
  fields: [
    { name: 'name', type: 'text' },
    {
      type: 'row', fields: [
        { name: 'startTime', type: 'date', timezone: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'endTime', type: 'date', timezone: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
      ]
    },
    {
      type: 'row',
      fields: [
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
        {
          name: 'visibility',
          type: 'select',
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' },
            { label: 'League', value: 'league' }
          ],
          defaultValue: 'public'
        },
        { name: 'facility', type: 'relationship', relationTo: 'facilities', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'teams', type: 'relationship', relationTo: 'teams', hasMany: true, maxRows: 2 },
        { name: 'league', type: 'relationship', relationTo: 'leagues' }
      ],
    },
    {
      name: 'userAttendance',
      type: 'join',
      collection: 'userEventAttendances',
      on: 'event'
    }
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
