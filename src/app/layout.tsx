import localFont from 'next/font/local';

import QueryClientProvider from '@/components/providers/QueryClientProvider';
import { Toaster } from '@/components/ui/sonner';

import type { Metadata } from 'next';

import './globals.css';

const pretendard = localFont({
	src: './fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
});

export const metadata: Metadata = {
	title: '블록 기반 노코드 자동 감시 주문 플랫폼',
	description:
		'코딩 없이 드래그 앤 드롭으로 매매 전략을 만들고, 실시간으로 자동 실행하는 노코드 플랫폼',
	keywords: [
		'자동매매',
		'노코드',
		'블록 기반',
		'투자',
		'알고리즘 트레이딩',
		'퀀트',
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider>
			<html lang="ko">
				<body
					className={`${pretendard.className} antialiased flex w-dvw h-dvh overflow-hidden bg-custom-gray-bg`}
				>
					{children}
					<Toaster position="bottom-right" richColors />
				</body>
			</html>
		</QueryClientProvider>
	);
}
