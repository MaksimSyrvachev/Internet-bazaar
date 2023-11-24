'use client';

import { usePathname, useRouter } from 'next/navigation';

type Props = {
	path: string;
	text: string;
};
const TopNavigationButton = (props: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	if (pathname === props.path) {
		return (
			<button
				className="m-3 rounded bg-selectedPrimary p-2 hover:bg-hoverPrimary"
				onClick={() => router.replace(props.path)}
			>
				{props.text}
			</button>
		);
	}

	return (
		<button
			className="m-3 rounded p-2 hover:bg-hoverPrimary"
			onClick={() => router.replace(props.path)}
		>
			{props.text}
		</button>
	);
};

export default TopNavigationButton;
