'use client';

import DashboardCard from '@/components/layouts/DashboardCard/DashboardCard';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { chartLineData } from '@/mock/chartData';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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
		<DashboardCard className="flex-1">
			<ChartContainer config={chartConfig}>
				<LineChart
					accessibilityLayer
					data={chartLineData}
					margin={{
						left: 12,
						right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						minTickGap={32}
						tickFormatter={(value) => {
							const date = new Date(value);
							return date.toLocaleDateString('ko-KR', {
								month: 'short',
								day: 'numeric',
							});
						}}
					/>
					<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
					{/* <Line dataKey="kospi" stroke="var(--chart-1)" dot={false} /> */}
					{/* <Line dataKey="nasdaq" stroke="var(--chart-2)" dot={false} /> */}
					{/* <Line dataKey="sp500" stroke="var(--chart-3)" dot={false} /> */}
					<Line dataKey="mydata" stroke="var(--chart-4)" dot={false} />
				</LineChart>
			</ChartContainer>
		</DashboardCard>
	);
};

export default PortfolioProfitChartCard;
