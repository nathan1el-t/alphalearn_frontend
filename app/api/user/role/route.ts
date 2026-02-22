import { NextResponse } from "next/server";

/**
 * API Route: Get user role
 * Acts as a CORS-free proxy between client and backend
 */
export async function GET(request: Request) {
  try {
    // Get authorization header from request
    const authHeader = request.headers.get("Authorization");
    
    if (!authHeader) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json({ error: "Backend URL not configured" }, { status: 500 });
    }

    // Call backend with access token
    const res = await fetch(`${backendUrl}/me/role`, {
      headers: {
        Authorization: authHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("[API /user/role] Backend error:", res.status, error);
      return NextResponse.json(
        { error: "Failed to fetch role", details: error },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API /user/role] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
