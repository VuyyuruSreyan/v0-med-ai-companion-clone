"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { StethoscopeIcon } from "@/components/stethoscope-icon"
import { useState, useEffect } from "react"

export function Header() {
  const pathname = usePathname()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user)
      })
      .catch(() => {})
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/ai-assistant", label: "AI Assistant" },
    { href: "/find-healthcare", label: "Find Healthcare" },
    { href: "/health-profile", label: "Health Profile" },
    { href: "/videos", label: "Videos" },
    { href: "/image-analysis", label: "Image Analysis" },
  ]

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    window.location.href = "/"
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <StethoscopeIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">MedAI Companion</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAuthDialog(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      {showAuthDialog && (
        <AuthDialog
          onClose={() => setShowAuthDialog(false)}
          onSuccess={(user) => {
            setUser(user)
            setShowAuthDialog(false)
          }}
        />
      )}
    </>
  )
}

function AuthDialog({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: (user: { email: string }) => void
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, mode }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Authentication failed")
        setLoading(false)
        return
      }

      onSuccess(data.user)
    } catch (err) {
      setError("Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <StethoscopeIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">MedAI Companion</h2>
          <p className="text-sm text-muted-foreground mt-1">Your trusted healthcare assistant</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "signin" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-muted-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "signup" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-muted-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <div className="relative">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  )
}
