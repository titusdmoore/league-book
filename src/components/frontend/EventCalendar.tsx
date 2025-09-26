"use client";

import { Event } from '@/payload-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type EventCalendarProps = {
  todaysDate: Date,
  initialEvents: Event[],
};

const rowTemplates = {
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
};

export default function EventCalendar({ todaysDate, initialEvents }: EventCalendarProps) {
  const originalDate = todaysDate;
  const [keystoneDate, setKeystoneDate] = useState<Date>(todaysDate);

  const firstDayOfMonth = new Date(keystoneDate.getFullYear(), keystoneDate.getMonth(), 1);
  const monthLength = new Date(keystoneDate.getFullYear(), keystoneDate.getMonth(), 0).getDate();
  const month = keystoneDate.toLocaleString('default', { month: 'long' });

  const rowCount = Math.ceil((firstDayOfMonth.getDay() + monthLength) / 7);
  let [runCount, dayCount] = [0, 0];

  const navigatePreviousMonth = () => {
    let nextMonth = keystoneDate.getMonth() - 1;
    setKeystoneDate(new Date(keystoneDate.getFullYear() - nextMonth < 0 ? 1 : 0, (keystoneDate.getMonth() - 1 % 12 + 12) % 12, 1));
  };
  const navigateNextMonth = () => {
    let nextMonth = keystoneDate.getMonth() + 1;
    setKeystoneDate(new Date(keystoneDate.getFullYear() + Math.floor(nextMonth / 12), nextMonth % 12, 1));
  };

  return (
    <section className="h-full">
      <div className="flex justify-between w-full py-4">
        <div className="flex items-center">
          <div className="flex">
            <button onClick={navigatePreviousMonth}>
              <ChevronLeft className="dark:stroke-white" />
            </button>
            <button onClick={navigateNextMonth} className="pointer-cursor">
              <ChevronRight className="dark:stroke-white" />
            </button>
          </div>
          <h1 className="dark:text-white text-xl">{month}</h1>
        </div>
        <button onClick={() => setKeystoneDate(originalDate)} className="bg-blue-300 py-2 px-4 rounded-md">
          Today
        </button>
      </div>
      <div className={`grid ${rowTemplates[rowCount as 4 | 5 | 6]} border border-slate-300 rounded-md h-full`}>
        {(new Array(Math.ceil((firstDayOfMonth.getDay() + monthLength) / 7)).fill(0)).map((_, idx) => {
          return (
            <div key={idx} className='grid grid-cols-7 not-last:border-b border-slate-300'>
              {(new Array(7).fill(0)).map((_, jdx) => {
                let dayNum = "";
                let events: Event[] = [];
                if (runCount >= firstDayOfMonth.getDay()) {
                  let day = dayCount++ + 1;

                  if (day <= monthLength) {
                    dayNum = day.toString();
                    events = initialEvents.filter(event => ((new Date(event.startTime!)).toDateString() === (new Date(keystoneDate.getFullYear(), keystoneDate.getMonth(), parseInt(dayNum)).toDateString())))
                  }
                }
                runCount++;

                return (
                  <div key={jdx} className='not-last:border-r border-slate-300 pt-2'>
                    <span className={`ml-2 dark:text-white${parseInt(dayNum) == keystoneDate.getDate() ? ' bg-blue-700 w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>{dayNum}</span>
                    <ul className='overflow-scroll'>
                      {events.map((event, index) => {
                        return (
                          <li key={index} className="dark:text-white">{event.name}</li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </section>
  );
}
