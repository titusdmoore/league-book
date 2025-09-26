import EventCalendar from "@/components/frontend/EventCalendar";
import { getPayload } from "payload";
import config from '@payload-config';

export default async function Page() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const today = new Date();
  const eventsForCurrentMonth = await payload.find({
    collection: 'events',
    pagination: false,
    where: {
      and: [
        {
          startTime: {
            greater_than: (new Date(today.getFullYear(), today.getMonth(), 1)).toISOString(),
          }
        },
        {
          startTime: {
            less_than: (new Date(today.getFullYear(), (today.getMonth() + 1) % 12, 1)).toISOString(),
          }
        }
      ]
    }
  });

  return (
    <EventCalendar todaysDate={today} initialEvents={eventsForCurrentMonth.docs} />
  );
}
