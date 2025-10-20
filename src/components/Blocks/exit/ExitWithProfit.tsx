import { FC, useEffect, useRef } from 'react';

import { toast } from 'sonner';

import {
	BlockProps,
	ConstantOperand,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

interface ExitWithProfitProps extends BlockProps {
	initialValue?: string;
}

const ExitWithProfit: FC<ExitWithProfitProps> = ({
	ref,
	initialValue = '',
	disabled = false,
}) => {
	const rightProfitRef = useRef<HTMLInputElement>(null);

	const createJson = () => {
		if (!rightProfitRef.current?.value) {
			toast.error('익절 비율을 입력해주세요.');
			return null;
		}

		if (Number(rightProfitRef.current.value) <= 0) {
			toast.error('익절 비율은 양수를 입력해주세요.');
			return null;
		}

		return {
			type: 'COMPARE',
			label: 'exitWithProfit',
			operator: '>=',
			left: {
				kind: 'PROFIT_AND_LOSS',
				profit_and_loss_field: 'percent',
			},
			right: {
				kind: 'CONSTANT',
				constant: {
					value: Number(rightProfitRef.current?.value),
					unit: 'percent',
				},
			} as unknown as ConstantOperand,
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.exitWithProfit = createJson;
			} else {
				ref.current = {
					exitWithProfit: createJson,
				};
			}
		}
	}, []);

	return (
		<Block className="flex gap-2 p-4 border-2 border-teal-600 rounded-lg bg-teal-50">
			<Block.subtitle className="text-teal-600">익절 조건</Block.subtitle>
			<div className="flex items-center gap-1 flex-wrap">
				수익률이
				<Block.input
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
					defaultValue={initialValue}
					disabled={disabled}
				>
					양수를 입력해주세요.
				</Block.input>
				% 이상일 때 전략 종료
			</div>
		</Block>
	);
};

export default ExitWithProfit;
