import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-y-12 p-24'>
			<div className='flex flex-col items-center justify-start gap-y-12'>
				<h1 className='text-4xl font-bold text-center'>Apollo Roastery</h1>
				<p className='max-w-4xl text-lg text-justify'>
					Welcome to Apollo Roastery, where we serve the finest coffee beans
					from around the world. Our roasters carefully select and roast each
					batch to perfection, ensuring a rich and flavorful coffee experience.
				</p>
			</div>
			<div className='flex justify-center gap-x-12'>
				<Link href='/customer-login'>
					<span className='w-full bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors'>
						Login as a Customer
					</span>
				</Link>
				<Link href='/admin-login'>
					<span className='w-full bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors'>
						Login as an Admin
					</span>
				</Link>
			</div>
		</main>
	);
}
