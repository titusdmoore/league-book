import { Event } from "@/payload-types";
import { Card as ShadCard, CardContent, CardTitle } from "@/components/ui/card";

export type CardProps = {
  event: Event
};

export type PageProps = {
  event: Event
};

export function Card({ event }: CardProps) {
  return (
    <ShadCard className="dark:bg-zinc-700 dark:border-zinc-600 h-full">
      <CardTitle className="px-4">
        <h2 className="text-white">{event.name}</h2>
      </CardTitle>
      <CardContent>
      </CardContent>
    </ShadCard>
  );
}

export function Page({ event }: PageProps) {
  return (
    <h1>{event.name}</h1>
  );
}
