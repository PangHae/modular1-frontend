import { LayoutGrid, Target } from 'lucide-react';

export const MENU = [
	{
		title: '대시보드',
		href: '/dashboard',
		icon: <LayoutGrid width={32} height={32} strokeWidth={1} />,
	},
	{
		title: '전략',
		href: '/strategies',
		icon: <Target width={32} height={32} strokeWidth={1} />,
	},
	// {
	// 	title: '종목 상세',
	// 	href: '/stocks',
	// 	icon: <ChartCandlestick width={32} height={32} strokeWidth={1} />,
	// },
];
