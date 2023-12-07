'use client';

import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { type Ad as AdModel } from '@/types/ads';
import { type AuctionWithBid as AuctionModel } from '@/types/auctions';
import { type putAndDeleteFavorite } from '@/types/favorite';
import { userSchema } from '@/validators/user';
import { AuctionTimeLeft } from '@/components/AuctionTimeLeft';

type Props = {
	ad?: AdModel;
	auction?: AuctionModel;
	favorites?: (AdModel | AuctionModel)[];
	userId?: string;
};

export const AdOrAuction = (props: Props) => {
	const router = useRouter();
	const { data, status } = useSession();
	const isCreator =
		props.auction?.authorId === data?.user.id ||
		props.ad?.authorId === data?.user.id;
	const isLoggedIn = status === 'authenticated';
	const isFavorite = props.favorites?.some(obj => obj.id === props.ad?.id)
		? true
		: false;

	const queryClient = useQueryClient();
	const favoriteFunc = async (data: putAndDeleteFavorite) => {
		const response = await fetch('/api/favorites', {
			method: isFavorite ? 'DELETE' : 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const result = await response.json();
		const validatedResult = userSchema.safeParse(result);
		if (!validatedResult.success) {
			throw new Error('Invalid data from back-end');
		} else {
			return validatedResult.data;
		}
	};
	const favoriteMutation = useMutation({
		mutationFn: favoriteFunc,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['list', 'favorites'] });
		}
	});
	const handleCklickFavorite = async () => {
		if (props.userId) {
			favoriteMutation.mutateAsync({
				userId: props.userId,
				adId: props.ad?.id
			});
		} else {
			signIn('discord');
		}
	};

	const onItemClick = () => {
		if (props.ad !== undefined) {
			router.replace(`/home/${props.ad.id}?updated=${props.ad.updatedAt}`);
		} else if (props.auction !== undefined) {
			router.replace(
				`/auctions/${props.auction.id}?updated=${props.auction.updatedAt}`
			);
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
						<button onClick={() => handleCklickFavorite()}>
							{isFavorite ? <FaHeart size={25} /> : <CiHeart size={30} />}
						</button>
					</div>
				</>
			)}
			{props.auction && (
				<div className="flex w-4/12 flex-col pr-2">
					<div className="flex justify-between ">
						<p className="p-2">Highest bid: {props.auction.bids[0].amount}$</p>
					</div>
					<div>
						{Number(props.auction.deadlineTime) > new Date().getTime() ? (
							<AuctionTimeLeft deadline={Number(props.auction.deadlineTime)} />
						) : (
							<p className="p-2 text-red-500">EXPIRED</p>
						)}
					</div>
				</div>
			)}
			<div className="flex items-center justify-center">
				<div className="flex-col space-y-1">
					{props.auction && isLoggedIn && !isCreator && (
						<div className="flex items-center justify-center">
							<button className="rounded-2xl p-2 underline hover:bg-selectedPrimary">
								Bid
							</button>
						</div>
					)}
					<button
						className="rounded-2xl p-1 underline hover:bg-selectedPrimary"
						onClick={onItemClick}
					>
						See details
					</button>
				</div>
			</div>
		</div>
	);
};
