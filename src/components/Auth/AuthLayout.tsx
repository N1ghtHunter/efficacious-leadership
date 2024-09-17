// components/Common/AuthLayout.tsx

import { ReactNode } from 'react';
import ChangeLanguage from '@/components/Common/ChangeLanguage';

interface AuthLayoutProps {
	title: string;
	children: ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-2xl font-bold text-center mb-4'>{title}</h1>
				{children}
				<ChangeLanguage />
			</div>
		</div>
	);
};

export default AuthLayout;
