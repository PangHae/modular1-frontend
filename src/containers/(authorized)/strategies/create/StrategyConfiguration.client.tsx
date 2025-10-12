'use client';

import { FC } from 'react';

import { Cuboid, Shapes } from 'lucide-react';

import Price from '@/components/Blocks/default/Price';
import TradingMetric from '@/components/Blocks/default/TradingMetric';
import All from '@/components/Blocks/logical/All';
import Any from '@/components/Blocks/logical/Any';
import Sell from '@/components/Blocks/trade/Sell';
import SidePalette from '@/components/common/SidePalette/SidePalette';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

interface Props {
	strategyType: 'BUY' | 'SELL';
}

const StrategyConfigurationClient: FC<Props> = ({ strategyType }) => {
	console.log(strategyType);
	const { ref } = useCreateStrategyContext();

	return (
		<div className="flex flex-1 gap-4 h-full">
			<SidePalette>
				<SidePalette.menuList
					menus={[
						{
							title: '전략',
							item: (
								<SidePalette.menuItem
									icon={<Cuboid strokeWidth={1} />}
									title="전략"
								/>
							),
						},
						{
							title: '블록',
							item: (
								<SidePalette.menuItem
									icon={<Shapes strokeWidth={1} />}
									title="블록"
								/>
							),
						},
					]}
				/>
				wow
			</SidePalette>
			<div className="flex gap-4 flex-1 bg-white rounded-[8px] border border-custom-gray-border/40 p-4">
				<Sell>
					<All>
						<Price ref={ref} />
						<TradingMetric ref={ref} />
					</All>
					<Any></Any>
				</Sell>

				{/* <Buy></Buy> */}
			</div>
		</div>
	);
};

export default StrategyConfigurationClient;
