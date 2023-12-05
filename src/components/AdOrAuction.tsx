'use client';

import { CiHeart } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import React from 'react';

import { type Ad as AdModel } from '@/types/ads';
import { type AuctionWithBid as AuctionModel } from '@/types/auctions';
import { AuctionTimeLeft } from '@/components/AuctionTimeLeft';

type Props = {
	ad?: AdModel;
	auction?: AuctionModel;
};

export const AdOrAuction = (props: Props) => {
	const router = useRouter();
	const handleCklickFavourite = () => {
		console.log('sds');
	};

	const onItemClick = () => {
		if (props.ad !== undefined) {
			router.replace(`/home/${props.ad.id}`);
		} else if (props.auction !== undefined) {
			router.replace(`/auction/${props.auction.id}`);
		}
	};

	return (
		<div className="m-2 flex border-2 p-2 hover:bg-adBackground">
			<div className="flex w-1/12 items-center justify-center">
				<div>{props.ad ? props.ad.image_URL : props.auction?.image_URL}</div>
			</div>
			<div className="w-7/12 flex-col">
				<div>{props.ad ? props.ad.title : props.auction?.title}</div>
				<div>
					{props.ad ? props.ad.description : props.auction?.description}
				</div>
			</div>
			{props.ad && (
				<>
					<div className="flex w-2/12 items-center justify-start ">
						<div>Price: {props.ad.price ?? 'By agreement'}</div>
					</div>
					<div className="flex w-2/12 items-center justify-center ">
						<button onClick={handleCklickFavourite}>
							<CiHeart size={30} />
						</button>
					</div>
				</>
			)}
			{props.auction && (
				<div className="flex w-4/12 flex-col pr-2">
					<div className="flex justify-between ">
						<p className="p-2">Highest bid: {props.auction.bids[0].amount}$</p>
						<button className="pr-5">Bid</button>
					</div>
					<div>
						{Number(props.auction.deadlineTime) - new Date().getTime() > 0 ? (
							<AuctionTimeLeft deadline={Number(props.auction.deadlineTime)} />
						) : (
							<p className="p-2 text-red-500">EXPIRED</p>
						)}
					</div>
				</div>
			)}
			<div>
				<button
					className="rounded-2xl underline hover:bg-selectedPrimary"
					onClick={onItemClick}
				>
					See details
				</button>
			</div>
		</div>
	);
};
