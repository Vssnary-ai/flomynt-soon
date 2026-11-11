import { NextRequest, NextResponse } from "next/server";
import { demoLeads } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, agency, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      agency: agency ? agency.trim() : undefined,
      message: message.trim(),
      status: "new" as const,
      createdAt: new Date().toISOString(),
    };

    demoLeads.unshift(newLead);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}

