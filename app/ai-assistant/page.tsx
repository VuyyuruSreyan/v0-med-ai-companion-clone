"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI medical assistant. How can I help you today? Please describe your symptoms or health concerns.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        <div className="border-b border-border bg-muted/30 px-4 py-4">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">AI Medical Assistant</h1>
            <p className="text-sm text-muted-foreground mt-1">Get instant medical advice from our AI-powered chatbot</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="container max-w-4xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground border border-border rounded-xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-border bg-background px-4 py-4">
          <form onSubmit={handleSubmit} className="container max-w-4xl mx-auto">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms or ask a question..."
                className="resize-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <Button type="submit" disabled={loading || !input.trim()} size="icon" className="h-auto">
                <Send className="w-5 h-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
