// 🚀 CHAPTER 14: AUTHENTICATION CONCEPT 🚀 //
// initializing NextAuth.js with authConfig object and exporting auth property
// matcher option to specify that it should run on specific paths
// benefit of using proxy is that protected routes won't even start rendering
// until proxy verifies authentication (enhancing security and performance)

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
	// https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
