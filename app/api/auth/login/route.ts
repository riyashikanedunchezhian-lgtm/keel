import { NextResponse } from "next/server";
import { SESSION_COOKIE, loginAccount, sessionCookie } from "@/lib/accounts";
import { clientKey, tooManyAttempts } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (tooManyAttempts(clientKey(request, "login"))) {
    return NextResponse.json(
      { error: "Too many attempts. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the login as JSON." }, { status: 400 });
  }

  const result = await loginAccount(body.email ?? "", body.password ?? "");
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const response = NextResponse.json(result.account);
  response.cookies.set(SESSION_COOKIE, result.token, sessionCookie);
  return response;
}
