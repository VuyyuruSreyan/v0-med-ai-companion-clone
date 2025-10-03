import { Header } from "@/components/header"
import { Play } from "lucide-react"

const videos = [
  {
    id: "1",
    title: "Understanding Diabetes Management",
    duration: "12:45",
    thumbnail: "/diabetes-health.jpg",
    category: "Chronic Conditions",
  },
  {
    id: "2",
    title: "Heart Health: Prevention and Care",
    duration: "15:20",
    thumbnail: "/heart-health.png",
    category: "Cardiovascular",
  },
  {
    id: "3",
    title: "Mental Health and Wellness",
    duration: "10:30",
    thumbnail: "/mental-health-abstract.png",
    category: "Mental Health",
  },
  {
    id: "4",
    title: "Nutrition Basics for a Healthy Life",
    duration: "18:15",
    thumbnail: "/healthy-food-collage.png",
    category: "Nutrition",
  },
  {
    id: "5",
    title: "Exercise and Physical Fitness",
    duration: "14:00",
    thumbnail: "/diverse-fitness.png",
    category: "Fitness",
  },
  {
    id: "6",
    title: "First Aid and Emergency Response",
    duration: "20:45",
    thumbnail: "/first-aid-emergency.jpg",
    category: "Emergency Care",
  },
]

export default function VideosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30 px-4 py-8">
          <div className="container max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Educational Videos</h1>
            <p className="text-muted-foreground">Watch relevant medical education content</p>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="container max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                      {video.category}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
