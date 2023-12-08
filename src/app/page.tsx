'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Spinner from '@/components/Spinner';

const Home = () => {
	const router = useRouter();

	useEffect(() => {
		router.replace('/home');
	}, [router]);

	return (
		<div className="flex w-full items-center justify-center p-5">
			<Spinner />
		</div>
	);
};

export default Home;
