import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { useDroppable } from '@dnd-kit/core';
import { toast } from 'sonner';

import { BlockProps, TradeNode } from '@/@types/StrategyTemplateNode';

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
	const { setNodeRef } = useDroppable({
		id: 'sell-drop-zone',
	});
	const countRef = useRef<HTMLInputElement>(null);

	const createJson = () => {
		if (!countRef.current?.value) {
			toast.error('매도 수량을 입력해주세요.');
			return null;
		}

		if (Number(countRef.current.value) <= 0) {
			toast.error('매도 수량은 1 이상의 값을 입력해주세요.');
			return null;
		}

		return {
			orderQuantity: Number(countRef.current?.value),
			node: childNode || {
				type: 'GROUP',
				logic: 'ALL',
				label: 'all',
				children: [],
			},
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
			<div className="h-auto space-y-2" ref={setNodeRef}>
				{children}
				{!disabled &&
					(!children || (Array.isArray(children) && children.length < 1)) && (
						<div className="text-sm text-gray-500 p-4 text-center border-2 border-dashed border-gray-300 rounded">
							드래그하여 블록을 추가하세요
						</div>
					)}
			</div>
		</Block>
	);
};

export default Sell;
