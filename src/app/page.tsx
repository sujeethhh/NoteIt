'use client';

import { motion } from 'framer-motion';
import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      
      
      <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full space-y-8 pt-10 pb-32 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
          NOTE IT. <span className="text-slate-500">BUILD IT!</span>
        </h1>

        <h2 className="text-lg md:text-xl text-gray-600 font-medium">
          <TypewriterTitle />
        </h2>

        <div>
          <Link href="/dashboard">
            <Button className="group bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300 ease-in-out text-lg px-6 py-4 rounded-xl shadow-lg flex items-center">
              Start Typin’ ⚡
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
