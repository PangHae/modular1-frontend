import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { useDroppable } from '@dnd-kit/core';

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
	const { setNodeRef } = useDroppable({
		id: 'buy-drop-zone',
	});
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
			<div className="h-auto space-y-2" ref={setNodeRef}>
				{children}
				{!disabled &&
					(!children || (Array.isArray(children) && children.length < 2)) && (
						<div className="text-sm text-gray-500 p-4 text-center border-2 border-dashed border-gray-300 rounded">
							드래그하여 블록을 추가하세요
						</div>
					)}
			</div>
		</Block>
	);
};

export default Buy;
