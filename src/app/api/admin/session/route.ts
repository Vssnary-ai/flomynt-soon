import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/adminAuth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;
  const isAuthenticated = verifySessionToken(sessionCookie);

  return NextResponse.json({ authenticated: isAuthenticated });
}
