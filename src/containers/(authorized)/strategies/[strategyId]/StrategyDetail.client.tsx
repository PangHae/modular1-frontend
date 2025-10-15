'use client';

import { FC } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import {
	MoreVertical,
	TrendingUp,
	TrendingDown,
	BarChart3,
	Play,
	Trash,
	Square,
} from 'lucide-react';
import { toast } from 'sonner';

import { Response } from '@/@types/service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { useExecutionById } from '@/hooks/api/execution/useExecutionById';
import { useDeleteStrategy } from '@/hooks/api/strategy/useDeleteStrategy';
import { useStrategyDetail } from '@/hooks/api/strategy/useStrategyDetail';
import { cn } from '@/lib/utils';

import PreviewStrategy from './_view/PreviewStrategy';
import ProfitRateCard from './_view/ProfitRateCard';
import RecentExecution from './_view/RecentExecution';

interface Props {
	strategyId: number;
}

const StrategyDetailClient: FC<Props> = ({ strategyId }) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data: strategyDetail, isLoading: isStrategyDetailLoading } =
		useStrategyDetail(strategyId);
	const { data: executions, isLoading: isExecutionsLoading } =
		useExecutionById(strategyId);

	const { mutate: deleteStrategy } = useDeleteStrategy({
		onSuccess: (data: Response<null>) => {
			toast.success(data.message);
			queryClient.invalidateQueries({
				queryKey: ['strategies'],
			});
			router.push('/strategies');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleDeleteStrategy = () => {
		deleteStrategy(strategyId);
	};

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
		<div className="flex h-screen p-6 overflow-y-auto gap-4">
			{/* 좌측 컬럼 */}
			<div className="flex-1 space-y-4 h-full">
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
					<DropdownMenu>
						<DropdownMenuTrigger className="cursor-pointer">
							<MoreVertical className="w-4 h-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" id="strategy-actions-menu">
							<DropdownMenuItem className="cursor-pointer">
								<Play className="w-[16px] h-[16px]" />
								전략 실행
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<Square className="w-[16px] h-[16px]" />
								전략 정지
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={handleDeleteStrategy}
							>
								<Trash className="w-[16px] h-[16px]" />
								전략 삭제
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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
				<Tabs defaultValue="preview">
					<TabsList>
						<TabsTrigger className="cursor-pointer" value="preview">
							전략 미리보기
						</TabsTrigger>
						<TabsTrigger className="cursor-pointer" value="detail">
							전략 상세 정보
						</TabsTrigger>
					</TabsList>
					<TabsContent value="preview">
						{/* 전략 미리보기 카드 */}
						<PreviewStrategy
							sell={strategyDetail.strategyTemplate?.sell || null}
							buy={strategyDetail.strategyTemplate?.buy || null}
						/>
					</TabsContent>
					<TabsContent value="detail">
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
					</TabsContent>
				</Tabs>
			</div>

			{/* 우측 컬럼 */}
			<div className="flex flex-col flex-1 gap-4">
				{/* 수익률 그래프 */}
				<ProfitRateCard profitRateSeries={strategyDetail.profitSeries} />
				{/* 최근 체결 내역 */}
				<RecentExecution executions={executions?.tradeExecutions || []} />
			</div>
		</div>
	);
};

export default StrategyDetailClient;
