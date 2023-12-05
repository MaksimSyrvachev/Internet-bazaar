'use client';

import { type User } from '.prisma/client';

import { AdDetail } from '@/components/AdDetail';
import { useAd } from '@/hooks/useAd';
import Spinner from '@/components/Spinner';
import { useUser } from '@/hooks/useUser';

type IdPageProps = {
	params: {
		id: string;
	};
};

const IdPage = ({ params }: IdPageProps) => {
	//TODO fetch data
	const { data: ad, isPending, error } = useAd(params.id);

	const {
		data: user,
		isPending: isPendingUser,
		error: errorUser
	} = useUser(ad?.authorId);

	if (isPending || isPendingUser) {
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (error !== null || errorUser !== null) {
		console.log(user);
		return (
			<div className="flex items-center justify-center">
				Some error has occured
			</div>
		);
	}

	return (
		<div className="w-full pe-10 ps-10">
			<AdDetail ad={ad} author={user} />
		</div>
	);
};

export default IdPage;
