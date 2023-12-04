'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState, handleLogoutAdmin } from '@/app/utils';

export default function Page() {
	const router = useRouter();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const token = loadState('admin_token');

		if (!token) {
			router.replace('/admin-login');
			return;
		}

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-orders`, {
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

				setOrders(
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
			<h1 className='text-4xl font-bold text-center'>Admin Orders Page</h1>

			<section className='flex flex-col justify-start items-start gap-4 md:gap-x-12'>
				<table className='min-w-full bg-white border border-gray-300 shadow-md'>
					<thead>
						<tr>
							<th className='py-2 px-4 border-b'>Order ID</th>
							<th className='py-2 px-4 border-b'>User Name</th>
							<th className='py-2 px-4 border-b'>User Address</th>
							<th className='py-2 px-4 border-b'>Coffees</th>
							<th className='py-2 px-4 border-b'>Order Date</th>
							<th className='py-2 px-4 border-b'>Order Deliver Time</th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order, idx) => (
							<tr
								key={order.id}
								className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
							>
								<td className='py-2 px-4 border-b'>{order.id}</td>
								<td className='py-2 px-4 border-b'>
									{order.user_name} {order.user_surname}
								</td>
								<td className='py-2 px-4 border-b'>{order.user_address}</td>
								<td className='py-2 px-4 border-b'>
									{order?.coffees?.map((coffee, idx) => (
										<div
											key={idx}
											className='flex justify-start items-start gap-2'
										>
											<span className='font-semibold'>{coffee.name}</span>
											<span className=''>{coffee.size}</span>
											<span className=''>&times;{coffee.quantity}</span>
										</div>
									))}
								</td>
								<td className='py-2 px-4 border-b'>{order.date}</td>
								<td className='py-2 px-4 border-b'>{order.deliver_time}</td>
							</tr>
						))}
						{orders?.length === 0 && (
							<tr>
								<td colSpan='6' className='py-2 px-4 border-b'>
									No orders
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</section>

			<div
				className='absolute top-4 right-4 text-red-500 hover:text-red-700 ml-4 cursor-pointer transition-colors'
				onClick={() => handleLogoutAdmin(router)}
			>
				Logout
			</div>
		</main>
	);
}
