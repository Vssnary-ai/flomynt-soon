import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, demoWishlist } from "@/lib/adminAuth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ wishlist: demoWishlist });
}

