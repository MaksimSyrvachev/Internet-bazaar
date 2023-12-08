'use client';

import { useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { type Ad } from '@/types/ads';
import { type TextEmail } from '@/types/sendingEmail';
import { textEmail } from '@/validators/sendingEmail';
import { sendEmail } from '@/fetch/sendEmail';

type Props = {
	sellerEmail: string | undefined;
	item: Ad;
};
export const ContactSellerDialog = (props: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { data: userData } = useSession();
	const [message, setMessage] = useState<string | undefined>(undefined);

	const onOpenButton = () => {
		dialogRef.current?.showModal();
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TextEmail>({
		resolver: zodResolver(textEmail)
	});

	const { mutate, isPending } = useMutation({ mutationFn: sendEmail });

	const onSubmit: SubmitHandler<TextEmail> = data => {
		if (props.sellerEmail === undefined) {
			alert('Cannot define seller email');
			return;
		}

		if (
			userData === null ||
			userData.user.email === null ||
			userData.user.email === undefined
		) {
			alert('Cannot retrieve your email');
			return;
		}

		const dataToBeSent = {
			to: props.sellerEmail,
			from: userData.user.email,
			title: props.item.title,
			text: data.text
		};

		mutate(dataToBeSent, {
			onSuccess: () => {
				reset();
				dialogRef.current?.close();
			},
			onError: () => {
				setMessage('Cannot send email');
			}
		});
	};

	return (
		<>
			<dialog ref={dialogRef} className="rounded-md bg-colorOnPrimary p-10">
				<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="text">Text</label>
					<textarea
						id="text"
						className=" h-36 rounded-lg border-2 border-gray-500 p-1"
						placeholder="Text"
						{...register('text', { required: true })}
					/>
					{errors.text?.message ? (
						<p>{errors.text?.message.toString()}</p>
					) : (
						<br />
					)}

					<div className="flex items-center justify-center gap-2">
						<button
							className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
							onClick={() => {
								dialogRef.current?.close();
								reset();
							}}
						>
							Cancel
						</button>
						<button
							className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
							type="submit"
						>
							{isPending ? 'Sending...' : 'Send'}
						</button>
					</div>
					{message !== undefined && (
						<div className="flex items-center justify-center p-2 text-red-500">
							{message}
						</div>
					)}
				</form>
			</dialog>
			<button
				className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
				onClick={onOpenButton}
			>
				Contact seller
			</button>
		</>
	);
};
