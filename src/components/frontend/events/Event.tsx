import { Event } from "@/payload-types";

export type CardProps = {
  event: Event
};

export type PageProps = {
  event: Event
};

export function Card({ event }: CardProps) {
  return (
    <article className='bg-white rounded-md w-fit p-2'>
      <h2>{event.name}</h2>
    </article>
  );
}

export function Page({ event }: PageProps) {
  return (
    <h1>{event.name}</h1>
  );
}
