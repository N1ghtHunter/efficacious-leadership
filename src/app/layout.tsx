import ClientLayout from '@/components/Common/ClientLayout';
import './globals.css';
import { Metadata } from 'next';
import ClientQueryProvider from '@/components/Common/ClientQueryProvider';

export const metadata: Metadata = {
	title: 'Efficacious Leadership',
	description: 'Efficacious Leadership',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head />
			<body>
				<ClientLayout>
					<ClientQueryProvider>{children}</ClientQueryProvider>
				</ClientLayout>
			</body>
		</html>
	);
}
