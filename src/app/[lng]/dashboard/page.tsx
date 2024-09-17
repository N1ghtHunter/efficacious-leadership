'use client';
import { useRecoilValue } from 'recoil';
import { userState } from '@/atoms/userAtom';
// import axiosInstance from '@/utils/_common/axiosInstance';
// import { notification } from 'antd';
import { useTranslation } from '@/app/i18n/client';
// import useSWR from 'swr';

const DashboardPage = ({ params: { lng } }: { params: { lng: string } }) => {
	// const { t } = useTranslation(lng, 'dashboard');
	// const { data: courseList, error } = useSWR('/getAllCourses', fetchCourses);

	// show toast notification if there is an error
	// if (error) {
	// 	notification.error({
	// 		message: t('errors.fetchCourses'),
	// 	});
	// }

	const user = useRecoilValue(userState);
	// console.log(courseList, 'courses');
	return (
		<div>
			<h1>Welcome, {''}</h1>
			{
				// Display user details
				user && (
					<>
						<p>{user.username}</p>
						<p>{user.email}</p>
						<p>{user.phone}</p>
						<p>{user.work}</p>
						<p>{user.city}</p>
						<p>{user.birthdate}</p>
					</>
				)
			}
		</div>
	);
};

export default DashboardPage;
