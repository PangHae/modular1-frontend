'use client';

import { FC, useEffect, useRef, useState } from 'react';

import {
	BlockProps,
	ConstantOperand,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

type TradeMetricType = 'CUMULATIVE_VOLUME' | 'CUMULATIVE_AMOUNT';
type ComparisonType = '<=' | '>=' | '>' | '==';
type ValueType = 'constant' | 'reference' | 'average';

const TradingMetric: FC<BlockProps> = ({ ref }) => {
	const rightVolumeValueRef = useRef<HTMLInputElement>(null);
	const rightAmountValueRef = useRef<HTMLInputElement>(null);

	const [leftValueType, setLeftValueType] =
		useState<TradeMetricType>('CUMULATIVE_VOLUME');
	const [rightComparison, setRightComparison] = useState<ComparisonType>('<=');
	const [rightVolumeValueType, setRightVolumeValueType] =
		useState<ValueType>('constant');
	const [rightAmountValueType, setRightAmountValueType] =
		useState<ValueType>('constant');

	const handleChangeLeftValue = (value: string) => {
		setLeftValueType(value as TradeMetricType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const handleChangeRightVolumeValueType = (value: string) => {
		setRightVolumeValueType(value as ValueType);
	};

	const handleChangeRightAmountValueType = (value: string) => {
		setRightAmountValueType(value as ValueType);
	};

	const createJson = () => {
		let right = {};
		if (leftValueType === 'CUMULATIVE_VOLUME') {
			if (rightAmountValueType === 'constant') {
				if (!rightAmountValueRef.current) {
					return {} as Node;
				}
				right = {
					kind: 'CONSTANT',
					constant: { value: rightAmountValueRef.current?.value },
				} as unknown as ConstantOperand;
			} else if (rightAmountValueType === 'reference') {
				right = {
					kind: 'INDICATOR',
					name: 'CUMULATIVE_VOLUME',
					field: 'close',
					timeframe: '1d',
					lookback: 1,
				};
			} else {
				right = {
					kind: 'INDICATOR',
					name: 'SMA',
					args: {
						period: 20,
					},
					timeframe: '1d',
				};
			}
		} else {
			if (rightVolumeValueType === 'constant') {
				if (!rightVolumeValueRef.current) {
					return {} as Node;
				}
				right = {
					kind: 'CONSTANT',
					constant: { value: rightVolumeValueRef.current?.value },
				} as unknown as ConstantOperand;
			} else if (rightVolumeValueType === 'reference') {
				right = {
					kind: 'INDICATOR',
					name: 'CUMULATIVE_TRADE_VALUE',
					field: 'close',
					timeframe: '1d',
				};
			} else {
				right = {
					kind: 'INDICATOR',
					name: 'SMA',
					args: {
						period: 20,
					},
					timeframe: '1d',
				};
			}
		}
		const json = {
			type: 'COMPARE',
			label: 'trading_metric_compare',
			operator: rightComparison,
			left: {
				kind: 'PRICE',
				name: leftValueType,
				timeframe: 'tick',
				lookback: 1,
			},
			right,
		} as unknown as Node;

		return json;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.tradingMetric = createJson;
		} else {
			ref.current = {
				tradingMetric: createJson,
			};
		}
	}, [
		leftValueType,
		rightVolumeValueType,
		rightAmountValueType,
		rightComparison,
	]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-yeondu rounded-lg bg-yeondu-bg!">
			<Block.subtitle className="text-yeondu">거래</Block.subtitle>
			<div className="flex items-center gap-1">
				<Block.dropdown
					placeholder="거래 지표"
					items={[
						{
							category: '',
							options: [
								{ label: '누적 거래량', value: 'CUMULATIVE_VOLUME' },
								{ label: '누적 거래 대금', value: 'CUMULATIVE_AMOUNT' },
							],
						},
					]}
					value={leftValueType}
					onChange={handleChangeLeftValue}
				/>
				이
				{leftValueType === 'CUMULATIVE_VOLUME' && (
					<>
						<Block.dropdown
							placeholder="값"
							items={[
								{
									category: '',
									options: [
										{
											label: '지정가',
											value: 'constant',
										},
										{
											label: '전일 종가',
											value: 'reference',
										},
										{
											label: '평균',
											value: 'average',
										},
									],
								},
							]}
							value={rightVolumeValueType}
							onChange={handleChangeRightVolumeValueType}
						/>
						{rightVolumeValueType === 'constant' && (
							<Block.input
								ref={rightVolumeValueRef}
								type="number"
								className="w-[100px]"
								placeholder="값 입력"
							/>
						)}
					</>
				)}
				{leftValueType === 'CUMULATIVE_AMOUNT' && (
					<>
						<Block.dropdown
							placeholder="값"
							items={[
								{
									category: '',
									options: [
										{
											label: '지정가',
											value: 'constant',
										},
										{
											label: '전일 종가',
											value: 'reference',
										},
										{
											label: '평균',
											value: 'average',
										},
									],
								},
							]}
							value={rightAmountValueType}
							onChange={handleChangeRightAmountValueType}
						/>
						{rightAmountValueType === 'constant' && (
							<Block.input
								ref={rightAmountValueRef}
								type="number"
								className="w-[100px]"
								placeholder="값 입력"
							/>
						)}
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

export default TradingMetric;
