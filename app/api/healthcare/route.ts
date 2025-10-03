import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get("location")

  if (!location) {
    return NextResponse.json({ error: "Location is required" }, { status: 400 })
  }

  // Mock healthcare facilities data
  const facilities = [
    {
      id: "1",
      name: "City General Hospital",
      type: "hospital",
      address: `123 Main Street, ${location}`,
      phone: "(555) 123-4567",
      hours: "24/7 Emergency Services",
      distance: "0.8 miles",
    },
    {
      id: "2",
      name: "Wellness Medical Center",
      type: "clinic",
      address: `456 Oak Avenue, ${location}`,
      phone: "(555) 234-5678",
      hours: "Mon-Fri 8AM-6PM, Sat 9AM-2PM",
      distance: "1.2 miles",
    },
    {
      id: "3",
      name: "HealthPlus Pharmacy",
      type: "pharmacy",
      address: `789 Pine Road, ${location}`,
      phone: "(555) 345-6789",
      hours: "Mon-Sat 9AM-9PM, Sun 10AM-6PM",
      distance: "0.5 miles",
    },
    {
      id: "4",
      name: "Community Health Clinic",
      type: "clinic",
      address: `321 Elm Street, ${location}`,
      phone: "(555) 456-7890",
      hours: "Mon-Fri 9AM-5PM",
      distance: "1.5 miles",
    },
    {
      id: "5",
      name: "MedExpress Pharmacy",
      type: "pharmacy",
      address: `654 Maple Drive, ${location}`,
      phone: "(555) 567-8901",
      hours: "24/7",
      distance: "0.9 miles",
    },
  ]

  return NextResponse.json({ facilities })
}
