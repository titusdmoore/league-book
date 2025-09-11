import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Link from 'next/link'
import EventCard from '@/components/frontend/EventCard'
import { ExternalLink } from 'lucide-react'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const events = await payload.find({ collection: 'events' });


  return (
    <>
      {user && <h1 className="text-3xl font-bold py-2 mb-4 dark:text-white">Welcome, {user.firstName} {user.lastName}</h1>}
      <section className='w-full'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-bold mb-6 dark:text-white'>Upcoming Sessions</h2>
          <Link href='/' className='text-blue-600 flex gap-2'>
            See full calendar
            <ExternalLink />
          </Link>
        </div>
        {events && (
          <ul className='grid grid-cols-4 gap-4 mb-6'>
            {events.docs.map((event, idx) => {
              return (
                <li key={idx}>
                  <EventCard event={event} />
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <section>
        <h2 className='text-2xl font-bold mb-2 dark:text-white'>League Standings</h2>
      </section>
    </>
  )
}
