import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body=await req.json();
        let {notesId,editorState}=body;
        if(!notesId||!editorState){
            return new NextResponse("Missing editorstate or noteid ",{status:400})
        }
        notesId=parseInt(notesId)
        const notes=await db.select().from($notes).where(
            eq($notes.id,notesId)
        )
       if(notes.length!=1){
        return new NextResponse("failed to update!",{status:500});
       }
       const note=notes[0]
       if(note.editorState!== editorState){
        await db.update($notes).set({
            editorState
        }).where(
            eq($notes.id,notesId)
        );
       }
       return new NextResponse("Success !",{status:200})
    }catch(error){
     console.error(error);
    }
}