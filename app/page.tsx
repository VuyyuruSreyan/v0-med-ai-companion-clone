import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { MessageSquare, MapPin, User, Video, Camera } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/30 to-background py-20 px-4">
          <div className="container max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-primary">
                <path
                  d="M18 12C18 7.58172 21.5817 4 26 4C30.4183 4 34 7.58172 34 12V28C34 32.4183 30.4183 36 26 36C21.5817 36 18 32.4183 18 28V12Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M46 12C46 7.58172 49.5817 4 54 4C58.4183 4 62 7.58172 62 12V28C62 32.4183 58.4183 36 54 36C49.5817 36 46 32.4183 46 28V12Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="40" cy="44" r="8" stroke="currentColor" strokeWidth="3" />
                <path d="M26 36V44H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M54 36V44H48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path
                  d="M40 52V56C40 58.2091 38.2091 60 36 60H28C25.7909 60 24 58.2091 24 56V52"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">MEDI COMPANION</h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
              Your intelligent healthcare assistant powered by AI. Get medical advice, find healthcare facilities, and
              manage your health profile - all in one place.
            </p>

            <Link href="/ai-assistant">
              <Button size="lg" className="text-base px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Medical Assistant */}
            <Link href="/ai-assistant" className="group">
              <div className="h-full border border-border rounded-xl p-6 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">AI Medical Assistant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get instant medical advice from our AI-powered chatbot
                </p>
              </div>
            </Link>

            {/* Find Healthcare */}
            <Link href="/find-healthcare" className="group">
              <div className="h-full border border-border rounded-xl p-6 bg-green-50/50 hover:bg-green-50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 text-green-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Find Healthcare</h3>
                <p className="text-muted-foreground leading-relaxed">Locate nearby hospitals and medical stores</p>
              </div>
            </Link>

            {/* Health Profile */}
            <Link href="/health-profile" className="group">
              <div className="h-full border border-border rounded-xl p-6 bg-purple-50/50 hover:bg-purple-50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Health Profile</h3>
                <p className="text-muted-foreground leading-relaxed">Manage your personal health information</p>
              </div>
            </Link>

            {/* Educational Videos */}
            <Link href="/videos" className="group">
              <div className="h-full border border-border rounded-xl p-6 bg-pink-50/50 hover:bg-pink-50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4 text-pink-600">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Educational Videos</h3>
                <p className="text-muted-foreground leading-relaxed">Watch relevant medical education content</p>
              </div>
            </Link>

            {/* Image Analysis */}
            <Link href="/image-analysis" className="group">
              <div className="h-full border border-border rounded-xl p-6 bg-yellow-50/50 hover:bg-yellow-50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4 text-yellow-600">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Image Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">Upload images for medical analysis</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Why Choose MedAI Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose MedAI?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced AI technology for accurate medical guidance
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
                <p className="text-muted-foreground leading-relaxed">Find nearby healthcare facilities instantly</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized</h3>
                <p className="text-muted-foreground leading-relaxed">Tailored health advice based on your profile</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
