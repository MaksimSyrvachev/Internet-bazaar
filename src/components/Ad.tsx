'use client';

import { FaHeart } from 'react-icons/fa';

import { type Ad as AdModel } from '@/validators/ads';

type Props = {
	ad?: AdModel;
};

export const Ad = (props: Props) => (
	<div
		className="m-2 flex border-2 p-2 hover:cursor-pointer hover:bg-adBackground"
		onClick={() => console.log(props.ad)}
	>
		<div className="flex w-2/12 items-center justify-center">
			<div>IMG</div>
		</div>
		<div className="w-6/12 flex-col">
			<div>Title</div>
			<div>Description</div>
		</div>
		<div className="flex w-2/12 items-center justify-center">
			<div>Price</div>
		</div>
		<div className="flex w-1/12 items-end justify-end">
			<FaHeart />
		</div>
	</div>
);
