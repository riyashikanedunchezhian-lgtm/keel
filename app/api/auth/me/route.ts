import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, accountFromToken } from "@/lib/accounts";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const account = await accountFromToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!account) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  return NextResponse.json(account);
}
