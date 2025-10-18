import { useState, useEffect } from 'react';

import { useAllStrategies } from '@/hooks/api/strategy/useAllStrategies';
import { useStrategyDetail } from '@/hooks/api/strategy/useStrategyDetail';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

const MyStrategyItems = () => {
	const { data: strategiesData, isLoading: isStrategiesLoading } =
		useAllStrategies();
	const [selectedStrategyId, setSelectedStrategyId] = useState<number>(-1);
	const { data: strategyDetail, isSuccess } =
		useStrategyDetail(selectedStrategyId);

	const { handleSelectTemplate } = useCreateStrategyContext();

	const handleSelectStrategy = (strategyId: number) => {
		setSelectedStrategyId(strategyId);
	};

	useEffect(() => {
		if (selectedStrategyId !== -1 && isSuccess && strategyDetail) {
			const templateData = {
				id: strategyDetail.strategyInfo.id.toString(),
				strategyName: strategyDetail.strategyInfo.strategyName,
				version: 1,
				meta: strategyDetail.strategyTemplate.meta,
				strategyId: strategyDetail.strategyInfo.id,
				sell: strategyDetail.strategyTemplate.sell,
				buy: strategyDetail.strategyTemplate.buy,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			handleSelectTemplate(templateData);
		}
	}, [selectedStrategyId, isSuccess, strategyDetail]);

	return (
		<>
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
							onClick={() => handleSelectStrategy(strategy.id)}
						>
							<div className="font-medium">{strategy.strategyName}</div>
							<div className="text-sm text-gray-600 mt-1">
								{strategy.stockInfo.stockName}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex items-center justify-center py-8">
					<div className="text-sm text-gray-500">등록된 전략이 없습니다.</div>
				</div>
			)}
		</>
	);
};

export default MyStrategyItems;
