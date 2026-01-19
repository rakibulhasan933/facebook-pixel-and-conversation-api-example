import { type NextRequest, NextResponse } from "next/server"
import {
  hashEmail,
  hashPhone,
  hashName,
  hashLocation,
  hashGender,
  hashDateOfBirth,
  hashExternalId,
  splitName,
} from "@/lib/facebook-utils"

export async function POST(request: NextRequest) {
  try {
    // Validate required environment variables
    const pixelId = process.env.FACEBOOK_PIXEL_ID
    const accessToken = process.env.FACEBOOK_CONVERSION_API_TOKEN

    if (!pixelId || !accessToken) {
      console.error("[v0] Missing Facebook credentials in environment")
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      )
    }

    const leadData = await request.json()

    const { firstName, lastName } = splitName(leadData.firstName)

    const eventTime = Math.floor(Date.now() / 1000)
    const eventId = `${Date.now()}_${Math.random().toString(36).slice(2)}`
    const eventSourceUrl = request.headers.get("referer") || ""
    const userAgent = request.headers.get("user-agent") || ""
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      ""

    const userData: Record<string, string> = {
      ...(leadData.email && { em: hashEmail(leadData.email)! }),
      ...(leadData.phone && { ph: hashPhone(leadData.phone)! }),
      ...(firstName && { fn: hashName(firstName)! }),
      ...(lastName && { ln: hashName(lastName)! }),
      ...(leadData.gender && { ge: hashGender(leadData.gender)! }),
      ...(leadData.city && { ct: hashLocation(leadData.city)! }),
      ...(leadData.state && { st: hashLocation(leadData.state)! }),
      ...(leadData.zip && { zp: hashLocation(leadData.zip)! }),
      ...(leadData.country && { country: hashLocation(leadData.country)! }),
      ...(leadData.dateOfBirth && { db: hashDateOfBirth(leadData.dateOfBirth)! }),
      ...(leadData.externalId && { external_id: hashExternalId(leadData.externalId)! }),
      client_user_agent: userAgent,
      client_ip_address: clientIp,
      ...(leadData.fbp && { fbp: leadData.fbp }),
      ...(leadData.fbc && { fbc: leadData.fbc }),
    }

    const facebookPayload = {
      data: [
        {
          event_name: "Lead",
          event_time: eventTime,
          event_id: eventId,
          action_source: "website",
          event_source_url: eventSourceUrl,
          user_data: userData,
          custom_data: {
            content_name: `${leadData.pageType || "Website"} Lead`,
            content_category: "travel",
            content_type: "lead",
            num_items: 1,
          },
        },
      ],
      test_event_code: process.env.FACEBOOK_TEST_EVENT_CODE || undefined,
    }

    const facebookUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`

    const response = await fetch(facebookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(facebookPayload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, details: responseData },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { success: true, eventId, facebookResponse: responseData },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
