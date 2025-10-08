'use client';

import * as React from 'react';

import { Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartStyle } from '@/components/ui/chart';
import { chartDoughnutData } from '@/mock/chartData';

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
	const id = 'portfolio-chart';
	const [activeStock, setActiveStock] = React.useState(
		chartDoughnutData[0].stock
	);

	const activeIndex = React.useMemo(
		() => chartDoughnutData.findIndex((item) => item.stock === activeStock),
		[activeStock]
	);

	const handleMouseEnter = (data: any) => {
		if (data && data.stock) {
			setActiveStock(data.stock);
		}
	};

	return (
		<Card className="flex-1 min-w-0 min-h-0" data-chart={id}>
			<ChartStyle id={id} config={chartConfig} />
			<CardHeader className="flex space-y-0 pb-0 justify-between">
				<CardTitle>보유 종목 비중</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-1 items-center gap-8 pb-0">
				{/* 파이차트 */}
				<ChartContainer
					id={id}
					config={chartConfig}
					className="flex-1 aspect-square max-w-[300px]"
				>
					<PieChart>
						<Pie
							data={chartDoughnutData}
							dataKey="amount"
							nameKey="stock"
							strokeWidth={5}
							innerRadius={60}
							activeIndex={activeIndex}
							onMouseEnter={handleMouseEnter}
							activeShape={({
								outerRadius = 0,
								...props
							}: PieSectorDataItem) => (
								<g>
									<Sector {...props} outerRadius={outerRadius + 10} />
									<Sector
										{...props}
										outerRadius={outerRadius + 25}
										innerRadius={outerRadius + 12}
									/>
								</g>
							)}
						/>
					</PieChart>
				</ChartContainer>

				{/* 선택된 종목 정보 */}
				<div className="flex-1 flex flex-col items-center justify-center gap-4">
					<div className="text-center">
						<div className="text-3xl font-bold text-foreground mb-2">
							{chartDoughnutData[activeIndex].amount.toLocaleString()}원
						</div>
						<div className="text-lg text-muted-foreground">
							{chartConfig[activeStock as keyof typeof chartConfig]?.label}
						</div>
					</div>

					{/* 비율 표시 */}
					<div className="text-center">
						<div className="text-2xl font-semibold text-foreground">
							{(
								(chartDoughnutData[activeIndex].amount /
									chartDoughnutData.reduce(
										(sum, item) => sum + item.amount,
										0
									)) *
								100
							).toFixed(1)}
							%
						</div>
						<div className="text-sm text-muted-foreground">전체 대비 비율</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PortfolioChart;
