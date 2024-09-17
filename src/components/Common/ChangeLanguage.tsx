'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const ChangeLanguage = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [activeLng, setActiveLng] = useState<string | null>(null);
	const changeLanguage = (locale: string) => {
		const path = pathname.split('/').slice(2).join('/');
		router.push(`/${locale}/${path}`);
	};

	useEffect(() => {
		const lng = pathname.split('/')[1];
		setActiveLng(lng);
	}, [pathname]);

	return (
		<div className='text-center my-6 text-black'>
			<button
				onClick={() => changeLanguage('en')}
				className={`me-4 ${activeLng === 'en' ? 'font-bold' : ''}`}
			>
				English
			</button>
			<button
				onClick={() => changeLanguage('ar')}
				className={`${activeLng === 'ar' ? 'font-bold' : ''}`}
			>
				العربية
			</button>
		</div>
	);
};

export default ChangeLanguage;
