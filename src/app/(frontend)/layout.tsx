import '../globals.css'
import Image from 'next/image'

import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Link from 'next/link'
import { Media } from '@/payload-types'

import { Cog, Home, UsersRound, Trophy, Calendar } from 'lucide-react';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <html lang="en" className="scheme-light dark:scheme-dark">
      <body className="bg-slate-100 dark:bg-zinc-800 relative flex gap-4 p-2">
        <aside className="h-[calc(100vh-1rem)] bg-white dark:bg-zinc-700 w-12 top-0 left-0 sticky rounded-md flex flex-col items-center justify-between py-2">
          <span className="w-10">
            <button className="w-10 h-10 bg-blue-600 rounded-md mb-2"></button>
            {(user && user.profileImage) && (
              <div className='w-10 h-10'>
                <Link href="/">
                  <Image
                    src={(user.profileImage as Media).sizes?.thumbnail?.url as string}
                    width={(user.profileImage as Media).sizes?.thumbnail?.width ?? 0}
                    height={(user.profileImage as Media).sizes?.thumbnail?.height ?? 0}
                    alt={(user.profileImage as Media).alt}
                    className='rounded-md'
                  />
                </Link>
              </div>
            )}
          </span>
          <nav className='list-none'>
            <li>
              <Link href="/" className='flex justify-center items-center w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-md mb-2'>
                <Home />
              </Link>
            </li>
            <li>
              <Link href="/teams" className='flex justify-center items-center w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-md mb-2'>
                <Trophy />
              </Link>
            </li>
            <li>
              <Link href="/events" className='flex justify-center items-center w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-md mb-2'>
                <Calendar />
              </Link>
            </li>
            <li>
              <Link href="/teams" className='flex justify-center items-center w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-md mb-2'>
                <UsersRound />
              </Link>
            </li>
          </nav>
          <span className="w-10">
            <Link href="/settings" className='flex justify-center items-center w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-md mb-2'>
              <Cog />
            </Link>
            <a
              className="w-10 h-10 rounded-md p-2 flex bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20"
              href={payloadConfig.routes.admin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <picture>
                <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
                <Image
                  alt="Payload Logo"
                  height={35}
                  src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
                  width={35}
                />
              </picture>
            </a>
          </span>
        </aside>
        <main className='w-full'>{children}</main>
      </body>
    </html>
  )
}
