import { CollectionAfterChangeHook, CollectionConfig } from "payload";
import { sseManager } from "@/lib/sse";
import { Event, UserEventAttendance } from "@/payload-types";

const afterAttendanceChangeEvent: CollectionAfterChangeHook = async ({ doc, operation }: { doc: UserEventAttendance, operation: string }) => {
  sseManager.broadcastToEvent((doc.event as Event).id, {
    type: 'attendance_updated',
    attendee: doc,
    operation
  });

  return doc;
}

export const UserEventAttendances: CollectionConfig = {
  slug: 'userEventAttendances',
  hooks: {
    afterChange: [
      afterAttendanceChangeEvent,
    ],
  },
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events'
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users'
    },
    {
      name: 'attendanceStatus',
      type: 'select',
      defaultValue: 'unknown',
      options: [
        'attending',
        'notAttending',
        'possiblyAttending',
        'unknown'
      ]
    }
  ],
};
