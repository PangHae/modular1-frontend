'use client';

import { FC, useState } from 'react';

import { ProfitDataKey, ProfitDataSeries } from '@/@types/strategy';
import ProfitRateLineChart from '@/components/charts/ProfitRateLineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';

interface Props {
	profitRateSeries: ProfitDataSeries;
}

const chartConfig = {
	cumulativeProfitRate: {
		label: '1M',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig;

const ProfitRateCard: FC<Props> = ({ profitRateSeries }) => {
	const [selectedPeriod, setSelectedPeriod] =
		useState<ProfitDataKey>('oneMonth');
	const noProfitRateData = profitRateSeries[selectedPeriod].length === 0;
	return (
		<Card className="flex-1 min-h-0">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle>수익률 그래프</CardTitle>
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
				{!noProfitRateData && (
					<ProfitRateLineChart
						id="strategy-profit-rate-chart"
						chartConfig={chartConfig}
						chartLineData={profitRateSeries[selectedPeriod]}
						dataKey="cumulativeProfitRate"
					/>
				)}
				{noProfitRateData && (
					<div className="text-center text-gray-400 py-8">
						수익률 데이터가 없습니다.
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default ProfitRateCard;
