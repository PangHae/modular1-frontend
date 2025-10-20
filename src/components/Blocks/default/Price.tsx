'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import {
	BlockProps,
	ComparisonType,
	ConstantOperand,
	Node,
	PriceType,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

type ValueType = 'constant' | 'reference';

interface PriceProps extends BlockProps {
	initialValueType?: ValueType;
	initialComparison?: ComparisonType;
	initialTimeframe?: TimeframeType;
	initialPriceType?: PriceType;
	initialPriceValue?: string;
}

const Price: FC<PriceProps> = ({
	ref,
	initialValueType = 'constant',
	initialComparison = '<=',
	initialTimeframe = 'tick',
	initialPriceType = 'high',
	disabled = false,
	initialPriceValue = '',
}) => {
	const rightPriceRef = useRef<HTMLInputElement>(null);

	const [leftValue, setLeftValue] = useState<PriceType>(initialPriceType);
	const [leftTimeframe, setLeftTimeframe] =
		useState<TimeframeType>(initialTimeframe);

	const [rightValueType, setRightValueType] =
		useState<ValueType>(initialValueType);

	const [rightComparison, setRightComparison] =
		useState<ComparisonType>(initialComparison);

	const handleChangeRightValueType = (value: string) => {
		setRightValueType(value as ValueType);
	};

	const handleChangeLeftValue = (value: string) => {
		setLeftValue(value as PriceType);
	};

	const handleChangeLeftTimeframe = (value: string) => {
		setLeftTimeframe(value as TimeframeType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		let right = {};
		if (rightValueType === 'constant') {
			if (!rightPriceRef.current?.value) {
				toast.error('가격을 입력해주세요.');
				return null;
			}

			if (Number(rightPriceRef.current.value) < 0) {
				toast.error('가격은 0 이상의 값을 입력해주세요.');
				return null;
			}

			right = {
				kind: 'CONSTANT',
				constant: { value: rightPriceRef.current?.value },
			} as unknown as ConstantOperand;
		} else {
			right = {
				kind: 'PRICE',
				field: 'close',
				timeframe: '1d',
			};
		}
		return {
			type: 'COMPARE',
			label: 'priceCompare',
			operator: rightComparison,
			left: {
				kind: 'PRICE',
				field: leftValue,
				timeframe: leftTimeframe,
			},
			right,
		} as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.priceCompare = createJson;
			} else {
				ref.current = {
					priceCompare: createJson,
				};
			}
		}
	}, [leftValue, leftTimeframe, rightValueType, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-yeondu rounded-lg bg-yeondu-bg!">
			<Block.subtitle className="text-yeondu">가격</Block.subtitle>
			<div className="flex items-center gap-1 flex-wrap">
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '틱', value: 'tick' },
								{ label: '1분', value: '1m' },
								{ label: '5분', value: '5m' },
								{ label: '15분', value: '15m' },
								{ label: '30분', value: '30m' },
								{ label: '1시간', value: '1h' },
								{ label: '4시간', value: '4h' },
								{ label: '1일', value: '1d' },
							],
						},
					]}
					value={leftTimeframe}
					onChange={handleChangeLeftTimeframe}
					disabled={disabled}
				/>
				기준
				<Block.dropdown
					placeholder="값"
					items={[
						{
							category: '',
							options: [
								{ label: '고가', value: 'high' },
								{ label: '저가', value: 'low' },
								{ label: '종가', value: 'close' },
							],
						},
					]}
					value={leftValue}
					onChange={handleChangeLeftValue}
					disabled={disabled}
				/>
				이(가)
				<Block.dropdown
					placeholder="수치"
					items={[
						{
							category: '',
							options: [
								{ label: '지정가', value: 'constant' },
								{ label: '전일 종가', value: 'reference' },
							],
						},
					]}
					value={rightValueType}
					onChange={handleChangeRightValueType}
					disabled={disabled}
				/>
				{rightValueType === 'constant' && (
					<Block.input
						ref={rightPriceRef}
						type="number"
						className="w-[100px]"
						placeholder="가격 입력"
						disabled={disabled}
						defaultValue={initialPriceValue}
					>
						원하는 가격을 입력해주세요.
					</Block.input>
				)}
				원
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

export default Price;
