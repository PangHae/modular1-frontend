import { FC, useEffect, useRef, useState } from 'react';

import {
	BlockProps,
	ConstantOperand,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

type ComparisonType = '<=' | '>=' | '>' | '<';

const ChangeRate: FC<BlockProps> = ({ ref }) => {
	const rightChangeRateRef = useRef<HTMLInputElement>(null);

	const [rightComparison, setRightComparison] = useState<ComparisonType>('<=');

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		if (!rightChangeRateRef.current) {
			return {} as Node;
		}

		return {
			type: 'COMPARE',
			label: 'change_rate_compare',
			operator: rightComparison,
			left: {
				kind: 'PRICE',
				field: 'change_rate',
				timeframe: '1d',
			},
			right: {
				kind: 'CONSTANT',
				constant: { value: rightChangeRateRef.current?.value, unit: 'percent' },
			} as unknown as ConstantOperand,
		} as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.changeRate = createJson;
		} else {
			ref.current = {
				changeRate: createJson,
			};
		}
	}, [rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-yeondu rounded-lg bg-yeondu-bg!">
			<Block.subtitle className="text-yeondu!">변화율</Block.subtitle>
			<div className="flex items-center gap-1">
				현재가가 전일 대비
				<Block.input
					ref={rightChangeRateRef}
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
				>
					-100부터 100 사이의 값을 입력해주세요.
				</Block.input>
				%{' '}
				<Block.dropdown
					placeholder="비교"
					items={[
						{
							category: '',
							options: [
								{ label: '이상', value: '>=' },
								{ label: '이하', value: '<=' },
								{ label: '초과', value: '>' },
								{ label: '미만', value: '<' },
							],
						},
					]}
					value={rightComparison}
					onChange={handleChangeRightComparison}
				/>
				일 때
			</div>
		</Block>
	);
};

export default ChangeRate;
