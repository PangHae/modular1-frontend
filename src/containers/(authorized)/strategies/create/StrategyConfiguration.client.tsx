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
import { useAllStrategies } from '@/hooks/api/strategy/useAllStrategies';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';
import { cn } from '@/lib/utils';

import BlockAccordion from './_view/BlockAccordion';

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
							<BlockAccordion />
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
