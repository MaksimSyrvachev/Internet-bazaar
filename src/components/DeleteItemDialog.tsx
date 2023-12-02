'use client';

import { useRef } from 'react';

import { type ItemEnum } from '@/model/ItemEnum';

type Props = {
	id: string | undefined;
	itemEnum: ItemEnum;
};
export const DeleteItemDialog = (props: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const onDeleteOpenButton = () => {
		dialogRef.current?.showModal();
	};

	const onApproval = () => {
		// todo delete item
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
							No
						</button>
						<button
							className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
							onClick={onApproval}
						>
							Yes
						</button>
					</div>
				</div>
			</dialog>
			<button
				className="rounded bg-primaryBackground p-1 hover:bg-hoverPrimary"
				onClick={onDeleteOpenButton}
			>
				Delete
			</button>
		</>
	);
};
