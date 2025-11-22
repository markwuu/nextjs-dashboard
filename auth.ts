// 🚀 CHAPTER 14: AUTHENTICATION CONCEPT 🚀 //
// file created for bcrypt package because it relies on
// Node.js APIs not available in Next.js proxy
// Proxy.ts file will first check if user is authorized to be on specific
// page before anything happens here

import NextAuth, { AuthError } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z, ZodError } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
	try {
		const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
		return user[0];
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

// 🚀 CHAPTER 14: AUTHENTICATION CONCEPT 🚀 //
export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
	// add different login options in providers like Credentials, Google, Github
	providers: [
		Credentials({
			// Credentials Provider handles signin with arbitrary credentials
			// like user provided username and password
			async authorize(credentials) {
				// validate credentials from user with zod
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				// check credentials
				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(email);
					if (!user) return null;
					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (passwordsMatch) return user;
				}

				console.log('Invalid credentials provided:');
				return null;
			},
		}),
	],
});
