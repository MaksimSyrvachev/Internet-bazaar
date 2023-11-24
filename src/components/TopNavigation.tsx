'use client';

import TopNavigationButton from '@/components/TopNavigationButton';
import Image from "next/image";
import logo from "../../public/logo.jpg"
import {useRouter} from "next/navigation";
import { FaBars } from 'react-icons/fa';
import {useState} from "react";

export const TopNavigation = () => {
	const router = useRouter();

	const [showMenu, setShowMenu] = useState<boolean>(false)

	return(
		<div className="flex-col bg-primaryBackground pe-10 ps-10">
			<div className="flex">
				<div className="m-3 flex-1 p-2">
					<Image src={logo} alt={"logo"} className="max-h-8 md:max-h-10 lg:max-h-14 max-w-min" onClick={() => router.replace('/home')}/>
				</div>
				<div className="flex lg:hidden items-center">
					<FaBars onClick={() => setShowMenu(!showMenu)} className="cursor-pointer"/>
				</div>
				<div className="hidden lg:flex items-center">
					<TopNavigationButton text="Home" path="/home"/>
					<TopNavigationButton text="Auctions" path="/actions"/>
					<TopNavigationButton text="My favorites" path="/my_favorites"/>
					<TopNavigationButton text="My listing" path="/my_listing"/>
					<div>---TODO login---</div>
				</div>
			</div>
			{showMenu && (
				<div className="flex lg:hidden flex-col items-center">
					<TopNavigationButton text="Home" path="/home"/>
					<TopNavigationButton text="Auctions" path="/actions"/>
					<TopNavigationButton text="My favorites" path="/my_favorites"/>
					<TopNavigationButton text="My listing" path="/my_listing"/>
					<div>---TODO login---</div>
				</div>
			)}
		</div>
	);
}
