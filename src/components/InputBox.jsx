"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Image, Send } from "lucide-react"

export default function ChatInputBox({ onSendMessage }) {
  const [message, setMessage] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-4 max-w-3xl">
      <div className={`relative flex flex-wrap flex-col items-center transition-all duration-300 ease-in-out ${isInputFocused ? 'scale-105' : ''}`}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} placeholder="Type your message..." className="w-full py-3 px-5 pr-28 rounded-full border-2 border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"/>
        <div className="absolute right-4 space-y-1 flex flex-wrap">
          <Button type="button" size="icon" variant="ghost" className="text-muted-foreground transition-all duration-500 ease-in-out h-10 w-10 rounded-full">
            <Mic className="h-5 mt-2 w-5 transform hover:scale-110 transition-transform duration-500" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="text-muted-foreground transition-all duration-500 ease-in-out h-10 w-10 rounded-full">
            <Image className="h-5 w-5 transform hover:scale-110 transition-transform duration-500" />
          </Button>
          <Button type="submit" variant="ghost" size="icon" className="text-muted-foreground transition-all duration-500 ease-in-out h-10 w-10 rounded-full">
            <Send className="h-5 w-5 transform hover:scale-110 transition-transform duration-500" />
          </Button>
        </div>
        <div className="flex flex-wrap text-xs mt-2 text-muted-foreground">
          <p>Gemini may display inaccurate info, including about people, so double-check its responses. (It is still under development)</p>
        </div>
      </div>
    </form>
  )
}