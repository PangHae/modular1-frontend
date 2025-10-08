'use client';

import { FC } from 'react';

import Image from 'next/image';

import {
	MoreVertical,
	TrendingUp,
	TrendingDown,
	BarChart3,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExecutionById } from '@/hooks/api/execution/useExecutionById';
import { useStrategyDetail } from '@/hooks/api/strategy/useStrategyDetail';
import { cn } from '@/lib/utils';

import RecentExecution from './_view/RecentExecution';

interface Props {
	strategyId: number;
}

const StrategyDetailClient: FC<Props> = ({ strategyId }) => {
	const { data: strategyDetail, isLoading: isStrategyDetailLoading } =
		useStrategyDetail(strategyId);
	const { data: executions, isLoading: isExecutionsLoading } =
		useExecutionById(strategyId);

	if (isStrategyDetailLoading || isExecutionsLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-lg text-gray-500">Loading...</div>
			</div>
		);
	}

	if (!strategyDetail || !executions) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-lg text-gray-500">No data</div>
			</div>
		);
	}

	return (
		<div className="h-screen p-6 overflow-y-auto">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* 좌측 컬럼 */}
				<div className="space-y-4 h-full">
					{/* 전략 헤더 섹션 */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div>
								<h1 className="text-2xl font-bold text-gray-900">
									{strategyDetail.strategyInfo.strategyName}
								</h1>
								<div className="flex items-center gap-2 mt-1">
									<div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
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
						<Button variant="ghost" size="sm">
							<MoreVertical className="w-4 h-4" />
						</Button>
					</div>

					{/* 성과 지표 카드 */}
					<Card>
						<CardContent className="p-6">
							<div className="grid grid-cols-3 gap-6">
								<div className="text-center">
									<div className="text-sm text-gray-600 mb-1">누적 수익률</div>
									<div
										className={cn(
											'text-2xl! font-bold',
											strategyDetail.strategyProfit.allProfit > 0
												? 'text-red-500'
												: 'text-blue-500'
										)}
									>
										{`${strategyDetail.strategyProfit.allProfit}%`}
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
												? 'text-red-500'
												: 'text-blue-500'
										)}
									>
										{`${strategyDetail.strategyProfit.weekProfit}%`}
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm text-gray-600 mb-1">거래 체결 수</div>
									<div className="text-2xl font-bold text-gray-900">
										{executions?.tradeExecutionCount}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 전략 미리보기 카드 */}
					<Card>
						<CardContent className="p-6">
							<div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
								<div className="text-gray-500">전략 미리보기</div>
							</div>
						</CardContent>
					</Card>

					{/* 전략 상세 정보 */}
					<div className="grid grid-cols-1 md:grid-rows-3 gap-4">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BarChart3 className="w-5 h-5" />
									전략 요약
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 leading-relaxed">
									{strategyDetail.strategySummary.summaryOverview}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<TrendingUp className="w-5 h-5" />
									리스크 관리
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 leading-relaxed">
									{strategyDetail.strategySummary.summaryRisk}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<TrendingDown className="w-5 h-5" />
									조건 한 눈에 보기
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 leading-relaxed">
									{strategyDetail.strategySummary.summaryCondition}
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* 우측 컬럼 */}
				<div className="h-full flex flex-col gap-4">
					{/* 수익률 그래프 */}
					<Card className="flex-1">
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>수익률 그래프</CardTitle>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										className="bg-blue-50 text-blue-700 border-blue-200"
									>
										1M
									</Button>
									<Button variant="outline" size="sm">
										3M
									</Button>
									<Button variant="outline" size="sm">
										6M
									</Button>
									<Button variant="outline" size="sm">
										1Y
									</Button>
									<Button variant="outline" size="sm">
										All
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent className="h-full">
							<div className="h-full bg-gray-50 rounded-lg flex items-center justify-center">
								<div className="text-gray-500">수익률 그래프</div>
							</div>
						</CardContent>
					</Card>

					{/* 최근 체결 내역 */}
					<RecentExecution executions={executions?.tradeExecutions || []} />
				</div>
			</div>
		</div>
	);
};

export default StrategyDetailClient;
