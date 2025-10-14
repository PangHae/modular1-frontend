import { FC, useEffect, useRef } from 'react';

import {
	BlockProps,
	ConstantOperand,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

const ExitWithLoss: FC<BlockProps> = ({ ref }) => {
	const rightLossRef = useRef<HTMLInputElement>(null);

	const createJson = () => {
		if (!rightLossRef.current) {
			return {} as Node;
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
					value: Number('-' + rightLossRef.current?.value),
					unit: 'percent',
				},
			} as unknown as ConstantOperand,
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.exitWithLoss = createJson;
		} else {
			ref.current = {
				exitWithLoss: createJson,
			};
		}
	}, []);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">손절 조건</Block.subtitle>
			<div className="flex items-center gap-1">
				손해가
				<Block.input type="number" className="w-[100px]" placeholder="값 입력">
					0 이상의 값을 입력해주세요.
				</Block.input>
				% 이상일 때 전략 종료
			</div>
		</Block>
	);
};

export default ExitWithLoss;
