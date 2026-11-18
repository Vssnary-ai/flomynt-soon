import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/adminAuth";
import { fetchWishlist } from "@/lib/adminData";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { wishlist, source } = await fetchWishlist();
  return NextResponse.json({ wishlist, source });
}
