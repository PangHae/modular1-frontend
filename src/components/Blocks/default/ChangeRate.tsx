import { FC, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import {
	BlockProps,
	ComparisonType,
	ConstantOperand,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

interface ChangeRateProps extends BlockProps {
	initialValue?: number;
	initialComparison?: ComparisonType;
}

const ChangeRate: FC<ChangeRateProps> = ({
	ref,
	initialValue = '',
	initialComparison = '<=',
	disabled = false,
}) => {
	const rightChangeRateRef = useRef<HTMLInputElement>(null);

	const [rightComparison, setRightComparison] =
		useState<ComparisonType>(initialComparison);

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		if (!rightChangeRateRef.current?.value) {
			toast.error('변화율을 입력해주세요.');
			return null;
		}

		if (
			Number(rightChangeRateRef.current.value) > 100 ||
			Number(rightChangeRateRef.current.value) < -100
		) {
			toast.error('변화율은 -100부터 100 사이의 값을 입력해주세요.');
			return null;
		}

		return {
			type: 'COMPARE',
			label: 'changeRateCompare',
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
		if (ref) {
			if (ref.current) {
				ref.current.changeRateCompare = createJson;
			} else {
				ref.current = {
					changeRateCompare: createJson,
				};
			}
		}
	}, [rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-yeondu rounded-lg bg-yeondu-bg!">
			<Block.subtitle className="text-yeondu!">변화율</Block.subtitle>
			<div className="flex items-center gap-1 flex-wrap">
				현재가가 전일 대비
				<Block.input
					ref={rightChangeRateRef}
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
					defaultValue={initialValue}
					disabled={disabled}
				>
					-100부터 100 사이의 값을 입력해주세요.
				</Block.input>
				%
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
					disabled={disabled}
				/>
				일 때
			</div>
		</Block>
	);
};

export default ChangeRate;
