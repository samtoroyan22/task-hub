import { NextResponse, NextRequest } from "next/server";
import { token } from "./lib/token-service";
import { PublicPages } from "./config/public-pages";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(token.accessToken)?.value;
  const isLoggedIn = !!accessToken;

  console.log(
    "Middleware: accessToken =",
    accessToken,
    "isLoggedIn =",
    isLoggedIn
  );

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL(PublicPages.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
