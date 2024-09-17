'use client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button, DatePicker, Select, Form as AntForm } from 'antd';
import { FaUserAlt, FaEnvelope, FaLock, FaPhone, FaBriefcase, FaCity } from 'react-icons/fa';
import { useTranslation } from '../../../i18n/client';
import AuthLayout from '@/components/Auth/AuthLayout';
import Link from 'next/link';
import dayjs from 'dayjs'; // Import dayjs
import { useCountries } from 'use-react-countries';
import Image from 'next/image';

// Validation schema using Yup
interface IFormInput {
	name: string;
	email: string;
	username: string;
	password: string;
	password_confirmation: string;
	phone: string;
	work: string;
	city: string;
	nationality: string;
	birthdate: string | null; // Allow null for birthdate
}

const { Option } = Select;

const RegisterPage = ({ params: { lng } }: { params: { lng: string } }) => {
	const { t } = useTranslation(lng, 'auth');
	const { countries } = useCountries();

	// Validation schema
	const schema = yup.object().shape({
		name: yup.string().required(t('register.errors.nameRequired')),
		email: yup.string().email(t('register.errors.emailInvalid')).required(t('register.errors.emailRequired')),
		username: yup.string().required(t('register.errors.usernameRequired')),
		password: yup.string().min(6, t('register.errors.passwordMin')).required(t('register.errors.passwordRequired')),
		password_confirmation: yup
			.string()
			.oneOf([yup.ref('password')], t('register.errors.confirmPasswordMatch'))
			.required(t('register.errors.confirmPasswordRequired')),
		phone: yup.string().required(t('register.errors.phoneRequired')),
		work: yup.string().required(t('register.errors.workRequired')),
		city: yup.string().required(t('register.errors.cityRequired')),
		nationality: yup.string().required(t('register.errors.nationalityRequired')),
		birthdate: yup
			.string()
			.required(t('register.errors.birthdateRequired'))
			.test('is-past', t('register.errors.birthdatePast'), (value) => {
				if (!value) return false;
				return dayjs(value).isBefore(dayjs());
			})
			.nullable(),
	});

	const {
		control,
		handleSubmit,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: IFormInput) => {
		console.log(data);
		// Handle registration logic here (API call, etc.)
	};

	return (
		<AuthLayout title={t('register.title')}>
			<h2 className='text-center text-lg font-semibold mb-6'>{t('register.createAccount')}</h2>

			<AntForm
				onFinish={handleSubmit(onSubmit)}
				layout='vertical'
			>
				{/* Name Input */}
				<AntForm.Item
					label={t('register.name')}
					validateStatus={errors.name ? 'error' : ''}
					help={errors.name?.message}
				>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder={t('register.placeholder.name')}
								prefix={<FaUserAlt />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Email Input */}
				<AntForm.Item
					label={t('register.email')}
					validateStatus={errors.email ? 'error' : ''}
					help={errors.email?.message}
				>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder={t('register.placeholder.email')}
								prefix={<FaEnvelope />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Username Input */}
				<AntForm.Item
					label={t('register.username')}
					validateStatus={errors.username ? 'error' : ''}
					help={errors.username?.message}
				>
					<Controller
						name='username'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder={t('register.placeholder.username')}
								prefix={<FaUserAlt />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Password Input */}
				<AntForm.Item
					label={t('register.password')}
					validateStatus={errors.password ? 'error' : ''}
					help={errors.password?.message}
				>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder={t('register.placeholder.password')}
								prefix={<FaLock />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Confirm Password Input */}
				<AntForm.Item
					label={t('register.confirmPassword')}
					validateStatus={errors.password_confirmation ? 'error' : ''}
					help={errors.password_confirmation?.message}
				>
					<Controller
						name='password_confirmation'
						control={control}
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder={t('register.placeholder.confirmPassword')}
								prefix={<FaLock />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Phone Input */}
				<AntForm.Item
					label={t('register.phone')}
					validateStatus={errors.phone ? 'error' : ''}
					help={errors.phone?.message}
				>
					<Controller
						name='phone'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder={t('register.placeholder.phone')}
								prefix={<FaPhone />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Work Input */}
				<AntForm.Item
					label={t('register.work')}
					validateStatus={errors.work ? 'error' : ''}
					help={errors.work?.message}
				>
					<Controller
						name='work'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder={t('register.placeholder.work')}
								prefix={<FaBriefcase />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* City Input */}
				<AntForm.Item
					label={t('register.city')}
					validateStatus={errors.city ? 'error' : ''}
					help={errors.city?.message}
				>
					<Controller
						name='city'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder={t('register.placeholder.city')}
								prefix={<FaCity />}
							/>
						)}
					/>
				</AntForm.Item>

				{/* Nationality Select */}
				<AntForm.Item
					label={t('register.nationality')}
					validateStatus={errors.nationality ? 'error' : ''}
					help={errors.nationality?.message}
				>
					<Controller
						name='nationality'
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder={t('register.placeholder.nationality')}
								optionFilterProp='value'
								showSearch
							>
								{countries.map(
									({
										name,
										flags,
									}: {
										name: string;
										capital: string;
										area: number;
										coordinates: number[];
										currencies: {
											name: string;
											symbol: string;
										}[];
										languages: string[];
										maps: {
											googleMaps: string;
											openStreetMaps: string;
										};
										postalCode: {
											format: string;
											regex: string;
										};
										flags: {
											png: string;
											svg: string;
										};
										population: number;
										emoji: string;
										countryCallingCode: string;
									}) => (
										<Option
											key={name}
											value={name}
										>
											{name}
											<Image
												src={flags.svg}
												alt={name}
												className='!w-6 !h-6 rounded-full ml-2 inline-block object-fill'
												width={24}
												height={24}
											/>
										</Option>
									)
								)}
							</Select>
						)}
					/>
				</AntForm.Item>

				{/* Birthdate Picker */}
				<AntForm.Item
					label={t('register.birthdate')}
					validateStatus={errors.birthdate ? 'error' : ''}
					help={errors.birthdate?.message}
				>
					<DatePicker
						format='YYYY-MM-DD'
						placeholder={t('register.placeholder.birthdate')}
						className='w-full'
						showNow={false}
						onChange={(date) => {
							if (date == null) {
								setValue('birthdate', '');
							} else {
								setValue('birthdate', dayjs(date).toISOString());
							}
							clearErrors('birthdate');
						}}
					/>
				</AntForm.Item>
				{/* Submit Button */}
				<Button
					type='primary'
					htmlType='submit'
					block
					className='hover:scale-105 transition-transform mt-4'
				>
					{t('register.registerButton')}
				</Button>

				<div className='text-center mt-4'>
					<p className='text-gray-700'>{t('register.alreadyMember')}</p>
					<Link
						href={`/${lng}/auth/login`}
						className='text-blue-500 hover:text-blue-700 transition-all'
					>
						{t('register.loginNow')}
					</Link>
				</div>
			</AntForm>
		</AuthLayout>
	);
};

export default RegisterPage;
