"use client";

import { Team, User, UserEventAttendance, Event } from "@/payload-types";
import { Check, CircleQuestionMark, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type AttendeeListProps = {
  team: Team;
  initialAttendances: UserEventAttendance[];
  event: Event,
  key: number;
};

function AttendeeAttendance({ player, attendees }: { player: User, attendees: UserEventAttendance[] }) {
  let playerAttendee = attendees.find((attendee) => (attendee.user && (attendee.user as User).id === player.id));

  if (!playerAttendee) return null;

  switch (playerAttendee.attendanceStatus) {
    case 'attending':
      return <Check />;
    case 'notAttending':
      return <X />
    default:
      return <CircleQuestionMark />;
  }
}

export function AttendeeList({ team, initialAttendances, event, ...props }: AttendeeListProps) {
  const [attendees, setAttendees] = useState(initialAttendances);

  useEffect(() => {
    const eventSource = new EventSource(`/internal/events/${event.id}/attendance`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log("data", data)

      switch (data.type) {
        case 'connected':
          console.log('Connected to event updates')
          break

        case 'attendance_updated':
          setAttendees(prev => {
            const index = prev.findIndex(a => ((a as UserEventAttendance).user as User).id === data.attendee.id)
            if (index >= 0) {
              // Update existing attendee
              const updated = [...prev]
              updated[index] = data.attendee
              return updated
            } else {
              // Add new attendee
              return [...prev, data.attendee]
            }
          })
          break
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
    }

    // Cleanup on unmount
    return () => {
      eventSource.close()
    }
  }, [event.id]);

  return (
    <article {...props}>
      <h2 className='text-lg font-bold flex gap-2'>{team.name}<Link href={`/teams/${team.id}`}><ExternalLink /></Link></h2>
      <div>
        <h3>Roster</h3>
        <ul>
          {team.roster && team.roster.map((player, jd) => {
            player = player as User;
            return (
              <li key={jd} className='flex gap-2'>
                {player.firstName + " " + player.lastName}
                <AttendeeAttendance player={player} attendees={attendees} />
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
