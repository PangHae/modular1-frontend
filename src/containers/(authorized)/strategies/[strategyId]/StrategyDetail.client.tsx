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
import { useStrategyDetail } from '@/hooks/api/strategy/useStrategyDetail';
import { cn } from '@/lib/utils';

interface Props {
	strategyId: number;
}

const StrategyDetailClient: FC<Props> = ({ strategyId }) => {
	const { data, isLoading } = useStrategyDetail(strategyId);
	console.log(data);
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-lg text-gray-500">Loading...</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-lg text-gray-500">No data</div>
			</div>
		);
	}

	return (
		<div className="h-screen p-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
				{/* 좌측 컬럼 */}
				<div className="space-y-4 h-full">
					{/* 전략 헤더 섹션 */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div>
								<h1 className="text-2xl font-bold text-gray-900">
									{data.strategyInfo.strategyName}
								</h1>
								<div className="flex items-center gap-2 mt-1">
									<div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
										<Image
											className="rounded-full"
											src={`https://images.tossinvest.com/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${data.stockInfo.stockCode}.png?width=64&height=64`}
											alt={`${data.stockInfo.stockName}`}
											width={32}
											height={32}
										/>
									</div>
									<span className="text-gray-600">
										{data.stockInfo.stockName}
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
											data.strategyProfit.allProfit > 0
												? 'text-red-500'
												: 'text-blue-500'
										)}
									>
										{`${data.strategyProfit.allProfit}%`}
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm text-gray-600 mb-1">
										최근 7일 누적 수익률
									</div>
									<div
										className={cn(
											'text-2xl! font-bold',
											data.strategyProfit.weekProfit > 0
												? 'text-red-500'
												: 'text-blue-500'
										)}
									>
										{`${data.strategyProfit.weekProfit}%`}
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm text-gray-600 mb-1">거래 체결 수</div>
									<div className="text-2xl font-bold text-gray-900">34</div>
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
									{data.strategySummary.summaryOverview}
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
									{data.strategySummary.summaryRisk}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<TrendingDown className="w-5 h-5" />
									AI 코멘트
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 leading-relaxed">
									{data.strategySummary.summaryCondition}
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
					<Card className="flex-1">
						<CardHeader>
							<CardTitle>최근 체결 내역</CardTitle>
						</CardHeader>
						<CardContent className="h-full">
							<div className="h-full flex flex-col">
								<div className="flex items-center justify-between py-2 border-b border-gray-100 text-sm text-gray-500">
									<div>시간</div>
									<div>매매</div>
									<div>수량</div>
									<div>금액</div>
									<div>수익률</div>
								</div>
								<div className="flex-1 overflow-y-auto space-y-2">
									<div className="flex items-center justify-between py-2 text-sm">
										<div>2024-01-15 09:30</div>
										<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
											매수
										</span>
										<div>100주</div>
										<div>7,200,000원</div>
										<div className="text-green-600">+2.3%</div>
									</div>
									<div className="flex items-center justify-between py-2 text-sm">
										<div>2024-01-14 14:20</div>
										<span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
											매도
										</span>
										<div>50주</div>
										<div>3,650,000원</div>
										<div className="text-green-600">+1.8%</div>
									</div>
									<div className="flex items-center justify-between py-2 text-sm">
										<div>2024-01-13 11:45</div>
										<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
											매수
										</span>
										<div>75주</div>
										<div>5,400,000원</div>
										<div className="text-red-600">-0.5%</div>
									</div>
									<div className="flex items-center justify-between py-2 text-sm">
										<div>2024-01-12 10:15</div>
										<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
											매수
										</span>
										<div>100주</div>
										<div>7,200,000원</div>
										<div className="text-green-600">+2.3%</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default StrategyDetailClient;
