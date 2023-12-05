'use client';

import { useRef } from 'react';
import { type Auction } from '.prisma/client';

import { type Ad } from '@/types/ads';

type Props = {
	item: Ad | Auction;
};
export const EditCreateItemDialog = (props: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const onEditOpenButton = () => {
		dialogRef.current?.showModal();
	};

	const onSave = () => {
		// todo save item
		dialogRef.current?.close();
	};

	return (
		<>
			<dialog ref={dialogRef} className="rounded-md bg-colorOnPrimary p-10">
				<div className="flex-col space-y-1">
					<div className="flex items-center justify-center">
						Do you really want to delete this item?
					</div>
					<div className="flex items-center justify-center gap-2">
						<button
							className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
							onClick={() => dialogRef.current?.close()}
						>
							Cancel
						</button>
						<button
							className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
							onClick={onSave}
						>
							Save
						</button>
					</div>
				</div>
			</dialog>
			<button
				className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
				onClick={onEditOpenButton}
			>
				Edit
			</button>
		</>
	);
};
