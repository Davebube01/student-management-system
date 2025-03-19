import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";


const protectedRoutesRegex = /^\/(students|student\/new|students\/[^/]+|students\/[^/]+\/edit|students\/[^/]+\/delete)(\/|$)/;
const publicRoutesRegex = /^\/login(\/|$)/;


export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutesRegex.test(path);
    const isPublicRoute = publicRoutesRegex.test(path);

    // Await the cookies function as required
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    let session
    if (sessionCookie) {
        try {
            session = await decrypt(sessionCookie);
        } catch (error) {
            console.error("Session decryption failed:", error);
        }
    }

    // Handle redirects
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/students", req.url));
    }

    return NextResponse.next();
}