/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./helpers/auth";

export async function middleware(request: NextRequest) {
  const session = await auth(); // get user session
  const { pathname } = request.nextUrl;

  if (
    (pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/forget-password")
    ) &&
    session?.user?.id
  )
    return NextResponse.redirect(new URL("/", request.nextUrl)); // guest only

  else if (
    (pathname.startsWith("/my-profile") || pathname.startsWith("/panel/")) &&
    !session?.user?.id
  )
    return NextResponse.redirect(new URL("/login", request.nextUrl)); // user only

  if (
    (pathname.startsWith("/panel/dashboard") ||
      pathname.startsWith("/panel/voucher") ||
      pathname.startsWith("/panel/events") ||
      pathname.startsWith("/panel/transactions") ||
      pathname.startsWith("/panel/banners") ||
      pathname.startsWith("/panel/faqs") ||
      pathname.startsWith("/panel/company-information")
    ) && session?.user?.role == "CUSTOMER") {
    return NextResponse.redirect(new URL("/panel/ticket", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};
