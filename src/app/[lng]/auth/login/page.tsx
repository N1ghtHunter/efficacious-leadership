'use client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button, Form as AntForm, notification } from 'antd';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useTranslation } from '../../../i18n/client';
import AuthLayout from '@/components/Auth/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/_common/axiosInstance';
import Cookies from 'js-cookie';
import { userState } from '@/atoms/userAtom'; // Import the Recoil atom
import { useRecoilState } from 'recoil';

interface IFormInput {
	username: string;
	password: string;
}

const LoginPage = ({ params: { lng } }: { params: { lng: string } }) => {
	const { t } = useTranslation(lng, 'auth');
	const router = useRouter();
	const [_user, setUser] = useRecoilState(userState); // Access Recoil state

	// Validation schema
	const schema = yup.object().shape({
		username: yup.string().required(t('login.errors.usernameRequired')),
		password: yup.string().min(6, t('login.errors.passwordMin')).required(t('login.errors.passwordRequired')),
	});

	// Hook form setup
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	});
	// Handle login
	const onSubmit = async (data: IFormInput) => {
		try {
			const response = await axiosInstance.post('/login', {
				email: data.username,
				password: data.password,
			});
			const { access_token, refresh_token, expires_at, user } = response.data;
			Cookies.set('accessToken', access_token);
			Cookies.set('refreshToken', refresh_token);
			Cookies.set('expiresAt', expires_at);
			// save user data
			setUser(user);
			router.push('/dashboard');
		} catch (error) {
			notification.error({
				message: t('login.errorTitle'),
				description: t('login.invalidCredentials'),
			});
		}
	};

	return (
		<AuthLayout title={t('login.title')}>
			<h2 className='text-center text-lg font-semibold mb-6'>{t('login.login')}</h2>

			<AntForm
				onFinish={handleSubmit(onSubmit)}
				layout='vertical'
			>
				{/* Username Input */}
				<AntForm.Item
					label={t('login.username')}
					validateStatus={errors.username ? 'error' : ''}
					help={errors.username?.message}
				>
					<Controller
						name='username'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder={t('login.placeholder.username')}
								prefix={<FaUserAlt />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Password Input */}
				<AntForm.Item
					label={t('login.password')}
					validateStatus={errors.password ? 'error' : ''}
					help={errors.password?.message}
				>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder={t('login.placeholder.password')}
								prefix={<FaLock />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Submit Button */}
				<Button
					type='primary'
					htmlType='submit'
					block
					className='hover:scale-105 transition-transform mt-4'
					loading={isSubmitting}
				>
					{t('login.loginButton')}
				</Button>

				<div className='text-center mt-4'>
					<p className='text-gray-700'>{t('login.notMember')}</p>
					<Link
						href={`/${lng}/auth/register`}
						className='text-blue-500 hover:text-blue-700 transition-all'
					>
						{t('login.signupNow')}
					</Link>
				</div>
			</AntForm>
		</AuthLayout>
	);
};

export default LoginPage;
