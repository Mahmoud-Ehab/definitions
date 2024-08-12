'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { getWord } from '@/lib/queries'
import { Word } from '@/lib/types'

export function DefinitionsList() {
  const [word, setWord] = useState({})
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('search')
    getWord(search || '', (word) => setWord(word))
  }, [])

  return (
    <>
    {word.text ? 
      <label>the word: {word}</label> 
      : 
      <Alert variant="destructive" className="md:w-1/2">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Word not Found. 
        </AlertDescription>
      </Alert>
    }
    </>
  )
}
