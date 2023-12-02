'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaPerson } from 'react-icons/fa6';

const ProfileSignInOut = () => {
	const { data, status } = useSession();

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

	if (status === 'authenticated') {
		return (
			<div className="flex items-center gap-3">
				{data?.user?.image !== null && data?.user.image !== undefined ? (
					<Image
						src={data?.user?.image}
						alt="Profile image"
						width="50"
						height="50"
						className="max-h-8 max-w-min rounded md:max-h-10 lg:max-h-14"
					/>
				) : (
					<FaPerson size={30} />
				)}
				<div>Hi, {data?.user.name}</div>
				<button
					onClick={() => signOut()}
					className="m-3 rounded p-2 hover:bg-hoverPrimary"
				>
					Sign out
				</button>
			</div>
		);
	}

	return <div className="m-3 p-2">Loading...</div>;
};

export default ProfileSignInOut;
