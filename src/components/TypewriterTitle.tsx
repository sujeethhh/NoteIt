'use client';
import { Type } from "lucide-react";
import React from "react";
import Typewriter from 'typewriter-effect'

type Props = {}

const TypewriterTitle = (props: Props) => {
    return (
        <Typewriter
        options={{
            loop: true
        }}
        onInit={(typewriter)=>{
          typewriter.typeString("Clarity begins with a note. Start your flow with NoteFlow.")
          .pauseFor(2000).deleteAll()
          .start();  
        }}
        />
    )
}
export default TypewriterTitle