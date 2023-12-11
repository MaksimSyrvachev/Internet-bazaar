'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { ChangeUserNameDialog } from '@/components/ChangeUserNameDialog';
import Spinner from '@/components/Spinner';

export const ProfilePage = () => {
	const { data, status } = useSession();
	if (status === 'authenticated') {
		return (
			<div className="m-auto flex flex-col">
				<div className="flex justify-between p-10">
					<p className="mx-3 p-2">{data?.user.name}</p>
					<p className="mx-3 p-2">{data?.user.email}</p>
				</div>
				<ChangeUserNameDialog />
				<button
					onClick={() => signOut()}
					className="m-3 rounded bg-primaryBackground p-2 hover:bg-hoverPrimary"
				>
					Sign out
				</button>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		return (
			<div>
				<button
					onClick={() => signIn('discord')}
					className="m-3 rounded p-2 hover:bg-hoverPrimary"
				>
					Sign in with Discord
				</button>
			</div>
		);
	}

	return (
		<div className="m-6 flex items-center justify-center">
			<Spinner />
		</div>
	);
};
