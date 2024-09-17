import { dir } from 'i18next';
import { languages } from '../i18n/settings';
import '../globals.css';
import { Metadata } from 'next';

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
	title: 'Efficacious Leadership',
	description: 'Efficacious Leadership',
};

export default function RootLayout({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: { lng: string };
}) {
	return (
		<html
			lang={lng}
			dir={(dir(lng) as 'ltr' | 'rtl') || 'ltr'}
		>
			<head />
			<body>{children}</body>
		</html>
	);
}
