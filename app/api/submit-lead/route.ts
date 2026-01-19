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
      em: hashEmail(leadData.email),
      ph: hashPhone(leadData.phone),
      fn: hashFirstName(firstName),
      ln: hashLastName(lastName),
      ct: hashCity(leadData.city),
      st: hashCity(leadData.state),
      zp: hashCity(leadData.zip),
      country: hashCity(leadData.country),
      client_user_agent: userAgent,
      client_ip_address: clientIp,
      ...(leadData.fbp && { fbp: leadData.fbp }),
      ...(leadData.fbc && { fbc: leadData.fbc }),
    }

    // Remove empty values
    Object.keys(userData).forEach(
      (k) => !userData[k] && delete userData[k]
    )

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
          },
        },
      ],
    }

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_CONVERSION_API_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facebookPayload),
      }
    )

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