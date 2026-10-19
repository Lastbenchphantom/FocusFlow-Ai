import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { contactSchema, sanitizeContactPayload } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request) {
  try {
    const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 60_000);
    const max = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);
    const limit = rateLimit(`contact:${clientIp(request)}`, { windowMs, max });

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((limit.retryAfterMs || windowMs) / 1000)),
          },
        }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    // Honeypot — bots often fill hidden "website" fields
    if (body?.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message);
      return NextResponse.json(
        { error: issues[0] || "Validation failed.", details: issues },
        { status: 400 }
      );
    }

    const payload = sanitizeContactPayload(parsed.data);
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("contact_leads")
      .insert(payload)
      .select("id, created_at")
      .single();

    if (error) {
      console.error("contact_leads insert failed:", error.code || error.message);
      return NextResponse.json(
        { error: "Unable to save your message right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: data.id,
      createdAt: data.created_at,
    });
  } catch (err) {
    console.error("contact route error:", err?.message || err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}
