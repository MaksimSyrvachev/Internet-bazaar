'use client';

import { signIn, useSession } from 'next-auth/react';
import { type ReactNode } from 'react';

import Spinner from './Spinner';

type Props = {
	children: ReactNode;
};

export const AuthCheck = (props: Props) => {
	const { status } = useSession();

	if (status === 'unauthenticated') {
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
	if (status === 'loading') {
		return (
			<div className="mt-2 flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return <div className="w-full">{props.children}</div>;
};
