'use client'

import { BuiltInProviderType } from 'next-auth/providers'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Nav() {
  const { data: session } = useSession()
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)

  useEffect(() => {
    ;(async () => {
      const response = await getProviders()
      setProviders(response)
    })()
  }, [])

  return (
    <nav className='flex-between w-full mb-6 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt=''
          width='30'
          height='30'
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/prompt/create' className='black_btn'>
              Create Post
            </Link>
            <button
              type='button'
              onClick={() => {
                signOut()
              }}
              className='outline_btn'
            >
              Sign out
            </button>
            <Link href={`/profile?id=${session.user.id}`}>
              <Image
                src={session.user.image || 'assets/images/logo.png'}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id)
                  }}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className='flex sm:hidden'>
        {session?.user ? (
          <div className='flex relative'>
            <Image
              src={session.user.image || 'assets/images/logo.png'}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => {
                setToggleDropdown((prev) => !prev)
              }}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href={`/profile?id=${session.user.id}`}
                  className='dropdown_link'
                  onClick={() => {
                    setToggleDropdown(false)
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href='/prompt/create'
                  className='dropdown_link'
                  onClick={() => {
                    setToggleDropdown(false)
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id)
                  }}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
