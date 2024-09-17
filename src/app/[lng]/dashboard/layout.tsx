import { ICourse } from '@/@types/courses';
import { useTranslation } from '@/app/i18n';
import axiosInstance from '@/utils/_common/axiosInstance';
import { Metadata } from 'next';

// Fetch courses from the server
const fetchCourses = async (): Promise<ICourse[] | null> => {
	return axiosInstance
		.get('/getAllCourses')
		.then((res) => res.data)
		.catch((error) => {
			console.error('Error fetching courses', error);
			return null;
		});
};

export default async function RootLayout({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: { lng: string };
}) {
	const data = await fetchCourses();
	const { t } = await useTranslation(lng, 'common');
	// Use the first course or fallback if none is available
	const course = data && data.length > 0 ? data[0] : null;

	// Dynamically set metadata based on the course
	const metadata: Metadata = {
		title: course && course.title ? course.title + ' | ' + t('appName') : t('appName'),
	};
	// Log the course data for debugging
	console.log(metadata, 'course metadata', t('appName'));

	return (
		<>
			<head>
				<title>{metadata.title as string}</title>
			</head>
			{children}
		</>
	);
}
