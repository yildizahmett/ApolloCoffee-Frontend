'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push('/admin/');
		}, 500);
	}, []);

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='text-4xl font-bold text-center'>Returning...</h1>
		</main>
	);
}
