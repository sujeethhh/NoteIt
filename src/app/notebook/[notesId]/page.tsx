import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq, and } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import Link from "next/link"
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { createClerkClient } from '@clerk/backend'
import { TipTap } from '@/components/TipTap'
import TipTapMenuBar from '@/components/TipTapMenuBar';
import { DeleteButton } from '@/components/DeleteButton';
import Animate from "@/components/Animate";
import ShinyText from '@/components/ShinyText';



const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

type Props = {
  params: {
    notesId: string
  }
}

const NotebookPage = async (props: Props) => {
  const { notesId } = await props.params;
  const { userId } = await auth()

  if (!userId) {
    redirect("/dashboard")
    return null
  }
  const client = clerkClient
  const user = await client.users.getUser(userId);


  const notes = await db.select().from($notes).where(
    and(
      eq($notes.id, parseInt(notesId)),
      eq($notes.userId, userId)
    )
  )

  if (notes.length !== 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Note not found</h2>
        <p className="mb-6">The note you are looking for does not exist or you do not have access to it.</p>
        <Link href="/dashboard">
          <Button className="bg-black text-white hover:bg-white hover:text-black border border-black hover:border-gray-300 transition rounded-md">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  const note = notes[0]

  console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

  return (
    <Animate>
    <div className="min-h-screen grainy p-8 bg-gradient-to-b ">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button
              className="bg-black text-white hover:bg-white hover:text-black border border-black hover:border-gray-300 transition rounded-md"
                size="sm"
            >
              <ArrowLeft className="mr-1 w-4 h-4" />
              Dashboard!
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className='inline-block mx-1'>/</span>
          <span className='text-stone-600 font-semibold'>{note.name}</span>
          <div className='ml-auto'>
          <DeleteButton noteId={note.id} />

          </div>
        </div>
        <div className='h-4'></div>
        
        <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'> 
          <TipTap note={note}/>
        </div>

      </div>
    </div>
    </Animate>
  )
}

export default NotebookPage
