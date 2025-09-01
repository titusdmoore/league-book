'use client';

import { CirclePlus } from "lucide-react";
import { useState } from "react";

function AvailabilityEntry() {
  return (
    <li>
    </li>
  );
}

export default function AvailabilityInput() {
  const [availabilityEntries, setAvailabilityEntries] = useState<number[]>([]);

  return (
    <section className='border border-gray-300 rounded-md'>
      <div className='flex justify-between bg-gray-300 p-4'>
        <h2>Add Game Availability Windows</h2>
        <button className='flex cursor-pointer' onClick={() => { setAvailabilityEntries([1, ...availabilityEntries]) }}>
          <CirclePlus className='mr-2' />
          Add Window
        </button>
      </div>
      <ul>
        {availabilityEntries.map((entry, index) => {
          return (
            <li key={index}>{index}</li>
          );
        })}
      </ul>
    </section>
  );
}
