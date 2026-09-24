import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, logoutToken, sessionCookie } from "@/lib/accounts";

export async function POST(request: NextRequest) {
  await logoutToken(request.cookies.get(SESSION_COOKIE)?.value);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookie, maxAge: 0 });
  return response;
}
