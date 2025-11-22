// 🚀 CHAPTER 14: AUTHENTICATION CONCEPT 🚀 //
// export authConfig object for NextAuth configuration
// *callbacks option* contains authorized function to protect /dashboard routes

// where auth contains user's session
// where request contains incoming request

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login', //redirects user to custom login page
	},
	providers: [], // ability to add different login options
	callbacks: {
		// called before each request is completed to see if
		// user is authorized to view page
		// auth contains user's session
		async authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}
			return true;
		},
	},
} satisfies NextAuthConfig;
