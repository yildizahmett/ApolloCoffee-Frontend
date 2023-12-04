import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Apollo Roastery',
	description: 'Web Programming Homework',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<nav className='flex items-center justify-start bg-neutral-800 gap-x-12 p-4 md:px-24'>
					<Link href='/'>
						<span className='text-white font-bold text-lg'>
							Apollo Roastery
						</span>
					</Link>
					<Link href='/customer-login'>
						<span className='text-white hover:text-gray-300 ml-4'>
							Customer
						</span>
					</Link>
					<Link href='/admin-login'>
						<span className='text-white hover:text-gray-300 ml-4'>Admin</span>
					</Link>
				</nav>
				{children}
			</body>
		</html>
	);
}
