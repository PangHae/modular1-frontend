'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import {
	BlockProps,
	ComparisonType,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

type ValueType = 'constant' | 'average';

interface ExecutionProps extends BlockProps {
	initialValueType?: ValueType;
	initialComparison?: ComparisonType;
	initialValue?: string;
}

const Execution: FC<ExecutionProps> = ({
	ref,
	initialValueType = 'constant',
	initialValue = '',
	initialComparison = '<=',
	disabled = false,
}) => {
	const rightExecutionRef = useRef<HTMLInputElement>(null);

	const [rightValueType, setRightValueType] =
		useState<ValueType>(initialValueType);
	const [rightComparison, setRightComparison] =
		useState<ComparisonType>(initialComparison);

	const handleChangeRightValueType = (value: string) => {
		setRightValueType(value as ValueType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		let right = {};
		if (rightValueType === 'constant') {
			if (!rightExecutionRef.current?.value) {
				toast.error('체결 강도를 입력해주세요.');
				return null;
			}

			if (Number(rightExecutionRef.current.value) < 0) {
				toast.error('체결 강도는 0 이상의 값을 입력해주세요.');
				return null;
			}

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
			label: 'executionCompare',
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
		if (ref) {
			if (ref.current) {
				ref.current.executionCompare = createJson;
			} else {
				ref.current = {
					executionCompare: createJson,
				};
			}
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
								{ label: '지정 비율', value: 'constant' },
								{ label: '평균 체결 강도', value: 'average' },
							],
						},
					]}
					value={rightValueType}
					onChange={handleChangeRightValueType}
					disabled={disabled}
				/>
				{rightValueType === 'constant' && (
					<>
						<Block.input
							ref={rightExecutionRef}
							type="number"
							className="w-[100px]"
							placeholder="값 입력"
							defaultValue={initialValue}
							disabled={disabled}
						>
							0 이상의 값을 입력해주세요.
						</Block.input>
						%
					</>
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

export default Execution;
