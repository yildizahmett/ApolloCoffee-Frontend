'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState, handleLogoutCustomer } from '@/app/utils';

export default function Page() {
	const router = useRouter();
	const [userDetails, setUserDetails] = useState({});
	const [coffees, setCoffees] = useState([]);
	const [selectedCoffee, setSelectedCoffee] = useState('');
	const [selectedSize, setSelectedSize] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [deliverTime, setDeliverTime] = useState('');
	const [order, setOrder] = useState([]);

	useEffect(() => {
		const token = loadState('customer_token');

		if (!token) {
			router.replace('/customer-login');
			return;
		}

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-coffees`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

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

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/get-user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				setUserDetails(data);
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleMakeOrder = async () => {
		const token = loadState('customer_token');

		if (!token) {
			router.replace('/customer-login');
			return;
		}

		const bodyOrder = {
			coffees: order,
			deliver_time: deliverTime,
		};

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/make-order`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(bodyOrder),
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(bodyOrder);

				if (data.message !== 'Order added successfully') {
					alert(data.message);
					return;
				}

				router.replace('/customer/orders/' + data.order_id);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleAddCoffee = () => {
		if (!selectedCoffee) {
			alert('Please select a coffee.');
			return;
		}

		if (!selectedSize) {
			alert('Please select a size.');
			return;
		}

		if (!quantity || quantity < 1) {
			alert('Please select a valid quantity.');
			return;
		}

		const temp = getCoffee(selectedCoffee);

		setOrder([
			...order,
			{
				id: temp.id,
				size: selectedSize,
				quantity: quantity,
				price: temp[selectedSize + '_price'],
			},
		]);
		setSelectedCoffee('');
		setSelectedSize('');
		setQuantity(1);
	};

	const handleCoffeeSelection = (coffeeId) => {
		console.log('Selected coffee:', coffeeId);
		if (!coffeeId) {
			setSelectedCoffee(null);
			return;
		}
		setSelectedCoffee(coffeeId);
	};

	const handleSizeSelection = (size) => {
		console.log('Selected size:', size);
		if (!size) {
			setSelectedSize(null);
			return;
		}
		setSelectedSize(size);
	};

	const getCoffee = (coffeeId) => {
		return coffees.find((coffee) => coffee.id === coffeeId);
	};

	const modal = document.getElementById('myModal');
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-12 p-24'>
			<h1 className='text-4xl font-bold text-center'>Customer Ordering</h1>

			<div className='min-w-[48rem] mt-4  bg-white p-4 rounded-md shadow-md'>
				<div className='w-full flex justify-center'>
					<div className='w-full flex justify-center items-center gap-4'>
						<div className='w-1/2'>
							<label className='font-semibold'>Name</label>
							<div className='mt-1 border-2 border-neutral-400 p-2 rounded-xl shadow-inner'>
								{userDetails.name}
							</div>
						</div>
						<div className='w-1/2'>
							<label className='font-semibold'>Surname</label>
							<div className='mt-1 border-2 border-neutral-400 p-2 rounded-xl shadow-inner'>
								{userDetails.surname}
							</div>
						</div>
					</div>
				</div>

				<div className='w-full flex justify-center mt-4'>
					<div className='w-full flex justify-center items-center gap-4'>
						<div className='w-1/2'>
							<label className='font-semibold'>Email</label>
							<div className='mt-1 border-2 border-neutral-400 p-2 rounded-xl shadow-inner'>
								{userDetails.email}
							</div>
						</div>
						<div className='w-1/2'>
							<label className='font-semibold'>Phone Number</label>
							<div className='mt-1 border-2 border-neutral-400 p-2 rounded-xl shadow-inner'>
								{userDetails.phone_number}
							</div>
						</div>
					</div>
				</div>

				<div className='w-full flex justify-center mt-4'>
					<div className='w-full flex justify-center items-center gap-4'>
						<div className='w-1/2'>
							<label className='font-semibold'>Address</label>
							<div className='mt-1 border-2 border-neutral-400 p-2 rounded-xl shadow-inner'>
								{userDetails.address}
							</div>
						</div>
					</div>

					{/* // {
					// 		"address": "Bagcilar cehennemm",
					// 		"email": "yildizah@mef.edu.tr",
					// 		"id": "-NjSApqPVizXo3KsjMnm",
					// 		"name": "Ahmet",
					// 		"phone_number": "5548768774",
					// 		"surname": "Yıldız"
					// } */}
				</div>
			</div>

			<div className='min-w-[48rem] mt-4  bg-white p-4 rounded-md shadow-md'>
				<div className='w-full flex justify-center'>
					<select
						className='min-w-[46rem] border-2 border-neutral-700 p-2 rounded-xl'
						onChange={(e) => handleCoffeeSelection(e.target.value)}
					>
						<option value=''>Select a coffee...</option>
						{coffees.map((coffee) => (
							<option key={coffee.id} value={coffee.id}>
								{coffee.name}
							</option>
						))}
					</select>
				</div>

				{selectedCoffee && (
					<div className='mt-4 p-4 rounded-md shadow-md border-2'>
						<h2 className='text-xl font-bold'>
							{getCoffee(selectedCoffee).name}
						</h2>

						<div>
							<div className='w-full flex justify-around items-center gap-4 font-semibold mt-2'>
								<span>Tall</span>
								<span>Grande</span>
								<span>Venti</span>
							</div>
							<div className='w-full flex justify-around items-center gap-4 font-normal mt-2 mb-4'>
								<span>${getCoffee(selectedCoffee).tall_price}</span>
								<span>${getCoffee(selectedCoffee).grande_price}</span>
								<span>${getCoffee(selectedCoffee).venti_price}</span>
							</div>
						</div>

						<div className='grid grid-cols-1 gap-2 mt-2'>
							<div className='grid grid-cols-2 gap-2 mx-auto'>
								<div className='flex justify-center gap-4'>
									<label className='w-full mt-2 text-end font-semibold'>
										Size
									</label>
									<select
										className=' border-2 border-neutral-700 p-2 rounded-xl'
										onChange={(e) => handleSizeSelection(e.target.value)}
									>
										<option value=''>Select a size...</option>
										<option value='tall'>Tall</option>
										<option value='grande'>Grande</option>
										<option value='venti'>Venti</option>
									</select>
								</div>

								<div className='flex justify-center gap-4'>
									<label className='w-full mt-2 text-end font-semibold'>
										Quantity
									</label>
									<input
										type='number'
										className='border-2 border-neutral-700 p-2 rounded-xl w-16 text-right'
										value={quantity}
										onChange={(e) => setQuantity(e.target.value)}
									/>
								</div>
							</div>

							<button
								className=' bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-lg transition-colors'
								onClick={handleAddCoffee}
							>
								Add to Order
							</button>
						</div>
					</div>
				)}
			</div>

			<div className='min-w-[48rem] mt-4  bg-white p-4 rounded-md shadow-md'>
				<h2 className='text-xl font-bold mb-4'>Your Order</h2>
				<div className='w-full flex justify-center items-center'>
					<div className='mt-2'>
						<table className='table-auto w-full border-2 shadow-sm'>
							<thead>
								<tr>
									<th className='px-4 py-2'>Coffee</th>
									<th className='px-4 py-2'>Size</th>
									<th className='px-4 py-2'>Quantity</th>
									<th className='px-4 py-2'>Price</th>
									<th className='px-4 py-2'>Total</th>
								</tr>
							</thead>
							<tbody>
								{order.length > 0 &&
									order.map(({ id: coffeeId, size, quantity, price }, idx) => (
										<tr
											key={idx}
											className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
										>
											<td className='border px-4 py-2'>
												{getCoffee(coffeeId).name}
											</td>
											<td className='border px-4 py-2'>{size}</td>
											<td className='border px-4 py-2'>{quantity}</td>
											<td className='border px-4 py-2'>{price}</td>
											<td className='border px-4 py-2'>
												{parseFloat(price) * parseInt(quantity)}
											</td>
										</tr>
									))}
								<tr>
									<td
										colSpan={4}
										className='border px-4 py-2 text-right font-semibold'
									>
										Total
									</td>
									<td className='border px-4 py-2 font-semibold'>
										{order.reduce(
											(acc, cur) =>
												acc + parseFloat(cur.price) * parseInt(cur.quantity),
											0
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className='flex justify-center items-center gap-4 mt-4'>
					<label className='font-semibold'>Deliver Time</label>
					<select
						className='border-2 border-neutral-700 p-2 rounded-xl shadow-inner'
						onChange={(e) => {
							setDeliverTime(e.target.value);
						}}
					>
						<option value=''>Select a time...</option>
						<option value='now'>Now</option>
						<option value='in 35 minutes'>In 35 minutes</option>
						<option value='tomorrow'>Tomorrow</option>
					</select>
				</div>

				<button
					className='w-full mt-4 bg-neutral-600 hover:bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg transition-colors'
					onClick={() => {
						if (order.length === 0) {
							alert('Please add at least one coffee to your order.');
							return;
						}

						if (!deliverTime) {
							alert('Please select a deliver time.');
							return;
						}

						const modal = document.getElementById('myModal');
						modal.style.display = 'block';
					}}
				>
					Make Order
				</button>
			</div>

			<div
				id='myModal'
				className='hidden fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[#00000022]'
			>
				<div className='bg-[#fefefe] my-[15%] mx-auto p-5 border border-neutral-400 max-w-4xl rounded-xl'>
					<div className='w-full flex justify-between mt-1 mb-4'>
						<span className='text-2xl font-bold text-black'>
							Confirm your order
						</span>
						<span
							onClick={() => {
								const modal = document.getElementById('myModal');
								modal.style.display = 'none';
							}}
							className='text-2xl font-extrabold text-neutral-500 hover:text-black no-underline cursor-pointer transition-colors'
						>
							&times;
						</span>
					</div>
					<div className='min-h-[12rem]'>
						<div className='min-w-[48rem] mt-4 p-4'>
							<div className='w-full flex justify-center items-center'>
								<div className='mt-2'>
									<table className='table-auto w-full border-2 shadow-sm'>
										<thead>
											<tr>
												<th className='px-4 py-2'>Coffee</th>
												<th className='px-4 py-2'>Size</th>
												<th className='px-4 py-2'>Quantity</th>
												<th className='px-4 py-2'>Price</th>
												<th className='px-4 py-2'>Total</th>
											</tr>
										</thead>
										<tbody>
											{order.length > 0 &&
												order.map(
													({ id: coffeeId, size, quantity, price }, idx) => (
														<tr
															key={idx}
															className={
																idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
															}
														>
															<td className='border px-4 py-2'>
																{getCoffee(coffeeId).name}
															</td>
															<td className='border px-4 py-2'>{size}</td>
															<td className='border px-4 py-2'>{quantity}</td>
															<td className='border px-4 py-2'>{price}</td>
															<td className='border px-4 py-2'>
																{parseFloat(price) * parseInt(quantity)}
															</td>
														</tr>
													)
												)}
											<tr>
												<td
													colSpan={4}
													className='border px-4 py-2 text-right font-semibold'
												>
													Total
												</td>
												<td className='border px-4 py-2 font-semibold'>
													{order.reduce(
														(acc, cur) =>
															acc +
															parseFloat(cur.price) * parseInt(cur.quantity),
														0
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							<div className='flex justify-center items-center gap-4 mt-4'>
								<label className='font-semibold'>Deliver Time</label>
								<div className='min-w-[6rem] border-2 border-neutral-700 p-2 rounded-xl shadow-inner'>
									{deliverTime}
								</div>
							</div>

							<button
								className='w-full mt-4 bg-neutral-600 hover:bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg transition-colors'
								onClick={handleMakeOrder}
							>
								Confirm Order
							</button>
						</div>
					</div>
				</div>
			</div>

			<div
				className='absolute top-4 right-4 text-red-500 hover:text-red-700 ml-4 cursor-pointer transition-colors'
				onClick={() => handleLogoutCustomer(router)}
			>
				Logout
			</div>
		</main>
	);
}
