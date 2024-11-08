import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth"; // You'll need to implement this function

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const userType = request.cookies.get("userType")?.value;

  // Define protected routes and their corresponding user types
  const protectedRoutes = {
    "/dashboard/admin": ["admin"],
    "/dashboard/user": ["user"],
    "/dashboard/airline": ["airline"],
    "/dashboard/store": ["store"],
  };

  // Check if the current path is a protected route
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if no token is present
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the token
      await verifyToken(token);

      // Check if the user has the correct type for the route
      const routePrefix = "/" + request.nextUrl.pathname.split("/")[1];
      if (!protectedRoutes[routePrefix].includes(userType)) {
        // Redirect to the appropriate dashboard based on user type
        switch (userType) {
          case "admin":
            return NextResponse.redirect(
              new URL("/dashboard/admin", request.url)
            );
          case "user":
            return NextResponse.redirect(
              new URL("/dashboard/user", request.url)
            );
          case "airline":
            return NextResponse.redirect(
              new URL("/dashboard/airline", request.url)
            );
          case "store":
            return NextResponse.redirect(
              new URL("/dashboard/store", request.url)
            );
          default:
            return NextResponse.redirect(new URL("/login", request.url));
        }
      }
    } catch (error) {
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // For non-protected routes or if everything is okay, continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/user/:path*",
    "/dashboard/airline/:path*",
    "/dashboard/store/:path*",
  ],
};
