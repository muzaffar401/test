// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // exclude static files
    "/",
    "/about",
    "/courses",
    "/api/webhook",
    "/(api|trpc)(.*)",
  ],
};
