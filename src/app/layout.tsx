import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Navigation from '@/components/Navigation';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | Internet bazaar',
		default: 'Internet bazaar'
	},
	description:
		'Bazaar application like bazos.cz with improved UI and auctions functionality.'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<head>
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<link
				rel="icon"
				href="/icon?<generated>"
				type="image/<generated>"
				sizes="<generated>"
			/>
		</head>
		<body className={`${inter.className}`}>
			<Providers>
				<Navigation>{children}</Navigation>
			</Providers>
		</body>
	</html>
);

export default RootLayout;
