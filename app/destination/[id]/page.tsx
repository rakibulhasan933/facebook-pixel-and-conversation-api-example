"use client"

import { use, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Star, Calendar, Globe } from "lucide-react"
import { destinations } from "@/lib/destinations"
import LeadForm from "@/components/lead-form"
import { getCookie } from "@/utils/cookies"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function DestinationPage({ params }: PageProps) {

  const { id } = use(params);
  const destination = destinations.find((d) => d.id === id)

  useEffect(() => {
    if (!destination) return

    // Track ViewContent event to Facebook Conversion API
    const trackViewContent = async () => {
      try {
        const fbp = getCookie("_fbp")
        const fbc = getCookie("_fbc")

        const payload = {
          eventName: "ViewContent",
          contentName: destination.name,
          contentId: destination.id,
          contentType: "travel_package",
          value: destination.price,
          pageType: "destination_detail",
          fbp,
          fbc,
        }

        console.log("[v0] Tracking ViewContent for destination:", destination.name)

        await fetch("/api/track-view-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        // Also track with Facebook Pixel
        if (window.fbq) {
          window.fbq("track", "ViewContent", {
            content_name: destination.name,
            content_ids: [destination.id],
            content_type: "product",
            value: destination.price,
          })
        }
      } catch (error) {
        console.error("[v0] Error tracking ViewContent:", error)
      }
    }

    trackViewContent()
  }, [destination, id])

  if (!destination) {
    return (
      <main>
        <header className="border-b border-border bg-card">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="text-2xl font-bold text-accent">Wanderlust</div>
          </nav>
        </header>
        <section className="py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Destination not found</h1>
          <Link href="/">
            <Button>Back to Destinations</Button>
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Header Navigation */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-2xl font-bold text-accent">Wanderlust</div>
          <div className="flex gap-8 items-center">
            <Link href="/" className="hover:text-accent transition-colors">
              Destinations
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Back Button */}
      <section className="bg-background py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Destinations
          </Link>
        </div>
      </section>

      {/* Destination Hero */}
      <section className="bg-gradient-to-br from-card via-background to-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image & Info */}
            <div className="space-y-8">
              {/* Hero Image */}
              <div className="w-full h-80 bg-gradient-to-br from-accent/40 to-accent/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-20 h-20 text-accent/60" />
              </div>

              {/* Destination Details */}
              <div className="space-y-6 bg-card border border-border rounded-lg p-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{destination.name}</h1>
                  <p className="text-lg text-accent font-semibold">{destination.region}</p>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold text-foreground">{destination.duration}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Star className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-semibold text-foreground">{destination.rating}/5.0</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Best Time</p>
                      <p className="font-semibold text-foreground text-sm">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Timezone</p>
                      <p className="font-semibold text-foreground">{destination.timezone}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-accent">${destination.price}</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>
              </div>
            </div>

            {/* Right Column - Description & Form */}
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">About This Destination</h2>
                  <p className="text-muted-foreground leading-relaxed">{destination.fullDescription}</p>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Trip Highlights</h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {destination.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span className="text-muted-foreground text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lead Form */}
              <LeadForm pageType="contact" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void
  }
}
