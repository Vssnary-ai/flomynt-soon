import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, demoLeads, Lead } from "@/lib/adminAuth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ leads: demoLeads });
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const lead = demoLeads.find((l) => l.id === id);
    if (lead) {
      lead.status = status;
      return NextResponse.json({ success: true, lead });
    }
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  } catch (err) {
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
    const index = demoLeads.findIndex((l) => l.id === id);
    if (index !== -1) {
      demoLeads.splice(index, 1);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}

