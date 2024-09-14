"use client";
import Link from "next/link";
import Image from "next/image";
import logo from '@/public/logo.png'
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const Providers = async () => {
      const res = await getProviders();
      setProviders(res);
    }
    Providers()
  }, []);

  return (
    <nav className="flex w-full justify-end bg-zinc-950 top-0">
        <div className="flex flex-end justify-items-end min-w-70 w-2/3 ">
          <Link href='/' className="flex gap-2 flex-center justify-center w-full">
          <h1 className="text-textLogo pt-10 text-2xl font-bold">Event</h1>
                <Image
                  src={logo}
                  width={90}
                  height={90}
                  className='cursor-pointer'
                  alt='Logo'
                />
          <h1 className="text-textLogo pt-10 text-2xl font-bold">Booking</h1>
        </Link>

        <div className='m-6 cursor-pointer w-full flex justify-end'>
        {session?.user ? (
          <div className=''>
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              className='rounded-full w-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href={`/booked/${session?.user.id}`}
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Booked events
                </Link>
                <br />
                <Link
                  href='/create'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create new event
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='btn2'
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
                    signIn(provider.id);
                  }}
                  className='btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      </div>
    </nav>
  )
}

export default Nav