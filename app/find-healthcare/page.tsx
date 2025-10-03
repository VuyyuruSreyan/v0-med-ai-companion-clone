"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Clock, Search } from "lucide-react"

type Facility = {
  id: string
  name: string
  type: "hospital" | "clinic" | "pharmacy"
  address: string
  phone: string
  hours: string
  distance: string
}

export default function FindHealthcarePage() {
  const [location, setLocation] = useState("")
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!location.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/healthcare?location=${encodeURIComponent(location)}`)
      const data = await res.json()
      setFacilities(data.facilities || [])
    } catch (error) {
      console.error("Failed to fetch facilities:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30 px-4 py-8">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Find Healthcare</h1>
            <p className="text-muted-foreground mb-6">Locate nearby hospitals and medical stores</p>

            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location (e.g., New York, NY)"
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="container max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-muted-foreground">Searching for facilities...</p>
              </div>
            ) : facilities.length > 0 ? (
              <div className="space-y-4">
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{facility.name}</h3>
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary capitalize">
                          {facility.type}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{facility.distance}</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{facility.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>{facility.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{facility.hours}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="mt-4 w-full sm:w-auto bg-transparent">
                      Get Directions
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Enter your location to find nearby healthcare facilities</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
