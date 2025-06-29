'use client'
import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {useRouter} from 'next/navigation'
import { Loader2 } from 'lucide-react';
export default function CreateNotesDialog() {
  const router = useRouter();
  const [input, setInput] = React.useState('');
  const createNotebook= useMutation({
    mutationFn: async ()=>{
        const response= await axios.post('/api/createNoteBook',{
            name:input
        })
        return response.data
    }
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   if(input === ''){
    window.alert("Please enter a name for yout notebook")
    return   
}
  createNotebook.mutate(undefined,{
    onSuccess: ({note_id}) => {
        console.log('created new note:',{note_id})
        router.push(`/notebook/${note_id}`);
    },
    onError:(error)=>{
        console.error(error);
        window.alert("Failed to create a new notebook");
    },
  });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-white/30 border border-white/20 border-dashed backdrop-blur-md shadow-2xl transition-all duration-150 ease-out hover:scale-105 hover:bg-white/50 hover:shadow-3xl cursor-pointer">
          <span className="text-3xl font-bold text-blue-700 transition-all duration-200 group-hover:text-blue-900">+</span>
          <h2 className="text-lg font-semibold text-gray-800">Add NoteBook</h2>
          <p className="text-sm text-gray-600">Start writing your thoughts...</p>
        </div>
      </DialogTrigger>

      <DialogContent className="z-50 backdrop-blur-sm bg-white/90 border border-gray-200 rounded-xl shadow-2xl">
        <DialogTitle className="text-xl font-semibold mb-4">New NoteBook</DialogTitle>
        <p className="mb-4 text-sm text-gray-600">You can create a new note by entering a name below:</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Notebook name..."
            className="bg-white/60 backdrop-blur-sm border border-white/30 placeholder:text-gray-500"
          />
          <div className='flex items-center gap-x-2'>
            <Button type='reset' variant={'secondary'}>Cancel</Button>
            <Button disabled={createNotebook.status === 'pending'}>
              {createNotebook.status=='pending'&&(
                <Loader2 className='w-4 h-4 m-2 animate-spin'/>
              )}
              Create
              </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
