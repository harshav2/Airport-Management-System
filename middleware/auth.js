import { NextResponse } from "next/server";
import { verifyToken } from "../lib/auth";

export async function middleware(request) {
  const token =
    request.headers.get("authorization")?.split(" ")[1] ||
    request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 403 });
  }

  try {
    const decoded = await verifyToken(token);

    // Add the user info to the request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.userId);
    requestHeaders.set("x-user-type", decoded.userType);

    // Check user type for admin routes
    if (
      request.nextUrl.pathname.startsWith("/dashboard/admin") &&
      decoded.userType !== "Admin"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/passenger", request.url)
      );
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { message: "Token expired", expired: true },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
