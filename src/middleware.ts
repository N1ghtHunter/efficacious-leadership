import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export async function middleware(req: NextRequest) {
	// Localization (i18n) logic
	let lng;
	if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)!.value);
	if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
	if (!lng) lng = fallbackLng;

	// Redirect if language in path is not supported
	if (
		!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!req.nextUrl.pathname.startsWith('/_next')
	) {
		return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
	}

	// Authentication logic
	const refreshToken = req.cookies.get('refreshToken')?.value;
	const expiresAt = req.cookies.get('expiresAt')?.value;
	const isAuthenticated = refreshToken && expiresAt && new Date(expiresAt).getTime() > Date.now();
	const authRequiredPaths = ['/dashboard', '/profile']; // Add paths where authentication is required
	// Redirect to login if user tries to access protected paths without being authenticated
	if (authRequiredPaths.some((path) => req.nextUrl.pathname.startsWith(`/${lng + path}`)) && !isAuthenticated) {
		return NextResponse.redirect(new URL(`/${lng}/auth/login`, req.url)); // Redirect to login
	}

	// Handle language persistence via the referer header
	if (req.headers.has('referer')) {
		const refererUrl = new URL(req.headers.get('referer')!);
		const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
		const response = NextResponse.next();
		if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
		return response;
	}

	return NextResponse.next();
}
