import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { BlockProps, Node, TradeNode } from '@/@types/StrategyTemplateNode';

import Block from '../Block';

interface BuyProps extends BlockProps {
	initialValue?: string;
	childNode?: Node;
}

const Buy: FC<PropsWithChildren<BuyProps>> = ({
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
			(ref.current as any).buy = createJson;
		} else if (ref) {
			ref.current = {
				buy: createJson,
			} as any;
		}
	}, [childNode]);

	return (
		<Block className="flex-1 gap-2 p-4 border-2 border-red-500 rounded-lg bg-red-500/10">
			<div className="flex items-center gap-2">
				<Block.title className="text-red-500!">매수</Block.title>
				<Block.input
					ref={countRef}
					className="w-[200px] bg-white! focus-visible:border-red-500"
					placeholder="몇 주를 매수할까요?"
					defaultValue={initialValue}
					disabled={disabled}
					showTooltip={false}
				/>
			</div>
			{children}
		</Block>
	);
};

export default Buy;
