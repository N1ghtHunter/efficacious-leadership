// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession, type AdapterUser } from 'next-auth';

interface User {
	id: string;
	username: string;
	email: string;
	email_verified_at: string | null;
	name: string;
}

declare module 'next-auth' {
	interface Session {
		user: User;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: User;
	}
}

declare module 'next-auth/adapters' {
	interface AdapterUser {
		id: string;
		username: string;
		email: string;
		email_verified_at: string | null;
		name: string;
	}
}
