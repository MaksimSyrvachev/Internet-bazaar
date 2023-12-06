'use client';

import { useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import z from 'zod';
import { useRouter } from 'next/navigation';

import { type Ad } from '@/types/ads';
import { SendingEmail, type TextEmail } from '@/types/sendingEmail';
import { sendingEmailSchema, textEmail } from '@/validators/sendingEmail';
import { sendEmail } from '@/fetch/sendEmail';
import { type AuctionWithBid } from '@/types/auctions';
import { type Bidding } from '@/types/bidding';
import { bidding } from '@/validators/bidding';
import { createBid } from '@/fetch/createBid';

type Props = {
	auction: AuctionWithBid;
};
export const BidDialog = (props: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { data: userData, status } = useSession();
	const router = useRouter();

	const onOpenButton = () => {
		dialogRef.current?.showModal();
	};

	const methods = useForm<Bidding>({
		resolver: zodResolver(
			z.object({
				amount: z
					.number()
					.min(
						props.auction.bids[0].amount + 1,
						'Bid must be higher then previous one'
					)
					.nonnegative({ message: 'Price must not be a negative number' })
			})
		)
	});

	const { mutate, isPending } = useMutation({ mutationFn: createBid });

	const onSubmit: SubmitHandler<Bidding> = data => {
		const dataToBeSent = {
			amount: data.amount,
			auctionId: props.auction.id,
			bidderId: userData?.user.id!
		};

		mutate(dataToBeSent, {
			onSuccess: data => {
				methods.reset();
				dialogRef.current?.close();
				router.replace(
					`/auctions/${props.auction.id}?updated=${data.createdAt}`
				);
			},
			onError: () => {
				alert('Cannot create bid.');
			}
		});
	};

	return (
		<>
			<dialog ref={dialogRef} className="rounded-md bg-colorOnPrimary p-10">
				<form
					className="flex flex-col gap-3"
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<label htmlFor="bidAmout">Your bid: </label>
					<input
						className="rounded-lg border-2 border-gray-500 p-1"
						id="bidAmout"
						type="number"
						defaultValue={props.auction.bids[0].amount}
						{...methods.register('amount', {
							valueAsNumber: true,
							required: true
						})}
					/>
					{methods.formState.errors.amount?.message ? (
						<p>{methods.formState.errors.amount?.message.toString()}</p>
					) : (
						<br />
					)}

					<div className="flex items-center justify-center gap-2">
						<button
							className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
							onClick={() => {
								methods.reset();
								dialogRef.current?.close();
							}}
						>
							Cancel
						</button>
						<button
							className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
							type="submit"
						>
							{isPending ? 'Bidding...' : 'Bid'}
						</button>
					</div>
				</form>
			</dialog>
			<button
				className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
				onClick={onOpenButton}
			>
				Bid
			</button>
		</>
	);
};
