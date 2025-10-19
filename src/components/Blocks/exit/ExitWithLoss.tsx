import { FC, useEffect, useRef } from 'react';

import { toast } from 'sonner';

import {
	BlockProps,
	ConstantOperand,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

interface ExitWithLossProps extends BlockProps {
	initialValue?: string;
}

const ExitWithLoss: FC<ExitWithLossProps> = ({
	ref,
	initialValue = '',
	disabled = false,
}) => {
	const rightLossRef = useRef<HTMLInputElement>(null);

	const createJson = () => {
		if (!rightLossRef.current?.value) {
			toast.error('손절 비율을 입력해주세요.');
			return null;
		}

		if (Number(rightLossRef.current.value) >= 0) {
			toast.error('손절 비율은 음수를 입력해주세요.');
			return null;
		}

		return {
			type: 'COMPARE',
			label: 'exitWithProfit',
			operator: '<=',
			left: {
				kind: 'PROFIT_AND_LOSS',
				profit_and_loss_field: 'percent',
			},
			right: {
				kind: 'CONSTANT',
				constant: {
					value: Number(rightLossRef.current?.value),
					unit: 'percent',
				},
			} as unknown as ConstantOperand,
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.exitWithLoss = createJson;
			} else {
				ref.current = {
					exitWithLoss: createJson,
				};
			}
		}
	}, []);

	return (
		<Block className="flex gap-2 p-4 border-2 border-teal-600 rounded-lg bg-teal-50">
			<Block.subtitle className="text-teal-600">손절 조건</Block.subtitle>
			<div className="flex items-center gap-1">
				수익률이
				<Block.input
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
					defaultValue={initialValue}
					disabled={disabled}
				>
					음수를 입력해주세요.
				</Block.input>
				% 이하일 때 전략 종료
			</div>
		</Block>
	);
};

export default ExitWithLoss;
