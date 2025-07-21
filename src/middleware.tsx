import { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const accessToken = request.cookies.get("sb-access-token")?.value;
  const isLoggedIn = !!accessToken;

  console.log(
    "Middleware: accessToken =",
    accessToken,
    "isLoggedIn =",
    isLoggedIn
  );

  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/auth/confirm"],
};
