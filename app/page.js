'use client'
import Feed from "@/components/Feed";
import NotSignedInHome from '@/components/Home'
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-zinc-950 via-indigo-900 to-rose-800">

      <div className="relative flex place-items-center">
        {session?.user ? (
          <Feed />
        ) : (
          <NotSignedInHome />
        )}
      </div>
    </main>
  );
}
