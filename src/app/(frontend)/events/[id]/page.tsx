import { getPayload } from "payload";
import config from '@payload-config';
import { headers as getHeaders } from 'next/headers.js'

import { Event } from "@/payload-types";
import { Page as GamePage } from "@/components/frontend/events/Game";
import { Page as DefaultPage } from "@/components/frontend/events/Event";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayload({ config });
  const event = await payload.findByID({ collection: 'events', id });
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  switch (event.type) {
    case 'game':
      return <GamePage event={event} user={user!} />;
    default:
      return <DefaultPage event={event} />;
  }
}
