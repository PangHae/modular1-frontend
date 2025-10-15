import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { BlockProps, Node, TradeNode } from '@/@types/StrategyTemplateNode';

import Block from '../Block';

interface SellProps extends BlockProps {
	initialValue?: string;
	childNode?: Node;
	disabled?: boolean;
}

const Sell: FC<PropsWithChildren<SellProps>> = ({
	ref,
	initialValue = '',
	children,
	childNode,
	disabled = false,
}) => {
	const countRef = useRef<HTMLInputElement>(null);

	const createJson = () => {
		return {
			orderQuantity: Number(countRef.current?.value),
			node: childNode,
		} as TradeNode;
	};

	useEffect(() => {
		if (ref?.current) {
			(ref.current as any).sell = createJson;
		} else if (ref) {
			ref.current = {
				sell: createJson,
			} as any;
		}
	}, [childNode]);

	return (
		<Block className="flex-1 gap-2 p-4 border-2 border-shinhan-blue rounded-lg bg-shinhan-blue/10">
			<div className="flex items-center gap-2">
				<Block.title className="text-shinhan-blue!">매도</Block.title>
				<Block.input
					ref={countRef}
					className="w-[200px] bg-white! focus-visible:border-shinhan-blue"
					placeholder="몇 주를 매도할까요?"
					defaultValue={initialValue}
					disabled={disabled}
					showTooltip={false}
				/>
			</div>
			{children}
		</Block>
	);
};

export default Sell;
