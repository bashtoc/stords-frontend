import { NextResponse } from 'next/server';
export function proxy(request) {
    // Get country from Vercel's IP geolocation header (only available on Vercel)
    // Falls back to 'US' in local development
    const country = request.headers.get('x-vercel-ip-country') ||
        request.headers.get('cf-ipcountry') || // Cloudflare fallback
        'US';
    const response = NextResponse.next();
    // Only set the cookie if user hasn't already got one (respect manual overrides)
    if (!request.cookies.has('user-country')) {
        response.cookies.set('user-country', country, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            sameSite: 'lax',
        });
    }
    return response;
}
// Only run the proxy on page routes, not on static assets or API routes
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
