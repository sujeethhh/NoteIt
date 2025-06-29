'use client';

import Animate from '@/components/Animate';
import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, isLoaded } = useUser();
  const [link, setLink] = useState('/');

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      const hasLoggedInBefore = user.publicMetadata?.hasLoggedInBefore;
      setLink(hasLoggedInBefore ? '/dashboard' : '/sign-up');
    } else {
      setLink('/sign-in');
    }
  }, [isLoaded, user]);

  return (
    <Animate>
      <div className="flex flex-col items-center justify-center text-center min-h-screen px-4 space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
          NOTE IT. <span className="text-slate-500">BUILD IT!</span>
        </h1>

        <h2 className="text-lg md:text-xl text-gray-600 font-medium">
          <TypewriterTitle />
        </h2>

        <div>
          <Link href={link}>
            <Button className="group bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300 ease-in-out text-lg px-6 py-4 rounded-xl shadow-lg flex items-center">
              Start Typin’ ⚡
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
      </div>
    </Animate>
  );
}
