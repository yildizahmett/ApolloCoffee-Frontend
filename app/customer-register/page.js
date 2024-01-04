'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveState, loadState } from '@/app/utils';
import Link from 'next/link';

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');
	const [phone_number, setPhoneNumber] = useState('');
	const [address, setAddress] = useState('');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			email === '' ||
			password === '' ||
			passwordAgain === '' ||
			phone_number === '' ||
			address === '' ||
			name === '' ||
			surname === ''
		) {
			alert('Please fill in all the required fields');
			return;
		}

		if (password !== passwordAgain) {
			alert('Passwords do not match');
			return;
		}

		await fetch(`${process.env.NEXT_PUBLIC_API_URL_CUSTOMER}/customer/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				phone_number,
				address,
				name,
				surname,
			}),
			cache: 'no-store',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				if (data.message !== 'User added successfully') {
					alert(data.message);
					return;
				}

				if (data.message === 'User added successfully') {
					alert(
						"Account created successfully! You'll be redirected to login in a moment."
					);
				}

				setTimeout(() => {
					router.replace('/customer-login');
				}, 1000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start gap-y-6 p-24'>
			<h1 className='text-4xl font-bold text-center'>Customer Registration</h1>
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
						htmlFor='phone_number'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Phone Number
					</label>
					<input
						type='text'
						id='phone_number'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={phone_number}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='address'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Address
					</label>
					<input
						type='text'
						id='address'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='name'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Name
					</label>
					<input
						type='text'
						id='name'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='surname'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Surname
					</label>
					<input
						type='text'
						id='surname'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={surname}
						onChange={(e) => setSurname(e.target.value)}
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
				<div className='mb-4'>
					<label
						htmlFor='passwordAgain'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Password Again
					</label>
					<input
						type='password'
						id='passwordAgain'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						value={passwordAgain}
						onChange={(e) => setPasswordAgain(e.target.value)}
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors'
				>
					REGISTER
				</button>
				<p className='mt-6 text-sm'>
					Already have an account?{' '}
					<Link href='/customer-login'>
						<span className='text-blue-500 hover:underline'>Login here!</span>
					</Link>
				</p>
			</form>
		</main>
	);
}
