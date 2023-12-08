'use client';

import { useRef } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import z from 'zod';
import { useRouter } from 'next/navigation';

import { changeUsersName } from '@/fetch/changeUsersName';

type NameField = {
	name: string | null;
};

export const ChangeUserNameDialog = () => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { data: userData, update } = useSession();
	const router = useRouter();

	const onOpenButton = () => {
		dialogRef.current?.showModal();
	};

	const methods = useForm<NameField>({
		defaultValues: {
			name: userData?.user ? userData.user.name : ''
		},
		resolver: zodResolver(
			z.object({
				name: z
					.string()
					.min(1, { message: 'Name is required' })
					.max(50, { message: 'Name must be 50 or fewer characters long' })
			})
		)
	});

	const { mutate, isPending } = useMutation({ mutationFn: changeUsersName });

	const onSubmit: SubmitHandler<NameField> = data => {
		console.log(data);

		if (userData?.user) {
			const dataToBeSent = {
				id: userData.user.id,
				name: data.name
			};
			mutate(dataToBeSent, {
				onSuccess: _ => {
					dialogRef.current?.close();
					router.replace('/my_listing');
					update();
				},
				onError: () => {
					alert('There was an error');
				}
			});
		}
	};

	return (
		<>
			<dialog ref={dialogRef} className="rounded-md bg-colorOnPrimary p-10">
				<form
					className="flex flex-col gap-3"
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<label htmlFor="bidAmout">New name: </label>
					<input
						className="rounded-lg border-2 border-gray-500 p-1"
						{...methods.register('name')}
					/>
					{methods.formState.errors.name && (
						<p className="text-xs italic text-red-500">
							{methods.formState.errors.name?.message}
						</p>
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
							{isPending ? 'Submitting...' : 'Submit'}
						</button>
					</div>
				</form>
			</dialog>
			<button
				className="m-3 rounded bg-primaryBackground p-2 hover:bg-hoverPrimary"
				onClick={onOpenButton}
			>
				Change name
			</button>
		</>
	);
};
