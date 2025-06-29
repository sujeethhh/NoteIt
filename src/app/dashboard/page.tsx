import CreateNotesDialog from "@/components/CreateNotesDialog";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-separator";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import AnimateFadeSlide from "@/components/AnimateFadeSlide";

type Props = {};

const DashboardPage = async (props: Props) => {
  const { userId } = await auth();
  const notes = await db.select().from($notes).where(eq($notes.userId, userId!));

  return (
    <AnimateFadeSlide>
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-center py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                className="bg-black text-white hover:bg-white hover:text-black border border-black hover:border-gray- transition rounded-md"
                size="sm"
              >
                <ArrowLeft className="mr-1 w-4 h-4" />
                HomePage
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Your Notes</h1>
          </div >
          <div className="flex items-center gap-4 pt-10">
  <div className="transform scale-200"> 
    <UserButton />
  </div>
</div>

        </div>

        <div className="my-6">
          <Separator />
        </div>

        
        {notes.length === 0 && (
          <div className="text-center text-gray-500 text-lg mb-10">
            You have no notes yet. Start creating!
          </div>
        )}

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8 pt-20 ">
        
       
    <CreateNotesDialog />
  
  
          {notes.map((note) => (
            <a href={`/notebook/${note.id}`} key={note.id}>
              <div className="transition-transform transform hover:-translate-y-1 hover:scale-[1.02] duration-200 ease-in-out">
                <div className="flex flex-col items-start gap-2 p-6 pb-20 rounded-xl bg-white/50 border border-gray-200 shadow-md backdrop-blur-md hover:shadow-xl transition-all">
                  <h3 className="text-lg font-semibold text-gray-800 truncate w-full text-left">
                    {note.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-left w-full">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
    </AnimateFadeSlide>
  );
};

export default DashboardPage;
