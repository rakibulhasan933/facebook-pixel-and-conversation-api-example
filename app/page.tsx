"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Star, Clock, Users } from "lucide-react"
import { destinations } from "@/lib/destinations"

export default function Home() {
  const handleDestinationClick = (destinationId: string, destinationName: string) => {
    // Track ViewContent event with Facebook Pixel
    if (window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: destinationName,
        content_ids: [destinationId],
        content_type: "product",
        value: 0,
        currency: "USD",
      })
      console.log("[v0] ViewContent tracked for:", destinationName)
    }
  }

  return (
    <main>
      {/* Header Navigation */}
      <header className="border-b border-border bg-card">
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

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-br from-card via-background to-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
                Explore Unforgettable <span className="text-accent">Destinations</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
                Discover breathtaking travel experiences curated just for you. Browse our collection and start planning your next adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Catalog */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground">Click on any destination to learn more and express your interest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destination/${destination.id}`}
                onClick={() => handleDestinationClick(destination.id, destination.name)}
                className="group"
              >
                <div className="rounded-lg border border-border bg-card overflow-hidden hover:shadow-xl transition-all hover:border-accent">
                  {/* Destination Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center group-hover:from-accent/40 group-hover:to-accent/20 transition-all">
                    <MapPin className="w-12 h-12 text-accent/60" />
                  </div>

                  {/* Destination Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{destination.region}</p>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>

                    {/* Quick Stats */}
                    <div className="flex gap-4 pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span>{destination.rating}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-lg font-bold text-accent">${destination.price}</p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>

                    {/* View Button */}
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Adventure?</h2>
          <p className="text-lg mb-8 opacity-90">Get expert travel advice tailored to your preferences</p>
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent bg-transparent"
            >
              Contact Us <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
