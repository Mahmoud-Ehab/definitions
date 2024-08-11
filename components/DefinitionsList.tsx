'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { getWord } from '@/lib/actions'
import { Word } from '@/lib/types'

export function DefinitionsList() {
  const [word, setWord] = useState({})
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      fetch(`/${search}`)
      .then(res => res.json())
      .then(res => {
        setWord(res.word)
      })
      .catch(err => console.error(err))
    }
  }, [])

  return (
    <>
    {word.text ? 
      <label>the word: {word}</label> 
        : 
      <label>Word not found!</label>}
    </>
  )
}
