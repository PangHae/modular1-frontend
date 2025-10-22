'use client';

import React, { FC } from 'react';

import { StrategyTemplate } from '@/@types/strategy';
import { TradeNode } from '@/@types/StrategyTemplateNode';
import { Card, CardContent } from '@/components/ui/card';
import { useStrategyRenderer } from '@/hooks/useStrategyRenderer';

interface Props {
	sell: StrategyTemplate['sell'] | null;
	buy: StrategyTemplate['buy'] | null;
}

const PreviewStrategy: FC<Props> = ({ sell, buy }) => {
	// StrategyTemplate의 buy/sell 객체를 TradeNode로 변환
	const tradeNode: TradeNode | null = sell
		? { orderQuantity: sell.orderQuantity, node: sell.node }
		: buy
			? { orderQuantity: buy.orderQuantity, node: buy.node }
			: null;

	const renderStrategy = useStrategyRenderer({
		ref: null,
		node: tradeNode,
		strategyType: sell ? 'sell' : 'buy',
		disabled: true,
	});

	if (!sell && !buy) {
		return (
			<Card>
				<CardContent className="p-6 text-gray-400">
					전략이 존재하지 않습니다.
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="h-fit">
			<CardContent className="overflow-hidden">{renderStrategy}</CardContent>
		</Card>
	);
};

export default PreviewStrategy;
