'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';

// Validation schema using Yup
const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface IFormInput {
	username: string;
	password: string;
}

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: IFormInput) => {
		console.log(data);
		// Handle login logic here (API call, authentication, etc.)
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-2xl font-bold text-center mb-4 text-blue-500'>MTN Live Stream</h1>
				<h2 className='text-center text-lg font-semibold mb-6 text-indigo-500'>LOGIN</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4'>
						<label className='block text-gray-700'>Username</label>
						<input
							type='text'
							className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
							{...register('username')}
						/>
						{errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>}
					</div>

					<div className='mb-4'>
						<label className='block text-gray-700'>Password</label>
						<input
							type='password'
							className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
							{...register('password')}
						/>
						{errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
					</div>

					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all'
					>
						Log In
					</button>

					<div className='text-center mt-4'>
						<p className='text-gray-700'>Not a member?</p>
						<Link
							href='/auth/signup'
							className='text-blue-500'
						>
							Sign up now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
