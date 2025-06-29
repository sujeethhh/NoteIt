'use client'
import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Button } from './ui/button'
import TipTapMenuBar from './TipTapMenuBar'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import { useDebounce } from '@/lib/useDebounce'
import { useMutation } from '@tanstack/react-query'
import Text from '@tiptap/extension-text'
import axios from 'axios'
import { NoteType } from '@/lib/db/schema'
import {useCompletion} from 'ai/react';
import DialogContent from  './CreateNotesDialog';
import CreateNotesDialog from './CreateNotesDialog';
import { Input } from './ui/input';
import { $notes } from '@/lib/db/schema';
import AnimateFadeSlide from "@/components/AnimateFadeSlide";
type Props = {note:NoteType}


export const TipTap = ({note}: Props) => {
  const [editorState, setEditorState] = React.useState(note.editorState|| <h1>${note.name}</h1>);
  const {complete,completion} =useCompletion({
    api:'/api/completion'
  })
  const [isSaving, setIsSaving]= React.useState(false);
  const saveNotes=useMutation({
    mutationFn: async()=>{
      const response=await axios.post('/api/saveNote',{
       notesId: note.id,
       editorState,
      })
      return response.data;
    }
   })
   const customText=Text.extend({
    addKeyboardShortcuts(){
      return{
        'Shift-A':()=>{
          const prompt=this.editor.getText().split(" ").slice(-30).join(' ')
          console.log(prompt)
          //complete();
          return true;
        }
      }
    }
   });
  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Underline,
      customText,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML())
    },
  });
  const debounceState = useDebounce(typeof editorState === 'string' ? editorState : '', 1000);

React.useEffect(()=>{
  if(debounceState==='') return 
  saveNotes.mutate(undefined,{
    onSuccess: data=>{
      console.log("success update!",data)
    },
    onError: err=>{
      console.error(err)
    }
  });
 
},[debounceState]);
  return (
    <div>
      <div className='flex gap-4'>
        {editor ? <TipTapMenuBar editor={editor} /> : null}
        <Button disabled variant={'outline'}>
          {saveNotes.isPending ? "Saving...":"Saved"}
        </Button>
      </div>

      <div className=''>
        
      <h1 className='capitalize text-5xl md:text-3xl font-bold tracking-tight leading-tight  bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black
  '>{note.name}</h1>
</div> <AnimateFadeSlide>
      <div className='prose '>
        
      <EditorContent editor={editor} />
      </div>
       </AnimateFadeSlide>
    </div>
  )
}
