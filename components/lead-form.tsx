"use client"

import type React from "react"
import { getCookie } from "@/utils/cookies" // Import getCookie function

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface LeadFormProps {
  pageType: "home" | "contact"
}

export default function LeadForm({ pageType }: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    country: "US",
    state: "",
    city: "",
    zip: "",
    gender: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate required fields
      if (!formData.firstName || !formData.email || !formData.phone) {
        setError("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      // Get Facebook cookies (fbp and fbc)
      const fbp = getCookie("_fbp")
      const fbc = getCookie("_fbc")

      console.log("[v0] Facebook cookies - fbp:", fbp, "fbc:", fbc)

      // Send lead to API route
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pageType,
          timestamp: new Date().toISOString(),
          fbp,
          fbc,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      const data = await response.json()

      // Track with Facebook Pixel (lead conversion)
      if (window.fbq) {
        window.fbq("track", "Lead", {
          value: 1,
          currency: "USD",
          content_name: pageType === "home" ? "Homepage Lead" : "Contact Page Lead",
          content_category: "travel",
        })
      }

      setSubmitted(true)
      setFormData({
        firstName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        country: "US",
        state: "",
        city: "",
        zip: "",
        gender: "",
      })

      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError("Failed to submit form. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const formTitle = pageType === "home" ? "Start Your Journey" : "Send us a Message"
  const formDescription =
    pageType === "home" ? "Tell us about your dream destination" : "We'll get back to you within 24 hours"

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{formTitle}</h3>
        <p className="text-muted-foreground">{formDescription}</p>
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
          <p className="font-semibold">Thank you for your interest!</p>
          <p className="text-sm mt-1">We'll contact you soon to discuss your travel plans.</p>
        </div>
      )}

      {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">{error}</div>}

      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John Doe"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number *
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Company
          </label>
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Your Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-foreground mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unspecified</option>
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
              City
            </label>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="Los Angeles"
              value={formData.city}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
              State/Province
            </label>
            <Input
              id="state"
              name="state"
              type="text"
              placeholder="California"
              value={formData.state}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-foreground mb-2">
              Postal Code
            </label>
            <Input
              id="zip"
              name="zip"
              type="text"
              placeholder="90210"
              value={formData.zip}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-foreground mb-2">
            Country
          </label>
          <Input
            id="country"
            name="country"
            type="text"
            placeholder="United States"
            value={formData.country}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {pageType === "contact" && (
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your travel interests..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full"
            />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        {isLoading ? "Submitting..." : "Get Started"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We respect your privacy. Your information is secure with us.
      </p>
    </form>
  )
}

declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void
  }
}
