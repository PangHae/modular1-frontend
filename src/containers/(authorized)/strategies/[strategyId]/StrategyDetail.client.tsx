'use client';

import { FC, useEffect } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useInView } from 'react-intersection-observer';

import { FullScreenLoading } from '@/components/common/Loading';
import StrategyStatusChip from '@/components/common/StrategyStatusChip';
import { Card, CardContent } from '@/components/ui/card';
import { useExecutionById } from '@/hooks/api/execution/useExecutionById';
import { useStrategyDetail } from '@/hooks/api/strategy/useStrategyDetail';
import { cn } from '@/lib/utils';

import ProfitRateCard from './_view/ProfitRateCard';
import RecentExecution from './_view/RecentExecution';
import StrategyDetailTab from './_view/StrategyDetailTab';

const StrategyDropdownMenuClient = dynamic(
	() => import('./_view/StrategyDropdownMenu.client'),
	{
		ssr: true,
	}
);

interface Props {
	strategyId: number;
}

const StrategyDetailClient: FC<Props> = ({ strategyId }) => {
	const { ref, inView } = useInView();
	const { data: strategyDetail, isLoading: isStrategyDetailLoading } =
		useStrategyDetail(strategyId);
	const { data, fetchNextPage, hasNextPage } = useExecutionById(strategyId, 20);

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	if (isStrategyDetailLoading) {
		return (
			<FullScreenLoading message="최근 체결 내역을 불러오고 있습니다..." />
		);
	}

	if (!strategyDetail) {
		return (
			<div className="flex items-center justify-center w-full h-full">
				<div className="text-sub2! text-gray-500">
					전략이 존재하지 않습니다.
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen p-6 gap-4">
			{/* 좌측 컬럼 */}
			<div className="flex-1 space-y-4 h-full shrink-0 max-w-[calc(50%-20px)] overflow-y-auto relative">
				{/* 전략 헤더 섹션 */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								{strategyDetail.strategyInfo.strategyName}
							</h1>
							<div className="flex items-center gap-2 mt-1">
								<div className="w-6 h-6 rounded flex items-center justify-center">
									<Image
										className="rounded-full"
										src={`https://images.tossinvest.com/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${strategyDetail.stockInfo.stockCode}.png?width=64&height=64`}
										alt={`${strategyDetail.stockInfo.stockName}`}
										width={32}
										height={32}
									/>
								</div>
								<span className="text-gray-600">
									{strategyDetail.stockInfo.stockName}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-end gap-2">
						<StrategyStatusChip
							status={strategyDetail.strategyInfo.strategyActivatedStatus}
						/>
						<StrategyDropdownMenuClient strategyId={strategyId} />
					</div>
				</div>

				{/* 성과 지표 카드 */}
				<Card>
					<CardContent className="p-1">
						<div className="grid grid-cols-3 gap-6">
							<div className="text-center">
								<div className="text-sm text-gray-600 mb-1">누적 수익률</div>
								<div
									className={cn(
										'text-2xl! font-bold',
										strategyDetail.strategyProfit.allProfit > 0
											? 'text-[#F04452]'
											: strategyDetail.strategyProfit.allProfit < 0
												? 'text-[#3182F6]'
												: 'text-gray-500'
									)}
								>
									{`${strategyDetail.strategyProfit.allProfit.toFixed(2)}%`}
								</div>
							</div>
							<div className="text-center">
								<div className="text-sm text-gray-600 mb-1">
									최근 7일 누적 수익률
								</div>
								<div
									className={cn(
										'text-2xl! font-bold',
										strategyDetail.strategyProfit.weekProfit > 0
											? 'text-[#F04452]'
											: strategyDetail.strategyProfit.weekProfit < 0
												? 'text-[#3182F6]'
												: 'text-gray-500'
									)}
								>
									{`${strategyDetail.strategyProfit.weekProfit.toFixed(2)}%`}
								</div>
							</div>
							<div className="text-center">
								<div className="text-sm text-gray-600 mb-1">거래 체결 수</div>
								<div className="text-2xl font-bold text-gray-900">
									{data?.pages[0].data.tradeExecutionCount}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<StrategyDetailTab
					strategyTemplate={strategyDetail.strategyTemplate}
					strategySummary={strategyDetail.strategySummary}
					code={strategyDetail.code}
				/>
			</div>
			{/* 우측 컬럼 */}
			<div className="flex flex-col flex-1 gap-4 shrink-0 overflow-y-auto">
				{/* 수익률 그래프 */}
				<ProfitRateCard profitRateSeries={strategyDetail.profitSeries} />
				{/* 최근 체결 내역 */}
				<RecentExecution
					ref={ref}
					hasNextPage={hasNextPage}
					executions={
						data?.pages.flatMap((page) => page.data.tradeExecutions) || []
					}
				/>
			</div>
		</div>
	);
};

export default StrategyDetailClient;
