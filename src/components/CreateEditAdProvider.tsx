'use client';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

import { type Ad, type AdForm } from '@/types/ads';
import { adFormSchema } from '@/validators/ads';
import { createAd } from '@/fetch/createAd';
import { editAd } from '@/fetch/editAd';

type Props = {
	ad?: Ad;
	children?: React.ReactNode;
};

export const CreateEditProvider = ({ children, ad }: Props) => {
	const router = useRouter();
	const { data: sessionData, status } = useSession();
	const dialogRef = useRef<HTMLDialogElement>(null);

	const methods = useForm<AdForm>({
		resolver: zodResolver(adFormSchema)
	});

	const createMethods = useMutation({ mutationFn: createAd });
	const editMethods = useMutation({ mutationFn: editAd });

	const onSubmit: SubmitHandler<AdForm> = data => {
		if (ad !== undefined) {
			const newAd = { ...data, id: ad.id, authorId: ad.authorId };

			editMethods.mutate(newAd, {
				onSuccess: _ => {
					methods.reset();
					dialogRef.current?.close();
					router.replace(`/home`);
				},
				onError: () => {
					alert('There was an error');
				}
			});
		} else {
			const newAd = { ...data, authorId: sessionData?.user.id! };

			createMethods.mutate(newAd, {
				onSuccess: _ => {
					methods.reset();
					dialogRef.current?.close();
					router.replace(`/home`);
				},
				onError: () => {
					alert('There was an error');
				}
			});
		}
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
							defaultValue={ad !== undefined ? ad.title : ''}
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
							defaultValue={ad?.description ? ad.description : ''}
						/>
						{methods.formState.errors.description?.message ? (
							<p>{methods.formState.errors.description.message.toString()}</p>
						) : (
							<br />
						)}

						<label htmlFor="price">Expected price(EUR)</label>
						<input
							className="rounded-lg border-2 border-gray-500 p-1"
							id="price"
							type="number"
							placeholder="Price"
							{...methods.register('price', { valueAsNumber: true })}
							defaultValue={ad?.price ? ad.price : 0}
						/>
						{methods.formState.errors.price?.message ? (
							<p>{methods.formState.errors.price?.message.toString()}</p>
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
							defaultValue={ad?.image_URL ? ad?.image_URL : ''}
						/>
						{methods.formState.errors.image_URL?.message ? (
							<p>{methods.formState.errors.image_URL.message.toString()}</p>
						) : (
							<br />
						)}

						{children}
						<div className="flex items-center justify-center gap-2">
							<button
								className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
								onClick={() => {
									dialogRef.current?.close();
									methods.reset();
								}}
							>
								Cancel
							</button>
							<button
								className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
								type="submit"
							>
								{createMethods.isPending || editMethods.isPending
									? 'Sending...'
									: 'Send'}
							</button>
						</div>
					</form>
				</dialog>
				<button
					className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
					onClick={onOpenButton}
				>
					Create ad
				</button>
			</FormProvider>
		</div>
	);
};
