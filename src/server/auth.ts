import { PrismaAdapter } from '@auth/prisma-adapter';
import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions
} from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import { db } from '@/server/db';

declare module 'next-auth' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
}

export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id
			}
		})
	},
	adapter: PrismaAdapter(db),
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID ?? '',
			clientSecret: process.env.DISCORD_CLIENT_SECRET ?? ''
		})
	]
};

// eslint-disable-next-line import/no-anonymous-default-export
export const getServerAuthSession = () => getServerSession(authOptions);
