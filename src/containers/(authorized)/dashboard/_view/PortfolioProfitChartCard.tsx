'use client';

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
	return (
		<Card className="flex-1 min-w-0 min-h-0">
			<CardHeader>
				<CardTitle>포트폴리오 수익률</CardTitle>
			</CardHeader>
			<CardContent className="max-h-[calc(100%-40px)] pl-0">
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
