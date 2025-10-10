'use client';

import { useEffect, useMemo, useState } from 'react';

import { Cell, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartStyle } from '@/components/ui/chart';
import { useHoldingStocks } from '@/hooks/api/accounts/useHoldingStocks';

const CHART_COLORS = [
	'var(--color-chart-1)',
	'var(--color-chart-2)',
	'var(--color-chart-3)',
	'var(--color-chart-4)',
	'var(--color-chart-5)',
];

const PortfolioChart = () => {
	const { data, isLoading } = useHoldingStocks();
	const [activeStock, setActiveStock] = useState<string | null>(null);

	const { chartConfig, chartData } = useMemo(() => {
		if (!data?.data?.items) {
			return {
				chartConfig: {} satisfies ChartConfig,
				chartData: [],
			};
		}
		// marketValue 기준으로 내림차순 정렬
		const sortedStocks = [...data.data.items].sort(
			(a, b) => b.marketValue - a.marketValue
		);

		// 상위 10개와 나머지 분리
		const topStocks = sortedStocks.slice(0, 10);
		const otherStocks = sortedStocks.slice(10);

		// chartConfig 생성
		const config: ChartConfig = {};
		topStocks.forEach((stock, index) => {
			config[stock.stockCode] = {
				label: stock.stockName,
				color: CHART_COLORS[index % CHART_COLORS.length],
			};
		});

		// 기타 항목이 있으면 추가
		if (otherStocks.length > 0) {
			config['OTHER'] = {
				label: '기타',
				color: CHART_COLORS[CHART_COLORS.length - 1],
			};
		}

		// chartData 생성
		const chartDataItems = topStocks.map((stock) => ({
			stock: stock.stockCode,
			amount: stock.marketValue,
		}));

		// 기타 항목의 총합 계산
		if (otherStocks.length > 0) {
			const otherTotal = otherStocks.reduce(
				(sum, stock) => sum + stock.marketValue,
				0
			);
			chartDataItems.push({
				stock: 'OTHER',
				amount: otherTotal,
			});
		}

		return {
			chartConfig: config,
			chartData: chartDataItems,
		};
	}, [data]);

	useEffect(() => {
		if (chartData.length > 0 && !activeStock) {
			setActiveStock(chartData[0].stock);
		}
	}, [chartData, activeStock]);

	const activeIndex = useMemo(
		() => chartData.findIndex((item) => item.stock === activeStock),
		[activeStock, chartData]
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data || chartData.length === 0) {
		return <div>No data</div>;
	}

	const id = 'portfolio-chart';

	const handleMouseEnter = (data: any) => {
		if (data && data.stock) {
			setActiveStock(data.stock);
		}
	};

	// activeIndex가 유효하지 않으면 렌더링하지 않음
	if (activeIndex === -1) {
		return <div>Loading...</div>;
	}

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
							data={chartData}
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
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={chartConfig[entry.stock]?.color || CHART_COLORS[0]}
								/>
							))}
						</Pie>
					</PieChart>
				</ChartContainer>

				{/* 선택된 종목 정보 */}
				<div className="flex-1 flex flex-col items-center justify-center gap-4">
					<div className="text-center">
						<div className="text-3xl font-bold text-foreground mb-2">
							{chartData[activeIndex].amount.toLocaleString()}원
						</div>
						<div className="text-lg text-muted-foreground">
							{chartConfig[activeStock as keyof typeof chartConfig]?.label}
						</div>
					</div>

					{/* 비율 표시 */}
					<div className="text-center">
						<div className="text-2xl font-semibold text-foreground">
							{(
								(chartData[activeIndex].amount /
									chartData.reduce((sum, item) => sum + item.amount, 0)) *
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
