import { Event, Facility } from "@/payload-types";

import { Card as GameCard } from "./events/Game";
import { Card as DefaultCard } from "./events/Event";

export type EventCardProps = {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  switch (event.type) {
    case 'game':
      return <GameCard event={event} />
    default:
      return <DefaultCard event={event} />
  }
}
