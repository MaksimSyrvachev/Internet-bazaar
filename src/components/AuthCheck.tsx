'use client';

import { signIn, useSession } from 'next-auth/react';
import { type ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const AuthCheck = (props: Props) => {
	const { data, status } = useSession();

	if (status === 'unauthenticated' || status === 'loading') {
		return (
			<div className="flex items-center justify-center p-5">
				Oops, you need to sign in first.
				<button
					onClick={() => signIn('discord')}
					className="m-3 rounded p-2 hover:bg-hoverPrimary"
				>
					Sign in with Discord
				</button>
			</div>
		);
	}

	return <div>{props.children}</div>;
};
