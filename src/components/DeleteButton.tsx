'use client';

import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
  noteId: number
}

export const DeleteButton = ({ noteId }: Props) => {
  const router = useRouter()

  const deletenote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/deleteNote', { noteId })
      return response.data
    },
  })

  return (
    <Button
      variant={'destructive'}
      size='sm'
      onClick={() => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Notebook?")
        if (!confirmDelete) return

        deletenote.mutate(undefined, {
          onSuccess: () => {
            router.push('/dashboard')
          },
          onError: (err) => {
            console.error(err)
          },
        })
      }}
    >
      <Trash />
    </Button>
  )
}
