'use client';

import { FC, useEffect, useRef, useState } from 'react';

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

const Price: FC<BlockProps> = ({ ref }) => {
	const rightPriceRef = useRef<HTMLInputElement>(null);

	const [leftValue, setLeftValue] = useState<PriceType>('high');
	const [leftTimeframe, setLeftTimeframe] = useState<TimeframeType>('tick');

	const [rightValueType, setRightValueType] = useState<ValueType>('constant');

	const [rightComparison, setRightComparison] = useState<ComparisonType>('<=');

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
			if (!rightPriceRef.current) {
				return {} as Node;
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
			label: 'price_compare',
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
		if (ref?.current) {
			ref.current.price = createJson;
		} else {
			ref.current = {
				price: createJson,
			};
		}
	}, [leftValue, leftTimeframe, rightValueType, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-yeondu rounded-lg bg-yeondu-bg!">
			<Block.subtitle className="text-yeondu">가격</Block.subtitle>
			<div className="flex items-center gap-1">
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
				/>
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
				/>
				{rightValueType === 'constant' && (
					<Block.input
						ref={rightPriceRef}
						type="number"
						className="w-[100px]"
						placeholder="값 입력"
					/>
				)}
				{rightValueType === 'reference' && (
					<Block.dropdown
						placeholder="비교"
						items={[
							{
								category: '',
								options: [
									{ label: '이상', value: '>=' },
									{ label: '이하', value: '<=' },
								],
							},
						]}
						value={rightComparison}
						onChange={handleChangeRightComparison}
					/>
				)}
				일 때
			</div>
		</Block>
	);
};

export default Price;
