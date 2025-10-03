import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"

// In-memory storage for demo (in production, use a real database)
const profiles = new Map<string, any>()

export async function GET() {
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const profile = profiles.get(user.email)
  return NextResponse.json({ profile: profile || null })
}

export async function POST(request: NextRequest) {
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const profile = await request.json()
    profiles.set(user.email, profile)
    return NextResponse.json({ success: true, profile })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 })
  }
}
