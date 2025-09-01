import { User } from '@/payload-types'
import { isSuperAdmin } from '@/lib/utils';
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    {
      type: 'row', fields: [
        { name: 'firstName', type: 'text', required: true },
        { name: 'lastName', type: 'text', required: true },
      ]
    },
    {
      type: 'row',
      fields: [
        { name: 'profileImage', type: 'upload', relationTo: 'media' },
        {
          name: 'roles',
          type: 'select',
          defaultValue: 'player',
          options: [
            { label: 'Player', value: 'player' },
            { label: 'Team Manager', value: 'team_manager' },
            { label: 'League Manager', value: 'league_manager', },
            { label: 'Super Admin', value: 'super_admin' }
          ],
          hasMany: true,
          access: {
            create: ({ req: { user } }) => isSuperAdmin(user as User),
            // read: ({ req: { user } }) => isSuperAdmin(user as User),
            update: ({ req: { user } }) => isSuperAdmin(user as User),
          },
        },
      ]
    },
    {
      name: 'teams',
      type: 'join',
      collection: 'teams',
      on: 'roster',
    },
    {
      name: 'eventAttendance',
      type: 'join',
      collection: 'userEventAttendances',
      on: 'user',
    },
  ],
};
