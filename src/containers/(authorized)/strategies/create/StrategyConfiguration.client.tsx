'use client';

import { FC, useState } from 'react';

import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	Cuboid,
	Shapes,
} from 'lucide-react';

import { Buy, Sell } from '@/components/Blocks/trade';
import SidePalette from '@/components/common/SidePalette/SidePalette';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useAllStrategies } from '@/hooks/api/strategy/useAllStrategies';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';
import { cn } from '@/lib/utils';

interface Props {
	strategyType: 'BUY' | 'SELL';
	onStrategyTypeChange: (type: 'BUY' | 'SELL') => void;
}

type TabType = 'strategy' | 'block';

const StrategyConfigurationClient: FC<Props> = ({
	strategyType,
	onStrategyTypeChange,
}) => {
	const { ref } = useCreateStrategyContext();
	const [activeTab, setActiveTab] = useState<TabType>('strategy');
	const { data: strategiesData, isLoading: isStrategiesLoading } =
		useAllStrategies();

	return (
		<div className="flex gap-4 p-6 h-full max-h-full overflow-hidden">
			<SidePalette>
				<SidePalette.menuList
					menus={[
						{
							title: '전략',
							item: (
								<button
									onClick={() => setActiveTab('strategy')}
									className="w-full"
								>
									<SidePalette.menuItem
										icon={<Cuboid strokeWidth={1} />}
										title="전략"
										isActive={activeTab === 'strategy'}
									/>
								</button>
							),
						},
						{
							title: '블록',
							item: (
								<button
									onClick={() => setActiveTab('block')}
									className="w-full"
								>
									<SidePalette.menuItem
										icon={<Shapes strokeWidth={1} />}
										title="블록"
										isActive={activeTab === 'block'}
									/>
								</button>
							),
						},
					]}
				/>
				<div className="flex-1 p-4 overflow-y-auto max-h-full">
					{activeTab === 'strategy' && (
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">내 전략</h3>
							{isStrategiesLoading ? (
								<div className="flex items-center justify-center py-8">
									<div className="text-sm text-gray-500">
										전략 목록을 불러오는 중...
									</div>
								</div>
							) : strategiesData?.data?.items?.length ? (
								<div className="space-y-2">
									{strategiesData.data.items.map((strategy) => (
										<div
											key={strategy.id}
											className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
										>
											<div className="font-medium">{strategy.strategyName}</div>
											<div className="text-sm text-gray-600 mt-1">
												{strategy.stockInfo.stockName} • 수익률:{' '}
												{strategy.profitRate.toFixed(2)}%
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="flex items-center justify-center py-8">
									<div className="text-sm text-gray-500">
										등록된 전략이 없습니다.
									</div>
								</div>
							)}
						</div>
					)}

					{activeTab === 'block' && (
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">블록</h3>
							<Accordion type="multiple" className="w-full">
								<AccordionItem value="indicators">
									<AccordionTrigger>기본 지표</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">가격</div>
												<div className="text-xs text-gray-600">Price</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">실행</div>
												<div className="text-xs text-gray-600">Execution</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">변화율</div>
												<div className="text-xs text-gray-600">Change Rate</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">거래 지표</div>
												<div className="text-xs text-gray-600">
													Trading Metric
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="momentum">
									<AccordionTrigger>모멘텀</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">EMA 비교</div>
												<div className="text-xs text-gray-600">EMA Compare</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">EMA 교차</div>
												<div className="text-xs text-gray-600">EMA Cross</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">MACD 비교</div>
												<div className="text-xs text-gray-600">
													MACD Compare
												</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">MACD 교차</div>
												<div className="text-xs text-gray-600">MACD Cross</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">RSI 비교</div>
												<div className="text-xs text-gray-600">RSI Compare</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">RSI 교차</div>
												<div className="text-xs text-gray-600">RSI Cross</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="volume">
									<AccordionTrigger>거래량</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">RVOL</div>
												<div className="text-xs text-gray-600">
													Relative Volume
												</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">VWAP</div>
												<div className="text-xs text-gray-600">
													Volume Weighted Average Price
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="risk">
									<AccordionTrigger>밴드</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">
													밴드 절대 비교
												</div>
												<div className="text-xs text-gray-600">
													Band Absolute Compare
												</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">밴드 교차</div>
												<div className="text-xs text-gray-600">Band Cross</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">
													밴드 상대 비교
												</div>
												<div className="text-xs text-gray-600">
													Band Relative Compare
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="level">
									<AccordionTrigger>레벨</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">오픈 레인지</div>
												<div className="text-xs text-gray-600">
													Opening Range
												</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">
													전일 고저 비교
												</div>
												<div className="text-xs text-gray-600">
													Previous High Low Compare
												</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">
													연간 고저 비교
												</div>
												<div className="text-xs text-gray-600">
													Year High Low Compare
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="logical">
									<AccordionTrigger>논리</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">모든 조건</div>
												<div className="text-xs text-gray-600">All</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">하나의 조건</div>
												<div className="text-xs text-gray-600">Any</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="trade">
									<AccordionTrigger>거래</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">매수</div>
												<div className="text-xs text-gray-600">Buy</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">매도</div>
												<div className="text-xs text-gray-600">Sell</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="exit">
									<AccordionTrigger>종료</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-2">
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">손실 종료</div>
												<div className="text-xs text-gray-600">
													Exit With Loss
												</div>
											</div>
											<div className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
												<div className="text-sm font-medium">수익 종료</div>
												<div className="text-xs text-gray-600">
													Exit With Profit
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					)}
				</div>
			</SidePalette>
			<div className="flex gap-4 flex-1 border-custom-gray-border/40 p-4 rounded-xl border shadow-sm bg-card flex-col h-full max-h-full overflow-hidden">
				<div className="flex items-center gap-4">
					<button
						type="button"
						onClick={() => onStrategyTypeChange('BUY')}
						className={cn(
							'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer',
							strategyType === 'BUY'
								? 'border-red-500 bg-red-50 shadow-lg shadow-red-200'
								: 'border-gray-300 bg-white hover:border-red-300 hover:bg-red-25'
						)}
					>
						<input
							type="radio"
							name="strategyType"
							value="buy"
							checked={strategyType === 'BUY'}
							onChange={() => onStrategyTypeChange('BUY')}
							className="sr-only"
						/>
						<div className="flex items-center gap-2">
							<BanknoteArrowDown
								className={cn(
									'w-5 h-5 transition-colors duration-200',
									strategyType === 'BUY' ? 'text-red-600' : 'text-gray-500'
								)}
							/>
							<span
								className={cn(
									'text-sm font-medium transition-colors duration-200',
									strategyType === 'BUY' ? 'text-red-700' : 'text-gray-600'
								)}
							>
								매수 전략
							</span>
						</div>
					</button>
					<button
						type="button"
						onClick={() => onStrategyTypeChange('SELL')}
						className={cn(
							'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer',
							strategyType === 'SELL'
								? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200'
								: 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-25'
						)}
					>
						<input
							type="radio"
							name="strategyType"
							value="sell"
							checked={strategyType === 'SELL'}
							onChange={() => onStrategyTypeChange('SELL')}
							className="sr-only"
						/>
						<div className="flex items-center gap-2">
							<BanknoteArrowUp
								className={cn(
									'w-5 h-5 transition-colors duration-200',
									strategyType === 'SELL' ? 'text-blue-600' : 'text-gray-500'
								)}
							/>
							<span
								className={cn(
									'text-sm font-medium transition-colors duration-200',
									strategyType === 'SELL' ? 'text-blue-700' : 'text-gray-600'
								)}
							>
								매도 전략
							</span>
						</div>
					</button>
				</div>
				<div className="flex-1 overflow-y-auto">
					{strategyType === 'BUY' && <Buy ref={ref} />}
					{strategyType === 'SELL' && <Sell ref={ref} />}
				</div>
			</div>
		</div>
	);
};

export default StrategyConfigurationClient;
