import { cookies } from "next/headers"

const DEMO_SECRET = "demo-medai-secret-key-2025"

// Simple demo users storage (in production, use a real database)
const demoUsers = new Map<string, { email: string; password: string }>()

export async function getUser() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (!sessionToken) return null

  try {
    // In demo mode, session token is just the email
    const email = sessionToken
    return { email }
  } catch {
    return null
  }
}

export async function createSession(email: string) {
  const cookieStore = await cookies()
  // In demo mode, just store the email as the session
  cookieStore.set("session", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export function verifyPassword(stored: string, provided: string): boolean {
  return stored === provided
}

export function hashPassword(password: string): string {
  // In demo mode, just return the password (in production, use bcrypt)
  return password
}

export { demoUsers }
