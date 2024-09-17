// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// Replace with your own login logic (e.g., API call)
				const res = await fetch('https://your-api-url.com/api/login', {
					method: 'POST',
					body: JSON.stringify({
						username: credentials?.username,
						password: credentials?.password,
					}),
					headers: { 'Content-Type': 'application/json' },
				});

				const user = await res.json();

				// If successful login, return the user object
				if (res.ok && user) {
					return user;
				}

				// If login fails, return null
				return null;
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET, // Secure secret for encryption
});

export { handler as GET, handler as POST };
