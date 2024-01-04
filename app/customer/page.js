'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState, handleLogoutCustomer } from '@/app/utils';
import Image from 'next/image';
import coffeeImage0 from '/public/coffee/0.png';
import coffeeImage1 from '/public/coffee/1.png';
import coffeeImage2 from '/public/coffee/2.png';
import coffeeImage3 from '/public/coffee/3.png';
import coffeeImage4 from '/public/coffee/4.png';
import coffeeImage5 from '/public/coffee/5.png';
import coffeeImage6 from '/public/coffee/6.png';
import coffeeImage7 from '/public/coffee/7.png';
import coffeeImage8 from '/public/coffee/8.png';
import coffeeImage9 from '/public/coffee/9.png';
import coffeeImage10 from '/public/coffee/10.png';
import coffeeImage11 from '/public/coffee/11.png';
import coffeeImage12 from '/public/coffee/12.png';
import coffeeImage13 from '/public/coffee/13.png';
import coffeeImage14 from '/public/coffee/14.png';
import coffeeImage15 from '/public/coffee/15.png';

export default function Page() {
	const router = useRouter();
	const [coffees, setCoffees] = useState([]);

	const images = [
		coffeeImage0,
		coffeeImage1,
		coffeeImage2,
		coffeeImage3,
		coffeeImage4,
		coffeeImage5,
		coffeeImage6,
		coffeeImage7,
		coffeeImage8,
		coffeeImage9,
		coffeeImage10,
		coffeeImage11,
		coffeeImage12,
		coffeeImage13,
		coffeeImage14,
		coffeeImage15,
	];

	useEffect(() => {
		const token = loadState('customer_token');

		if (!token) {
			router.replace('/customer-login');
			return;
		}

		fetch(`${process.env.NEXT_PUBLIC_API_URL_CUSTOMER}/customer/get-coffees`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);

				if (data.msg) {
					alert(data.msg);
					return;
				}

				setCoffees(
					Object.keys(data).map((key) => {
						return { id: key, ...data[key] };
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-12 p-24'>
			<h1 className='text-4xl font-bold text-center'>Customer Coffee Page</h1>
			<p className=''>
				You can browse our selection of coffees here and when you are ready to
				create an order, visit our order creating page.
			</p>

			<section className='flex flex-wrap justify-center items-center gap-4 md:gap-x-12'>
				{coffees?.map((coffee) => (
					<div key={coffee.id}>
						<div className=' bg-white shadow rounded-sm'>
							<div className='min-h-[40px] bg-neutral-200 relative'>
								<Image
									src={images[coffee.image_url ?? 0]}
									width={300}
									height={300}
									alt='coffee'
								/>
							</div>
							<div className='card-body p-4'>
								<div className='text-center'>
									<h5 className='text-lg font-bold drop-shadow mb-2'>
										{coffee.name}
									</h5>
									<div className='grid grid-cols-3 text-sm gap-x-2 text-center mb-2'>
										<span>Tall</span>
										<span>Grande</span>
										<span>Venti</span>
									</div>
									<div className='grid grid-cols-3 text-sm gap-x-4 text-center'>
										<span>${coffee.tall_price}</span>
										<span>${coffee.grande_price}</span>
										<span>${coffee.venti_price}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
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
