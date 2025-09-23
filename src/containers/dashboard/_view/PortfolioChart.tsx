'use client';

import DashboardCard from '@/components/layouts/DashboardCard/DashboardCard';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { chartDoughnutData } from '@/mock/chartData';
import { Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const chartConfig = {
	'005930': {
		label: '삼성전자',
		color: 'var(--color-chart-1)',
	},
	'000660': {
		label: 'SK하이닉스',
		color: 'var(--color-chart-2)',
	},
	'373220': {
		label: 'LG에너지솔루션',
		color: 'var(--color-chart-3)',
	},
	'035420': {
		label: 'NAVER',
		color: 'var(--color-chart-4)',
	},
	'035720': {
		label: '카카오',
		color: 'var(--color-chart-5)',
	},
	'005380': {
		label: '현대차',
		color: 'var(--color-chart-1)',
	},
	'005490': {
		label: 'POSCO홀딩스',
		color: 'var(--color-chart-2)',
	},
	'105560': {
		label: 'KB금융',
		color: 'var(--color-chart-3)',
	},
	'055550': {
		label: '신한지주',
		color: 'var(--color-chart-4)',
	},
	OTHER: {
		label: '기타',
		color: 'var(--color-chart-5)',
	},
} satisfies ChartConfig;

const PortfolioChart = () => {
	return (
		<DashboardCard className="flex-1">
			<ChartContainer config={chartConfig} className="w-full h-full">
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={chartDoughnutData}
						dataKey="amount"
						nameKey="stock"
						innerRadius={60}
						strokeWidth={5}
						activeIndex={0}
						activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
							<Sector {...props} outerRadius={outerRadius + 10} />
						)}
					/>
				</PieChart>
			</ChartContainer>
		</DashboardCard>
	);
};

export default PortfolioChart;
