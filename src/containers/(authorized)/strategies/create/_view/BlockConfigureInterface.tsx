import { FC, ReactNode } from 'react';

import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { toast } from 'sonner';

import { ArrayTreeNode } from '@/@types/strategy';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';
import { cn } from '@/lib/utils';

interface Props {
	renderArrayTree: (treeState: (ArrayTreeNode | null)[]) => ReactNode | null;
}

const BlockConfigureInterface: FC<Props> = ({ renderArrayTree }) => {
	const { treeState, handleChangeTreeState, strategyType, setStrategyType } =
		useCreateStrategyContext();

	const handleChangeStrategyType = (type: 'BUY' | 'SELL') => {
		if (type === 'SELL') {
			handleChangeTreeState((prev) => [
				{ blockId: 'sell', index: 0 },
				...prev.slice(1),
			]);
		} else {
			handleChangeTreeState((prev) =>
				prev.map((item, index) => {
					if (index === 0) {
						return { blockId: 'buy', index: 0 };
					}
					if (
						item?.blockId === 'exitWithProfit' ||
						item?.blockId === 'exitWithLoss'
					) {
						toast.info(
							'익절/손절 조건은 매도에만 추가할 수 있어 제거 되었습니다.'
						);
						return null;
					}
					return item;
				})
			);
		}
		setStrategyType(type);
	};

	return (
		<div className="flex gap-4 flex-1 border-custom-gray-border/40 p-4 rounded-xl border shadow-sm bg-card flex-col h-full max-h-full overflow-hidden">
			<div className="flex items-center gap-4">
				<button
					type="button"
					onClick={() => handleChangeStrategyType('BUY')}
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
						onChange={() => handleChangeStrategyType('BUY')}
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
					onClick={() => handleChangeStrategyType('SELL')}
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
						onChange={() => handleChangeStrategyType('SELL')}
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
			<div className="flex-1 overflow-y-auto">{renderArrayTree(treeState)}</div>
		</div>
	);
};

export default BlockConfigureInterface;
