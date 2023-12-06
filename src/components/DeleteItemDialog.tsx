'use client';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ItemEnum, type ItemEnum as ItemEnumType } from '@/model/ItemEnum';
import { deleteAd } from '@/fetch/deleteAd';
import Spinner from '@/components/Spinner';
import { deleteAuction } from '@/fetch/deleteAuction';

type Props = {
	id: string;
	itemEnum: ItemEnumType;
};
export const DeleteItemDialog = (props: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();

	const onDeleteOpenButton = () => {
		dialogRef.current?.showModal();
	};

	const methodsAd = useMutation({ mutationFn: deleteAd });
	const methodsAuction = useMutation({ mutationFn: deleteAuction });

	const onApproval = () => {
		if (props.itemEnum === ItemEnum.Ad) {
			methodsAd.mutate(props.id, {
				onSuccess: _ => {
					dialogRef.current?.close();
					router.replace(`/home`);
				},
				onError: () => {
					alert('There was an error');
				}
			});
		} else {
			methodsAuction.mutate(props.id, {
				onSuccess: _ => {
					dialogRef.current?.close();
					router.replace(`/my_listing`);
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
					{methodsAd.isPending && (
						<div className="flex items-center justify-center p-2">
							<Spinner />
						</div>
					)}
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
