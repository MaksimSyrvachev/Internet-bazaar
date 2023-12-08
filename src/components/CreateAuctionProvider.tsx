'use client';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import z from 'zod';

import { type PostAuction, type CreateAuction } from '@/types/auctions';
import { createAuctionSchema } from '@/validators/auctions';
import { createAuction } from '@/fetch/createAuction';
import { DurationEnum } from '@/model/DurationEnum';

type Props = {
	children?: React.ReactNode;
};

export const CreateAuctionProvider = ({ children }: Props) => {
	const router = useRouter();
	const { data: sessionData, status } = useSession();
	const dialogRef = useRef<HTMLDialogElement>(null);
	const queryClient = useQueryClient();

	const methods = useForm<CreateAuction>({
		resolver: zodResolver(createAuctionSchema)
	});

	const createMethods = useMutation({ mutationFn: createAuction });

	const onSubmit: SubmitHandler<CreateAuction> = async data => {
		const deadline = new Date();
		deadline.setHours(deadline.getHours() + Number(data.duration.valueOf()));

		const newAuction: PostAuction = {
			title: data.title,
			description: data.description,
			deadlineTime: deadline.getTime().toString(),
			authorId: sessionData?.user.id!,
			categoryId: data.categoryId,
			createBidSchema: {
				amount: data.startingPrice,
				bidderId: sessionData?.user.id!
			},
			image_URL: data.image_URL !== '' ? data.image_URL : null
		};

		createMethods.mutateAsync(newAuction, {
			onSuccess: _ => {
				methods.reset();
				dialogRef.current?.close();
				queryClient.invalidateQueries({ queryKey: ['list', 'myListing'] });
				router.replace(`/my_listing`);
			},
			onError: error => {
				console.log(error.message);
			}
		});
	};

	const onOpenButton = () => {
		dialogRef.current?.showModal();
	};

	return (
		<div>
			<FormProvider {...methods}>
				<dialog ref={dialogRef} className="rounded-md bg-colorOnPrimary p-10">
					<form
						className="flex flex-col gap-3"
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						<label htmlFor="title">Title</label>
						<input
							className="rounded-lg border-2 border-gray-500 p-1"
							id="title"
							type="text"
							placeholder="Title"
							{...methods.register('title', { required: true })}
						/>
						{methods.formState.errors.title?.message ? (
							<p>{methods.formState.errors.title.message.toString()}</p>
						) : (
							<br />
						)}

						<label htmlFor="desc">Text</label>
						<textarea
							id="desc"
							className=" h-24 rounded-lg border-2 border-gray-500 p-1"
							placeholder="Description"
							{...methods.register('description')}
						/>
						{methods.formState.errors.description?.message ? (
							<p>{methods.formState.errors.description.message.toString()}</p>
						) : (
							<br />
						)}

						<label htmlFor="price">Starting price(EUR)</label>
						<input
							className="rounded-lg border-2 border-gray-500 p-1"
							id="price"
							type="number"
							placeholder="Starting price"
							{...methods.register('startingPrice', {
								valueAsNumber: true,
								required: true
							})}
						/>
						{methods.formState.errors.startingPrice?.message ? (
							<p>
								{methods.formState.errors.startingPrice?.message.toString()}
							</p>
						) : (
							<br />
						)}

						<label htmlFor="image">Image URL</label>
						<input
							className="rounded-lg border-2 border-gray-500 p-1"
							id="image"
							type="text"
							placeholder="Image URL"
							{...methods.register('image_URL')}
							defaultValue={undefined}
						/>
						{methods.formState.errors.image_URL?.message ? (
							<p>{methods.formState.errors.image_URL.message.toString()}</p>
						) : (
							<br />
						)}

						<label htmlFor="name">Duration</label>
						<select
							className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow"
							{...methods.register('duration')}
						>
							{Object.values(DurationEnum).map(duration => (
								<option value={duration.valueOf()} key={duration.valueOf()}>
									{duration.valueOf()}
								</option>
							))}
						</select>

						{children}
						<div className="flex items-center justify-center gap-2">
							<button
								className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
								onClick={() => {
									dialogRef.current?.close();
								}}
								type="button"
							>
								Cancel
							</button>
							<button
								className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
								type="submit"
							>
								{createMethods.isPending ? 'Sending...' : 'Send'}
							</button>
						</div>
					</form>
				</dialog>
				<button
					className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
					onClick={onOpenButton}
				>
					Create auction
				</button>
			</FormProvider>
		</div>
	);
};
