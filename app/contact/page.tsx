"use client"

import Link from "next/link"
import LeadForm from "@/components/lead-form"

export default function ContactPage() {
  return (
    <main>
      {/* Header Navigation */}
      <header className="border-b border-border bg-card">
        <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-2xl font-bold text-accent">Wanderlust</div>
          <div className="flex gap-8 items-center">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about your next adventure? Our travel experts are here to help you plan the perfect
              journey.
            </p>
          </div>

          {/* Contact Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-card rounded-lg border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <a href="mailto:hello@wanderlust.travel" className="text-accent hover:text-accent/80">
                      hello@wanderlust.travel
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                    <a href="tel:+1234567890" className="text-accent hover:text-accent/80">
                      +1 (234) 567-890
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Office</h3>
                    <p className="text-muted-foreground">
                      123 Adventure Street
                      <br />
                      Travel City, TC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Why Choose Us</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-muted-foreground">20+ years of travel expertise</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-muted-foreground">Personalized itineraries</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-muted-foreground">24/7 travel support</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-muted-foreground">Best price guarantee</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <LeadForm pageType="contact" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
