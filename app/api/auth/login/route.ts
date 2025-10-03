import { type NextRequest, NextResponse } from "next/server"
import { createSession, demoUsers, hashPassword, verifyPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, mode } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    if (mode === "signup") {
      // Check if user already exists
      if (demoUsers.has(email)) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
      }

      // Create new user
      demoUsers.set(email, {
        email,
        password: hashPassword(password),
      })

      await createSession(email)
      return NextResponse.json({ user: { email } })
    } else {
      // Sign in
      const user = demoUsers.get(email)

      if (!user || !verifyPassword(user.password, password)) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      await createSession(email)
      return NextResponse.json({ user: { email } })
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
