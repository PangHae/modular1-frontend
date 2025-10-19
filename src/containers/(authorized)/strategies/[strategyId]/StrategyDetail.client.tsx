'use client';

import { FC } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { MoreVertical, Play, Trash, Square } from 'lucide-react';
import { toast } from 'sonner';

import { Response } from '@/@types/service';
import { Card, CardContent } from '@/components/ui/card';
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
import StrategyAIDetail from './_view/StrategyAIDetail';

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
					<CardContent className="p-1">
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
											? 'text-red-500'
											: 'text-blue-500'
									)}
								>
									{`${strategyDetail.strategyProfit.weekProfit.toFixed(2)}%`}
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
					<TabsList className="bg-transparent p-0 h-auto gap-2">
						<TabsTrigger
							className="cursor-pointer data-[state=active]:bg-shinhan-blue! data-[state=active]:text-white! data-[state=active]:border-shinhan-blue data-[state=inactive]:bg-shinhan-blue/8 data-[state=inactive]:text-black data-[state=inactive]:border-shinhan-blue/20 border rounded-full px-4 py-2 h-[36px] text-button transition-all duration-200"
							value="preview"
						>
							미리보기
						</TabsTrigger>
						<TabsTrigger
							className="cursor-pointer data-[state=active]:bg-shinhan-blue! data-[state=active]:text-white! data-[state=active]:border-shinhan-blue data-[state=inactive]:bg-shinhan-blue/8 data-[state=inactive]:text-black data-[state=inactive]:border-shinhan-blue/20 border rounded-full px-4 py-2 h-[36px] text-button transition-all duration-200"
							value="summary"
						>
							전략 요약
						</TabsTrigger>
					</TabsList>
					<TabsContent value="preview">
						<PreviewStrategy
							sell={strategyDetail.strategyTemplate?.sell || null}
							buy={strategyDetail.strategyTemplate?.buy || null}
						/>
					</TabsContent>
					<TabsContent value="summary">
						<StrategyAIDetail
							summaryOverview={strategyDetail.strategySummary.summaryOverview}
							summaryCondition={strategyDetail.strategySummary.summaryCondition}
							summaryRisk={strategyDetail.strategySummary.summaryRisk}
						/>
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
