'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

import TopNavigationButton from '@/components/TopNavigationButton';
import ProfileSignInOut from '@/components/ProfileSignInOut';

import logo from '../../public/logo.jpg';

export const TopNavigation = () => {
	const router = useRouter();

	const [showMenu, setShowMenu] = useState<boolean>(false);

	return (
		<div className="flex-col bg-primaryBackground pe-10 ps-10">
			<div className="flex">
				<div className="m-3 flex-1 p-2">
					<Image
						src={logo}
						alt="logo"
						className="max-h-8 max-w-min md:max-h-10 lg:max-h-14"
						onClick={() => router.replace('/home')}
					/>
				</div>
				<div className="flex items-center lg:hidden">
					<FaBars
						onClick={() => setShowMenu(!showMenu)}
						className="cursor-pointer"
					/>
				</div>
				<div className="hidden items-center lg:flex">
					<TopNavigationButton text="Home" path="/home" />
					<TopNavigationButton text="Auctions" path="/auctions" />
					<TopNavigationButton text="My favorites" path="/my_favorites" />
					<TopNavigationButton text="My listing" path="/my_listing" />
					<ProfileSignInOut />
				</div>
			</div>
			{showMenu && (
				<div className="flex flex-col items-center lg:hidden">
					<TopNavigationButton text="Home" path="/home" />
					<TopNavigationButton text="Auctions" path="/auctions" />
					<TopNavigationButton text="My favorites" path="/my_favorites" />
					<TopNavigationButton text="My listing" path="/my_listing" />
					<ProfileSignInOut />
				</div>
			)}
		</div>
	);
};
