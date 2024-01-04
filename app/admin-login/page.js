'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState } from '@/app/utils';

export default function Page() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (username === '' || password === '') {
			alert('Please enter your username and password');
			return;
		}

		await fetch(`${process.env.NEXT_PUBLIC_API_URL_ADMIN}/admin/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);

				if (data.message) {
					alert(data.message);
					return;
				}

				saveState('admin_token', data.access_token);

				setTimeout(() => {
					router.replace('/admin');
				}, 1000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-y-6 p-24'>
			<h1 className='text-4xl font-bold text-center'>Administrator</h1>
			<form className='mt-8' onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='username'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Username
					</label>
					<input
						type='text'
						id='username'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
			</form>
		</main>
	);
}
