import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const image_description = await generateImagePrompt(name);
    console.log({ image_description });

    const note_ids = await db.insert($notes).values({
      name,
      userId,
    }).returning({
      insertedId: $notes.id,
    });

    const notes = await db.select().from($notes).where(
      and(
        eq($notes.id, note_ids[0].insertedId),
        eq($notes.userId, userId)
      )
    );

    if (notes.length !== 1) {
      return redirect("/dashboard");
    }

    return NextResponse.json({ note_id: note_ids[0].insertedId });
  } catch (error) {
    console.error("Error generating image prompt:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
