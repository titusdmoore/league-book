import { Event, League, Media, Team, User, UserEventAttendance, UserEventAttendancesSelect } from "@/payload-types";
import { Check, CircleQuestionMark, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { AttendeeList } from "./AttendeeList";
import AttendanceButton from "./AttendanceButton";
import { Card as ShadCard, CardContent, CardTitle } from "@/components/ui/card";

export type CardProps = {
  event: Event
};

export type PageProps = {
  event: Event;
  user: User;
};

export function Card({ event }: CardProps) {
  return (
    <ShadCard className="dark:bg-zinc-700 dark:border-zinc-600 h-full">
      <div>
        <CardTitle className="flex justify-between items-center px-4">
          <h2 className='text-lg font-bold dark:text-white'><Link href={'/events/' + event.id}>{event.name}</Link></h2>
          <h2 className='text-sm text-slate-400 dark:text-slate-200'>{event.league && (event.league as League).name}</h2>
        </CardTitle>
        <hr className="h-[1px] w-5/6 bg-zinc-400 m-auto mt-4" />
      </div>
      <CardContent>
        <ul className='py-4'>
          {event.teams && event.teams.map((team, id) => {
            team = team as Team;
            return (
              <li className='flex gap-2 pb-2 dark:text-white' key={id}>
                {
                  team.teamLogo && (
                    <Image
                      src={(team.teamLogo as Media).sizes?.thumbnail?.url as string}
                      alt={(team.teamLogo as Media).alt}
                      width={(team.teamLogo as Media).sizes?.thumbnail?.width as number}
                      height={(team.teamLogo as Media).sizes?.thumbnail?.height as number}
                      className='w-8 h-8'
                    />
                  )
                }
                {team.name}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </ShadCard>
  );
}

export async function Page({ event, user }: PageProps) {
  const payload = await getPayload({ config });
  const userInGame = user && user.teams?.docs && user.teams.docs.filter(t => (t as Team).id == 1 || (t as Team).id == 1);
  const gameAttendances = await payload.find({
    collection: 'userEventAttendances',
    pagination: false,
    where: {
      event: { equals: event.id },
    },
  });
  const userAttendance = user && gameAttendances.docs.find((attendance) => (attendance.user && (attendance.user as User).id === user.id));

  return (
    <>
      <div>
        <h1 className='text-3xl py-2 mb-2'>{event.name || 'Game'}</h1>
        {userInGame && (
          <div>
            <AttendanceButton user={user} attendanceType='notAttending' userAttendance={userAttendance} event={event}>
              <X />
            </AttendanceButton>
            <AttendanceButton user={user} attendanceType='possiblyAttending' userAttendance={userAttendance} event={event}>
              <CircleQuestionMark />
            </AttendanceButton>
            <AttendanceButton user={user} attendanceType='attending' userAttendance={userAttendance} event={event}>
              <Check />
            </AttendanceButton>
          </div>
        )}
      </div>
      <h2 className='text-2xl mb-4'>Teams</h2>
      <div className="grid grid-cols-2">
        {event.teams && event.teams.map((team, id) => {
          team = team as Team;
          return (
            <AttendeeList team={team} initialAttendances={gameAttendances.docs} key={id} event={event} />
          );
        })}
      </div>
    </>
  );
}
