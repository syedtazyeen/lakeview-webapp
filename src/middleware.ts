import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIES } from "./lib/constants";

export function middleware(request: NextRequest) {
  const isLoggedIn = checkIfUserIsLoggedIn(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn && !pathname.endsWith("/login")) {
      return NextResponse.redirect(new URL(`/admin/login`, request.url));
    }

    if (isLoggedIn && pathname.endsWith("/login")) {
      return NextResponse.redirect(new URL(`/admin`, request.url));
    }
  }

  return NextResponse.next();
}

function checkIfUserIsLoggedIn(request: NextRequest): boolean {
  const authToken = request.cookies.get(COOKIES.AUTH_TOKEN)?.value;
  return Boolean(authToken); 
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
