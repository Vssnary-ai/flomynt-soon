import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/adminAuth";
import { fetchLeads, fetchWishlist } from "@/lib/adminData";

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""').replace(/\n/g, " ")}"`;
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type") || "leads";

  if (type === "leads") {
    const { leads } = await fetchLeads();
    const headers = ["ID", "Name", "Email", "Agency", "Message", "Status", "CreatedAt"];
    const rows = leads.map((l) => [
      l.id,
      csvCell(l.name),
      csvCell(l.email),
      csvCell(l.agency || ""),
      csvCell(l.message),
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
    const { wishlist } = await fetchWishlist();
    const headers = ["ID", "Email", "Workflow Idea", "Source", "PriorityPosition", "CreatedAt"];
    const rows = wishlist.map((w) => [
      w.id,
      csvCell(w.email),
      csvCell(w.idea || ""),
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
