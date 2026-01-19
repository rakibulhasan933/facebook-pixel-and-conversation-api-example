import { type NextRequest, NextResponse } from "next/server"
import { hashEmail, splitName } from "@/lib/facebook-utils"

// Define the type for user_data to satisfy TypeScript
type FacebookUserData = {
  ge: any;
  ct: any;
  country: any;
  client_user_agent: string;
  client_ip_address: string;
  fbp: any;
  fbc: any;
  [key: string]: any;
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Get event details
    const eventTime = Math.floor(Date.now() / 1000)
    const eventId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const eventSourceUrl = request.headers.get("referer") || ""
    const userAgent = request.headers.get("user-agent") || ""
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      ""

    // Prepare data for Facebook Conversion API (ViewContent event)
    const facebookPayload = {
      data: [
        {
          event_name: "ViewContent",
          event_time: eventTime,
          event_id: eventId,
          event_source: "website",
          action_source: "website",
          event_source_url: eventSourceUrl,
          user_data: {
            ge: data.gender || undefined,
            ct: data.city || undefined,
            country: data.country || undefined,
            client_user_agent: userAgent,
            client_ip_address: clientIp,
            fbp: data.fbp || undefined,
            fbc: data.fbc || undefined,
          },
          custom_data: {
            content_name: data.contentName,
            content_ids: [data.contentId],
            content_type: data.contentType || "product",
            content_category: "travel_package",
          },
          opt_out: false,
        },
      ],
    }

    // Remove undefined values from user_data
    facebookPayload.data[0].user_data = Object.fromEntries(
      Object.entries(facebookPayload.data[0].user_data).filter(([_, v]) => v !== undefined)
    ) as FacebookUserData

    console.log("[v0] Sending ViewContent to Facebook Conversion API:", JSON.stringify(facebookPayload, null, 2))

    // Send to Facebook Conversion API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_CONVERSION_API_TOKEN}`,
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

    console.log("[v0] Facebook Conversion API response:", responseData)

    return NextResponse.json(
      {
        success: true,
        message: "ViewContent event tracked successfully",
        eventId,
        facebookResponse: responseData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] ViewContent tracking error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to track view content", details: String(error) },
      { status: 500 }
    )
  }
}
