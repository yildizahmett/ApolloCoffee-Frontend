'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState, handleLogoutAdmin } from '@/app/utils';
import Image from 'next/image';
import coffeeImage from '/public/coffee1.png';
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

	// console.log(coffeeImage);

	const [coffees, setCoffees] = useState([]);
	const [coffeeName, setCoffeeName] = useState('');
	const [tallPrice, setTallPrice] = useState(0);
	const [grandePrice, setGrandePrice] = useState(0);
	const [ventiPrice, setVentiPrice] = useState(0);
	const [imageId, setImageId] = useState(0);

	const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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
		const token = loadState('admin_token');

		if (!token) {
			router.replace('/admin-login');
			return;
		}

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-coffees`, {
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

				if (data.msg || data.message) {
					alert(data.msg ?? data.message);
					return;
				}

				// console.log(
				// 	Object.keys(data).map((key) => {
				// 		return { id: key, ...data[key] };
				// 	})
				// );

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

	const modal = document?.getElementById('myModal');

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};

	const handleSubmit = async (event, router) => {
		event.preventDefault();

		const token = loadState('admin_token');

		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/add-coffee`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify({
				name: coffeeName,
				tall_price: tallPrice,
				grande_price: grandePrice,
				venti_price: ventiPrice,
				image_url: imageId,
			}),
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				if (data.message !== 'Coffee added successfully') {
					alert(data.message);
					return;
				}

				const modal = document?.getElementById('myModal');
				modal.style.display = 'none';

				setTimeout(() => {
					router.push('/admin/return');
				}, 500);
			})
			.catch((error) => {
				console.log(error);
			});

		setCoffeeName('');
		setTallPrice('');
		setGrandePrice('');
		setVentiPrice('');
	};

	const handleDelete = async (id) => {
		const token = loadState('admin_token');

		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/delete-coffee`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify({
				id: id,
			}),
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				if (data.message !== 'Coffee deleted successfully') {
					alert(data.message);
					return;
				}

				setTimeout(() => {
					router.push('/admin/return');
				}, 500);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleImageSelection = (imageId) => {
		// console.log(imageId);
		setImageId(imageId);
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-12 p-24'>
			<h1 className='text-4xl font-bold text-center'>Admin Coffee Page</h1>

			<div>
				<button
					className='bg-black hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-md transition-colors'
					onClick={() => {
						const modal = document?.getElementById('myModal');
						modal.style.display = 'block';
					}}
				>
					<span className='text-2xl '>+ ADD</span>
				</button>
			</div>
			<section className='flex flex-wrap justify-center items-center gap-4 md:gap-x-12'>
				{coffees?.map((coffee) => (
					<div key={coffee.id}>
						<div className='bg-white shadow rounded-sm'>
							<div className='min-h-[40px] bg-neutral-200 relative'>
								<button
									onClick={() => {
										const id = coffee.id;
										handleDelete(id);
									}}
									className='absolute top-1 right-1 text-xl bg-[#ff000044] hover:bg-red-700 text-white font-bold py-0.5 px-2 mb-2 rounded-full transition-colors'
								>
									&times;
								</button>
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
							{/* <div className='mt-4 flex justify-center items-center'>
								<button
									onClick={() => {
										const id = coffee.id;
										handleUpdate();
									}}
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded'
								>
									Edit
								</button>
							</div> */}
						</div>
					</div>
				))}
			</section>
			<div
				id='myModal'
				className='hidden fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[#00000022]'
			>
				<div className='bg-[#fefefe] my-[15%] mx-auto p-5 border border-neutral-400 max-w-5xl rounded-xl'>
					<div className='w-full flex justify-between mt-1 mb-4'>
						<span className='text-2xl font-bold text-black'>
							Create a new coffee
						</span>
						<span
							onClick={() => {
								const modal = document?.getElementById('myModal');
								modal.style.display = 'none';
							}}
							className='text-2xl font-extrabold text-neutral-500 hover:text-black no-underline cursor-pointer transition-colors'
						>
							&times;
						</span>
					</div>
					<div className='min-h-[24rem]'>
						<form
							onSubmit={(e) => {
								handleSubmit(e, router);
							}}
							className='grid gap-4 mb-4'
						>
							<label htmlFor='coffee_name' className='text-lg font-bold -mb-2'>
								Coffee Name:
							</label>
							<input
								type='text'
								id='coffee_name'
								value={coffeeName}
								onChange={(e) => setCoffeeName(e.target.value)}
								className='border border-gray-300 rounded-md p-2'
								required
							/>

							<div className='grid grid-cols-3 gap-2'>
								<div className=''>
									<label
										htmlFor='tall_price'
										className='text-lg font-bold mr-2'
									>
										Tall Price:
									</label>
									<input
										type='number'
										id='tall_price'
										value={tallPrice}
										onChange={(e) => setTallPrice(e.target.value)}
										className='w-full border border-gray-300 rounded-md p-2'
										required
										min={1}
									/>
								</div>

								<div className=''>
									<label
										htmlFor='grande_price'
										className='text-lg font-bold mr-2'
									>
										Grande Price:
									</label>
									<input
										type='number'
										id='grande_price'
										value={grandePrice}
										onChange={(e) => setGrandePrice(e.target.value)}
										className='w-full border border-gray-300 rounded-md p-2'
										required
										min={1}
									/>
								</div>

								<div className=''>
									<label
										htmlFor='venti_price'
										className='text-lg font-bold mr-2'
									>
										Venti Price:
									</label>
									<input
										type='number'
										id='venti_price'
										value={ventiPrice}
										onChange={(e) => setVentiPrice(e.target.value)}
										className='w-full border border-gray-300 rounded-md p-2'
										required
										min={1}
									/>
								</div>
							</div>

							<div>
								<label htmlFor='coffee_name' className='text-lg font-bold mb-4'>
									Select Coffee Image:
								</label>
								<div className='w-full flex flex-wrap justify-center gap-2 mt-2'>
									{ids.map((id) => (
										<div
											key={id}
											value={id}
											onClick={() => handleImageSelection(id)}
											className={`${id === imageId ? '' : ''} cursor-pointer`}
										>
											<Image
												src={images[ids[id]]}
												// src={coffeeImage1}
												width={220}
												height={220}
												alt={'coffee' + id}
												className={`border-2  ${
													id === imageId
														? ' border-blue-500 opacity-100 '
														: ' border-gray-700 opacity-60 '
												}  transition-colors shadow-md rounded-md`}
											/>
										</div>
									))}
								</div>
							</div>

							<button
								type='submit'
								className='bg-neutral-700 hover:bg-black text-white font-bold py-2 px-4 rounded-md transition-colors'
							>
								Create
							</button>
						</form>
					</div>
				</div>
			</div>
			<div
				className='absolute top-4 right-4 text-red-500 hover:text-red-700 ml-4 cursor-pointer transition-colors'
				onClick={() => handleLogoutAdmin(router)}
			>
				Logout
			</div>
		</main>
	);
}
