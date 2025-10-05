import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const accessToken = request.cookies.get('access-token');
	const protectedPaths = ['/dashboard', '/stocks', '/strategies'];
	const publicPaths = ['/', '/auth/login', '/auth/register'];
	const isProtectedPath = protectedPaths.some((path) =>
		pathname.startsWith(path)
	);
	const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

	if (pathname === '/') {
		if (accessToken) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		} else {
			return NextResponse.redirect(new URL('/auth/login', request.url));
		}
	}

	if (isProtectedPath && !accessToken) {
		return NextResponse.redirect(new URL('/auth/login', request.url));
	}

	if (isPublicPath && accessToken) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

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
