'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState } from '@/app/utils';
import Link from 'next/link';

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email === '' || password === '') {
			alert('Please enter your email and password');
			return;
		}

		await fetch(`${process.env.NEXT_PUBLIC_API_URL_CUSTOMER}/customer/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);

				if (data.message) {
					alert(data.message);
					return;
				}

				saveState('customer_token', data.access_token);

				setTimeout(() => {
					router.replace('/customer');
				}, 1000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-y-6 p-24'>
			<h1 className='text-4xl font-bold text-center'>Customer</h1>
			<form className='mt-8' onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Email
					</label>
					<input
						type='email'
						id='email'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors'
				>
					LOGIN
				</button>
				<p className='mt-6 text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/customer-register'>
						<span className='text-blue-500 hover:underline'>
							Register here!
						</span>
					</Link>
				</p>
			</form>
		</main>
	);
}
