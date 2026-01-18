import { type NextRequest, NextResponse } from "next/server"
import {
  hashEmail,
  hashPhone,
  hashFirstName,
  hashLastName,
  hashCity,
  splitName,
} from "@/lib/facebook-utils"

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json()

    // Extract first and last name
    const { firstName, lastName } = splitName(leadData.firstName)

    // Get event details
    const eventTime = Math.floor(Date.now() / 1000)
    const eventId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const eventSourceUrl = request.headers.get("referer") || ""
    const userAgent = request.headers.get("user-agent") || ""
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      ""

    // Build user data with all required parameters
    const userData: Record<string, string | undefined> = {
      em: hashEmail(leadData.email),
      ph: hashPhone(leadData.phone),
      fn: hashFirstName(firstName),
      ln: hashLastName(lastName),
      ge: leadData.gender || undefined,
      ct: hashCity(leadData.city) || undefined,
      st: leadData.state || undefined,
      zp: leadData.zip || undefined,
      country: leadData.country || undefined,
      client_user_agent: userAgent,
      client_ip_address: clientIp,
      fbp: leadData.fbp || undefined,
      fbc: leadData.fbc || undefined,
    }

    // Remove undefined values
    Object.keys(userData).forEach((key) => userData[key] === undefined && delete userData[key])

    // Define the type for user_data to satisfy TypeScript
    type FacebookUserData = {
      client_user_agent: string;
      client_ip_address: string;
      fbp: any;
      fbc: any;
      [key: string]: any;
    };

    // Prepare data for Facebook Conversion API (Lead event)
    const facebookPayload = {
      data: [
        {
          event_name: "Lead",
          event_time: eventTime,
          event_id: eventId,
          event_source: "website",
          action_source: "website",
          event_source_url: eventSourceUrl,
          user_data: {
            ...userData,
            client_user_agent: userAgent,
            client_ip_address: clientIp,
            fbp: leadData.fbp || undefined, // Facebook pixel browser ID
            fbc: leadData.fbc || undefined, // Facebook click ID
          } as FacebookUserData,
          custom_data: {
            value: 1,
            currency: "USD",
            content_name: `${leadData.pageType || "website"} Lead - ${leadData.company || "General"}`,
            content_category: "travel",
            content_type: "lead",
            num_items: 1,
          },
          opt_out: false,
        },
      ],
      test_event_code: undefined, // Leave undefined for production
    }

    // Remove undefined values from nested objects
    facebookPayload.data[0].user_data = Object.fromEntries(
      Object.entries(facebookPayload.data[0].user_data).filter(([_, v]) => v !== undefined)
    ) as FacebookUserData

    console.log("[v0] Sending to Facebook Conversion API:", JSON.stringify(facebookPayload, null, 2))

    // Send to Facebook Conversion API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_CONVERSION_API_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facebookPayload),
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      console.error("[v0] Facebook API error:", responseData)
      return NextResponse.json(
        { success: false, error: "Facebook API error", details: responseData },
        { status: response.status }
      )
    }

    console.log("[v0] Facebook API response:", responseData)

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully to Facebook",
        leadId: eventId,
        facebookResponse: responseData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Lead submission error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit lead", details: String(error) },
      { status: 500 }
    )
  }
}
