import { NextResponse } from "next/server";

/** Lightweight event sink — extend to PostHog server-side or warehouse */
export async function POST(request: Request) {
  try {
    const { event, payload } = await request.json();
    if (process.env.NODE_ENV === "development") {
      console.info("[analytics:api]", event, payload);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
