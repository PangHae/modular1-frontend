import { FileText, Flag } from 'lucide-react';

// 주식 데이터
export const stockData = [
	{
		id: 1,
		company: 'Uber',
		companyKr: '우버',
		logo: '🚗',
		price: '83,000',
		changeRate: '+12.5%',
		changeType: 'positive',
		tradeVolume: '120억원',
	},
	{
		id: 2,
		company: 'Walmart',
		companyKr: '월마트',
		logo: '🏪',
		price: '67,000',
		changeRate: '+2.5%',
		changeType: 'positive',
		tradeVolume: '12억원',
	},
	{
		id: 3,
		company: 'Tesla',
		companyKr: '테슬라',
		logo: '⚡',
		price: '83,000',
		changeRate: '+12.5%',
		changeType: 'positive',
		tradeVolume: '120억원',
	},
	{
		id: 4,
		company: 'Meta',
		companyKr: '메타',
		logo: '∞',
		price: '67,000',
		changeRate: '+2.5%',
		changeType: 'positive',
		tradeVolume: '12억원',
	},
];

// 이벤트 데이터
export const events = [
	{
		date: '23',
		day: '화',
		content: '소식이 없어요',
		icon: <FileText className="w-4 h-4 text-gray-500" />,
	},
	{
		date: '25',
		day: '목',
		items: [
			{
				title: '2분기 경제성장률 발표(확정치)',
				icon: <Flag className="w-3 h-3" />,
			},
			{
				title: '신규 실업수당 청구건수',
				icon: <Flag className="w-3 h-3" />,
			},
		],
	},
	{
		date: '26',
		day: '금',
		items: [
			{
				title: '개인소비지출(PCE) 물가지수 발표',
				icon: <Flag className="w-3 h-3" />,
			},
			{
				title: '소비자심리지수 발표(확정치)',
				icon: <Flag className="w-3 h-3" />,
			},
			{
				title: '코스트코 실적발표 | 주요',
				icon: (
					<div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
						C
					</div>
				),
			},
		],
	},
];
