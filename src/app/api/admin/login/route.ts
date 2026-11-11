import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  checkRateLimit,
  registerFailedAttempt,
  resetRateLimit,
  verifyAdminPassword,
  createSessionToken,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Check rate limit
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil((rateCheck.remainingWaitMs || 0) / 60000);
      return NextResponse.json(
        {
          error: `Too many failed attempts. Locked out for ${waitMinutes} more minute(s).`,
          locked: true,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // 2. Timing-safe verify password
    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
      const { locked, remainingAttempts } = registerFailedAttempt(ip);
      if (locked) {
        return NextResponse.json(
          {
            error: "Too many failed attempts. Access locked for 15 minutes.",
            locked: true,
          },
          { status: 429 }
        );
      }
      return NextResponse.json(
        {
          error: `Invalid password. ${remainingAttempts} attempt(s) remaining.`,
          locked: false,
        },
        { status: 401 }
      );
    }

    // 3. Reset rate limit on success
    resetRateLimit(ip);

    // 4. Generate signed session token & set httpOnly secure cookie
    const token = createSessionToken();
    const cookieStore = await cookies();

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
  }
}

