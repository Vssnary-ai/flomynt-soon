import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, demoLeads, demoWishlist } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type") || "leads";

  if (type === "leads") {
    const headers = ["ID", "Name", "Email", "Agency", "Message", "Status", "CreatedAt"];
    const rows = demoLeads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.agency || "").replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
      l.status,
      l.createdAt,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="flomynt-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } else {
    const headers = ["ID", "Email", "Workflow Idea", "Source", "PriorityPosition", "CreatedAt"];
    const rows = demoWishlist.map((w) => [
      w.id,
      `"${w.email.replace(/"/g, '""')}"`,
      `"${(w.idea || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      w.source,
      w.priorityPosition,
      w.createdAt,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="flomynt-wishlist-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }
}

