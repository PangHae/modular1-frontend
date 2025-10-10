'use client';

import { useState } from 'react';

import ProfitRateLineChart from '@/components/charts/ProfitRateLineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import { chartLineData } from '@/mock/chartData';

const chartConfig = {
	point: {
		label: 'Points',
	},
	kospi: {
		label: 'KOSPI',
		color: 'var(--chart-1)',
	},
	nasdaq: {
		label: 'NASDAQ',
		color: 'var(--chart-2)',
	},
	sp500: {
		label: 'S&P500',
		color: 'var(--chart-2)',
	},
	mydata: {
		label: 'My Data',
		color: 'var(--chart-4)',
	},
} satisfies ChartConfig;

const PortfolioProfitChartCard = () => {
	const [selectedPeriod, setSelectedPeriod] = useState<
		'oneMonth' | 'threeMonth' | 'sixMonth' | 'oneYear' | 'all'
	>('oneMonth');

	return (
		<Card className="flex-1 min-h-0">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle>포트폴리오 수익률</CardTitle>
					<menu className="flex bg-gray-200 rounded-lg p-1">
						<li>
							<button
								className={`px-4 py-2 text-caption font-medium rounded-md transition-all duration-200 ${
									selectedPeriod === 'oneMonth'
										? 'bg-white text-black shadow-sm'
										: 'text-gray-600 hover:text-black'
								} cursor-pointer`}
								onClick={() => setSelectedPeriod('oneMonth')}
							>
								1M
							</button>
						</li>
						<li>
							<button
								className={`px-4 py-2 text-caption  font-medium rounded-md transition-all duration-200 ${
									selectedPeriod === 'threeMonth'
										? 'bg-white text-black shadow-sm'
										: 'text-gray-600 hover:text-black'
								} cursor-pointer`}
								onClick={() => setSelectedPeriod('threeMonth')}
							>
								3M
							</button>
						</li>
						<li>
							<button
								className={`px-4 py-2 text-caption font-medium rounded-md transition-all duration-200 ${
									selectedPeriod === 'sixMonth'
										? 'bg-white text-black shadow-sm'
										: 'text-gray-600 hover:text-black'
								} cursor-pointer`}
								onClick={() => setSelectedPeriod('sixMonth')}
							>
								6M
							</button>
						</li>
						<li>
							<button
								className={`px-4 py-2 text-caption font-medium rounded-md transition-all duration-200 ${
									selectedPeriod === 'oneYear'
										? 'bg-white text-black shadow-sm'
										: 'text-gray-600 hover:text-black'
								} cursor-pointer`}
								onClick={() => setSelectedPeriod('oneYear')}
							>
								1Y
							</button>
						</li>
						<li>
							<button
								className={`px-4 py-2 text-caption font-medium rounded-md transition-all duration-200 ${
									selectedPeriod === 'all'
										? 'bg-white text-black shadow-sm'
										: 'text-gray-600 hover:text-black'
								} cursor-pointer`}
								onClick={() => setSelectedPeriod('all')}
							>
								All
							</button>
						</li>
					</menu>
				</div>
			</CardHeader>
			<CardContent className="max-h-[calc(100%-72px)] pl-0">
				<ProfitRateLineChart
					chartConfig={chartConfig}
					chartLineData={chartLineData}
					dataKey="mydata"
				/>
			</CardContent>
		</Card>
	);
};

export default PortfolioProfitChartCard;
