'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState, handleLogoutCustomer } from '@/app/utils';
import Image from 'next/image';
import checkmarkImage from '/public/checkmark.png';

export default function Page({ params }) {
	const router = useRouter();

	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-12 p-24'>
			<h1 className='text-4xl font-bold text-center'>Order Confirmed</h1>

			<section className='flex flex-wrap justify-center items-center gap-4 md:gap-x-12'>
				<div>
					<div className='drop-shadow-md m-12 flex justify-center'>
						<Image
							src={checkmarkImage}
							width={200}
							height={200}
							alt='checkmark'
						/>
					</div>
					<div className='max-w-7xl mx-auto bg-white shadow rounded-sm'>
						<div className='p-12'>
							<div className='text-5xl font-bold mb-4'>
								Thanks for your order!
							</div>
							<div className='text-lg text-gray-500 mb-4'>
								Your order # is: {params?.order_id ?? '---'}
							</div>
							<div className='flex justify-center'>
								<button
									className='mt-4 bg-black hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-md transition-colors'
									onClick={() => router.push('/customer/orders')}
								>
									<span className='text-2xl '>View Orders</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div
				className='absolute top-4 right-4 text-red-500 hover:text-red-700 ml-4 cursor-pointer transition-colors'
				onClick={() => handleLogoutCustomer(router)}
			>
				Logout
			</div>
		</main>
	);
}
