'use client';

import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import React from 'react';

import { DeleteItemDialog } from '@/components/DeleteItemDialog';
import { ItemEnum } from '@/model/ItemEnum';
import { type User } from '@/types/user';
import { type AuctionWithBid } from '@/types/auctions';
import { AuctionTimeLeft } from '@/components/AuctionTimeLeft';
import { BidDialog } from '@/components/BidDialog';

type Props = {
	auction: AuctionWithBid;
	author: User;
};

export const AuctionDetail = (props: Props) => {
	const { data, status } = useSession();
	const jeVlastnik = data?.user.id === props.auction.authorId;

	return (
		<div className="m-2 rounded-b-lg border-4 border-primaryBackground md:flex-col">
			<div className="gap-4 p-4 md:flex">
				<div className="flex items-center justify-center gap-2 md:w-1/2">
					<FaHeart />
					<h1 className="flex-grow text-4xl">{props.auction.title}</h1>
				</div>
				<div className="flex flex-grow items-center justify-center pt-2 md:pt-0">
					{Number(props.auction.deadlineTime) > new Date().getTime() ? (
						<AuctionTimeLeft deadline={Number(props.auction.deadlineTime)} />
					) : (
						<p className="p-2 text-red-500">EXPIRED</p>
					)}
				</div>
			</div>
			<div className="gap-2 p-4 text-xl md:flex">
				<div className="flex items-center justify-center md:w-1/4">
					<div className="w-2/5 md:w-2/3">
						{!!props.auction?.image_URL && (
							<Image
								src={props.auction.image_URL}
								width="100"
								height="100"
								layout="responsive"
								alt="Ad image"
							/>
						)}
					</div>
				</div>
				<div className="flex-col space-y-2 md:w-3/4 md:flex-grow ">
					<div className="flex items-center justify-center md:items-start md:justify-start">
						{props.auction?.description}
					</div>
					<div className="flex items-center justify-center gap-2 md:items-center md:justify-start">
						<div>
							<b>Highest bid</b>: {props.auction.bids[0].amount} €
						</div>
						{jeVlastnik || <BidDialog auction={props.auction} />}
					</div>
					<div className="items-center justify-center gap-2 md:items-center md:justify-start lg:flex">
						<div className="flex items-center justify-center md:items-center md:justify-start">
							<b>Seller</b>: {props.author.name}
						</div>
						<div className="flex items-center justify-center md:items-center md:justify-start">
							<b>Last updated</b>:{' '}
							{new Date(props.auction.bids[0].createdAt).toLocaleString()}
						</div>
					</div>
					{jeVlastnik &&
						Number(props.auction.deadlineTime) < new Date().getTime() && (
							<div className="flex items-center justify-center gap-2 md:items-center md:justify-start">
								<DeleteItemDialog
									id={props.auction.id}
									itemEnum={ItemEnum.Auction}
								/>
							</div>
						)}
				</div>
			</div>
		</div>
	);
};
