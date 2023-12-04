import Link from 'next/link';

export default function Layout({ children }) {
	return (
		<>
			<nav className='flex items-center justify-start bg-neutral-700 gap-x-12 p-4 md:px-24'>
				<Link href='/admin'>
					<span className='text-white hover:text-gray-300 ml-4'>Coffees</span>
				</Link>
				<Link href='/admin/orders'>
					<span className='text-white hover:text-gray-300 ml-4'>Orders</span>
				</Link>
			</nav>
			{children}
		</>
	);
}
