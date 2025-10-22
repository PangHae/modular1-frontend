import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const accessToken = request.cookies.get('access-token');

	if (!accessToken) {
		if (pathname !== '/auth/login' && pathname !== '/auth/register') {
			return NextResponse.redirect(new URL('/auth/login', request.url));
		}
	} else {
		if (
			pathname === '/' ||
			pathname === '/auth/login' ||
			pathname === '/auth/register'
		) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
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
