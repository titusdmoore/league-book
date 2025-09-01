"use client"

import { Event, User, UserEventAttendance } from "@/payload-types";
import { ReactElement } from "react";

export type AttendanceType = NonNullable<Pick<UserEventAttendance, 'attendanceStatus'>['attendanceStatus']>;
export type AttendanceButtonProps = {
  attendanceType: AttendanceType;
  userAttendance: UserEventAttendance | undefined;
  user: User;
  event: Event;
  children: ReactElement;
};
type MarkUserAttendanceArgs = Omit<AttendanceButtonProps, 'children'>

async function markUserAttendance({ attendanceType, userAttendance, user, event }: MarkUserAttendanceArgs) {
  if (userAttendance) {
    let res = await fetch('/api/userEventAttendances/' + userAttendance.id, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendanceStatus: attendanceType
      }),
    });

    return;
  }

  let res = await fetch('/api/userEventAttendances', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      event,
      attendanceStatus: attendanceType
    }),
  });
}

export default function AttendanceButton({ attendanceType, userAttendance, user, event, children }: AttendanceButtonProps) {
  console.log(userAttendance)
  return (
    <button
      className={`mr-2 ${userAttendance?.attendanceStatus === attendanceType ? 'bg-green-200 ' : ''}hover:bg-gray-300 w-8 h-8 rounded-md inline-flex items-center justify-center cursor-pointer`}
      onClick={async () => markUserAttendance({ attendanceType, userAttendance, user, event })}
    >
      {children}
    </button>
  );
}
