import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/adminAuth";
import { fetchLeads, updateLead, deleteLead } from "@/lib/adminData";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leads, source } = await fetchLeads();
  return NextResponse.json({ leads, source });
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }
    const result = await updateLead(id, status);
    if (result.success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
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
    const result = await deleteLead(id);
    if (result.success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
