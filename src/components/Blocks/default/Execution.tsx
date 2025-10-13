'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { BlockProps, Node } from '@/@types/StrategyTemplateNode';

import Block from '../Block';

type ValueType = 'constant' | 'average';
type ComparisonType = '<=' | '>=' | '>' | '<' | '==';

const Execution: FC<BlockProps> = ({ ref }) => {
	const rightExecutionRef = useRef<HTMLInputElement>(null);

	const [rightValueType, setRightValueType] = useState<ValueType>('constant');
	const [rightComparison, setRightComparison] = useState<ComparisonType>('<=');

	const handleChangeRightValueType = (value: string) => {
		setRightValueType(value as ValueType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		let right = {};
		if (rightValueType === 'constant') {
			right = {
				kind: 'CONSTANT',
				constant: { value: rightExecutionRef.current?.value, unit: 'percent' },
			};
		} else {
			right = {
				kind: 'INDICATOR',
				name: 'AVERAGE_TRADE_STRENGTH',
				args: {
					period: 30,
				},
				timeframe: '5m',
			};
		}

		return {
			type: 'COMPARE',
			label: 'execution_compare',
			operator: rightComparison,
			left: {
				kind: 'PRICE',
				field: 'TRADE_VOLUME',
				timeframe: '1d',
			},
			right,
		} as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.execution = createJson;
		} else {
			ref.current = {
				execution: createJson,
			};
		}
	}, [rightValueType, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-yeondu rounded-lg bg-yeondu-bg!">
			<Block.subtitle className="text-yeondu">체결 강도</Block.subtitle>
			<div className="flex items-center gap-1">
				체결 강도가
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '지정가', value: 'constant' },
								{ label: '평균 체결강도', value: 'average' },
							],
						},
					]}
					value={rightValueType}
					onChange={handleChangeRightValueType}
				/>
				{rightValueType === 'constant' && (
					<Block.input
						ref={rightExecutionRef}
						type="number"
						className="w-[100px]"
						placeholder="값 입력"
					/>
				)}
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
								{ label: '같음', value: '==' },
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

export default Execution;
