'use client';

import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { type ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CiHeart } from 'react-icons/ci';

import { DeleteItemDialog } from '@/components/DeleteItemDialog';
import { ItemEnum } from '@/model/ItemEnum';
import { ContactSellerDialog } from '@/components/ContactSellerDialog';
import { type Ad } from '@/types/ads';
import { type User } from '@/types/user';
import { useFavorites } from '@/hooks/useFavourites';
import { favoriteFunc } from '@/fetch/deletePutFavorite';

import default_img from '../../public/default_img.jpg';

type Props = {
	ad: Ad;
	author: User;
	children: ReactNode;
};

export const AdDetail = (props: Props) => {
	const { data } = useSession();
	const { data: favorites } = useFavorites(data?.user.id);
	const jeVlastnik = data?.user.id === props.ad?.authorId;
	const queryClient = useQueryClient();

	const isFavorite = favorites?.some(obj => obj.id === props.ad?.id)
		? true
		: false;

	const favoriteMutation = useMutation({
		mutationFn: favoriteFunc
	});

	const handleCklickFavorite = async () => {
		if (data?.user) {
			const dataAuc = {
				userId: data.user.id,
				adId: props.ad?.id,
				isFavorite
			};
			favoriteMutation.mutateAsync(dataAuc, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['list', 'favorites'] });
				}
			});
		} else {
			signIn('discord');
		}
	};

	return (
		<div className="m-2 rounded-b-lg border-4 border-primaryBackground md:flex-col">
			<div className="gap-4 p-4 md:flex">
				<div className="flex items-center justify-center gap-2 md:w-1/2">
					<button onClick={() => handleCklickFavorite()}>
						{isFavorite ? <FaHeart size={25} /> : <CiHeart size={30} />}
					</button>
					<h1 className="flex-grow text-4xl">{props.ad?.title}</h1>
				</div>
			</div>
			<div className="gap-2 p-4 text-xl md:flex">
				<div className="flex items-center justify-center md:w-1/4">
					<div className="w-2/5 md:w-2/3">
						{props.ad.image_URL ? (
							<Image
								src={props.ad?.image_URL}
								width="100"
								height="100"
								layout="responsive"
								alt="Ad image"
							/>
						) : (
							<Image
								src={default_img}
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
						{props.ad?.description}
					</div>
					<div className="flex items-center justify-center gap-2 md:items-center md:justify-start">
						<div>
							<b>Price</b>: {props.ad?.price} €
						</div>
						{jeVlastnik || (
							<ContactSellerDialog
								sellerEmail={
									props.author.email === null ? undefined : props.author.email
								}
								item={props.ad}
							/>
						)}
					</div>
					<div className="items-center justify-center gap-2 md:items-center md:justify-start lg:flex">
						<div className="flex items-center justify-center md:items-center md:justify-start">
							<b>Seller</b>: {props.author.name}
						</div>
						<div className="flex items-center justify-center md:items-center md:justify-start">
							<b>Last updated</b>:{' '}
							{new Date(props.ad.updatedAt).toLocaleString()}
						</div>
					</div>
					{jeVlastnik && (
						<div className="flex items-center justify-center gap-2 md:items-center md:justify-start">
							{props.children}
							<DeleteItemDialog id={props.ad?.id} itemEnum={ItemEnum.Ad} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
