import { useEffect, useState } from 'react';

type Props = {
	deadline: number;
};

const formatCountdown = (t: number) => {
	const days = Math.floor(t / (1000 * 60 * 60 * 24));
	const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((t % (1000 * 60)) / 1000);

	return `${days}d ${hours}h ${minutes}m ${seconds}s `;
};

export const AuctionTimeLeft = ({ deadline }: Props) => {
	const [formattedTime, setFormattedTime] = useState('');

	useEffect(() => {
		setInterval(() => {
			setFormattedTime(formatCountdown(deadline - new Date().getTime()));
		}, 1000);
	}, []);

	return <p className="p-2">Time left: {formattedTime}</p>;
};
