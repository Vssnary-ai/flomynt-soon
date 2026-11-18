import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/adminAuth";
import { fetchWishlist, deleteWishlistEntry } from "@/lib/adminData";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { wishlist, source } = await fetchWishlist();
  return NextResponse.json({ wishlist, source });
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    const success = await deleteWishlistEntry(id);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: "Failed to delete wishlist entry" }, { status: 500 });
  }
}
