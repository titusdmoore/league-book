import { Event, Facility } from "@/payload-types";

export type EventCardProps = {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  console.log(event)
  return (
    <article className='bg-white rounded-md w-fit p-2'>
      <h2>{(event.facility as Facility).name}</h2>
    </article>
  );
}
