"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Loader2 } from "lucide-react"

type Profile = {
  name: string
  age: string
  gender: string
  bloodType: string
  allergies: string
  medications: string
  medicalHistory: string
}

export default function HealthProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    age: "",
    gender: "",
    bloodType: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load profile from API on mount
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile)
        }
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSaved(false)

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30 px-4 py-8">
          <div className="container max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Health Profile</h1>
            <p className="text-muted-foreground">Manage your personal health information</p>
          </div>
        </div>

        <div className="px-4 py-8">
          <form onSubmit={handleSubmit} className="container max-w-3xl mx-auto space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  placeholder="30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  placeholder="Male/Female/Other"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input
                  id="bloodType"
                  value={profile.bloodType}
                  onChange={(e) => setProfile({ ...profile, bloodType: e.target.value })}
                  placeholder="A+"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={profile.allergies}
                onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                placeholder="List any allergies (e.g., penicillin, peanuts)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={profile.medications}
                onChange={(e) => setProfile({ ...profile, medications: e.target.value })}
                placeholder="List current medications and dosages"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={profile.medicalHistory}
                onChange={(e) => setProfile({ ...profile, medicalHistory: e.target.value })}
                placeholder="Brief medical history, past surgeries, chronic conditions"
                rows={4}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
              {saved && <span className="text-sm text-green-600 font-medium">Profile saved successfully!</span>}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
