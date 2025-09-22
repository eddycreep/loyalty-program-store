import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js middleware to handle authentication routing
 * Redirects unauthenticated users to /login and protects authenticated routes
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Get authentication tokens from cookies
    const userCookie = request.cookies.get('user')?.value;
    const isAuthenticated = userCookie && userCookie !== 'undefined';
    
    // Public routes that don't require authentication
    const publicRoutes = ['/login'];
    const isPublicRoute = publicRoutes.includes(pathname);
    
    // If user is authenticated and trying to access login page, redirect to home
    if (isAuthenticated && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    // If user is not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Allow the request to proceed
    return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 * Excludes static files and API routes from middleware processing
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}; 