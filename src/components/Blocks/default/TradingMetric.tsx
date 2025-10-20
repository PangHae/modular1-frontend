'use client';

import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	Node,
} from '@/@types/StrategyTemplateNode';

import Block from '../Block';

type TradeMetricType = 'CUMULATIVE_VOLUME' | 'CUMULATIVE_AMOUNT';
type ValueType = 'reference' | 'average';

interface TradingMetricProps extends BlockProps {
	initialValueType?: TradeMetricType;
	initialComparison?: ComparisonType;
	initialVolumeValueType?: ValueType;
}

const TradingMetric: FC<TradingMetricProps> = ({
	ref,
	initialValueType = 'CUMULATIVE_VOLUME',
	initialComparison = '<=',
	initialVolumeValueType = 'reference',
	disabled = false,
}) => {
	const [leftValueType, setLeftValueType] =
		useState<TradeMetricType>(initialValueType);
	const [rightComparison, setRightComparison] =
		useState<ComparisonType>(initialComparison);
	const [rightVolumeValueType, setRightVolumeValueType] = useState<ValueType>(
		initialVolumeValueType
	);
	const [rightAmountValueType, setRightAmountValueType] = useState<ValueType>(
		initialVolumeValueType
	);

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
			if (rightVolumeValueType === 'reference') {
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
			if (rightAmountValueType === 'reference') {
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
			label: 'tradeMetricCompare',
			operator: rightComparison,
			left: {
				kind: 'PRICE',
				field: leftValueType,
				timeframe: 'tick',
				lookback: 1,
			},
			right,
		} as unknown as Node;

		return json;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.tradeMetricCompare = createJson;
			} else {
				ref.current = {
					tradeMetricCompare: createJson,
				};
			}
		}
	}, [
		leftValueType,
		rightVolumeValueType,
		rightAmountValueType,
		rightComparison,
	]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-yeondu rounded-lg bg-yeondu-bg!">
			<Block.subtitle className="text-yeondu">
				누적 거래량/누적 거래 대금
			</Block.subtitle>
			<div className="flex items-center gap-1 flex-wrap">
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
					disabled={disabled}
				/>
				이
				{leftValueType === 'CUMULATIVE_VOLUME' && (
					<Block.dropdown
						placeholder="값"
						items={[
							{
								category: '',
								options: [
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
						disabled={disabled}
					/>
				)}
				{leftValueType === 'CUMULATIVE_AMOUNT' && (
					<Block.dropdown
						placeholder="값"
						items={[
							{
								category: '',
								options: [
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
						disabled={disabled}
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

export default TradingMetric;
