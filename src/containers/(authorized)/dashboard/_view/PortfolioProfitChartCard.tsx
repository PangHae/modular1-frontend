'use client';

import { useState } from 'react';

import { ProfitDataKey } from '@/@types/strategy';
import ProfitRateLineChart from '@/components/charts/ProfitRateLineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import { useAccountProfitRateSeries } from '@/hooks/api/accounts/useAccountProfitRateSeries';

const chartConfig = {
	cumulativeProfitRate: {
		label: '1M',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig;

const PortfolioProfitChartCard = () => {
	const { data, isLoading } = useAccountProfitRateSeries();
	const [selectedPeriod, setSelectedPeriod] =
		useState<ProfitDataKey>('oneMonth');

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Card className="flex-1 min-h-0">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle>포트폴리오 수익률</CardTitle>
					<menu className="flex bg-gray-200 rounded-lg p-1">
						<li>
							<button
								className={`px-4 py-1 text-caption font-medium rounded-md transition-all duration-200 ${
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
								className={`px-4 py-1 text-caption  font-medium rounded-md transition-all duration-200 ${
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
								className={`px-4 py-1 text-caption font-medium rounded-md transition-all duration-200 ${
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
								className={`px-4 py-1 text-caption font-medium rounded-md transition-all duration-200 ${
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
								className={`px-4 py-1 text-caption font-medium rounded-md transition-all duration-200 ${
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
				{!data && (
					<div className="flex items-center justify-center h-64">
						<div className="text-lg text-gray-500">No data</div>
					</div>
				)}
				<ProfitRateLineChart
					id="portfolio-profit-rate-chart"
					chartConfig={chartConfig}
					chartLineData={data?.data.profitSeries[selectedPeriod] || []}
					dataKey="cumulativeProfitRate"
				/>
			</CardContent>
		</Card>
	);
};

export default PortfolioProfitChartCard;
