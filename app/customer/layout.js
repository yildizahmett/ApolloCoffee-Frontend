import Link from 'next/link';

export default function Layout({ children }) {
	return (
		<>
			<nav className='flex items-center justify-start bg-neutral-700 gap-x-12 p-4 md:px-24'>
				<Link href='/customer'>
					<span className='text-white hover:text-gray-300 ml-4'>Coffees</span>
				</Link>
				<Link href='/customer/create-order'>
					<span className='text-white hover:text-gray-300 ml-4'>
						Make Order
					</span>
				</Link>
				<Link href='/customer/orders'>
					<span className='text-white hover:text-gray-300 ml-4'>
						Order History
					</span>
				</Link>
			</nav>
			{children}
		</>
	);
}
