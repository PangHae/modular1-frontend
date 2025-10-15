'use client';

import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	ConstantOperand,
	Node,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface MACDCompareProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialRightValue?: ComparisonType;
}

const MACDCompare: FC<MACDCompareProps> = ({
	ref,
	initialTimeframe = '1d',
	initialRightValue = '>',
	disabled = false,
}) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);
	const [rightValue, setRightValue] =
		useState<ComparisonType>(initialRightValue);

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightValue = (value: string) => {
		setRightValue(value as ComparisonType);
	};

	const createJson = () => {
		return {
			type: 'COMPARE',
			label: 'macdCompare',
			operator: rightValue,
			left: {
				kind: 'INDICATOR',
				name: 'MACD',
				args: {
					fast: 12,
					slow: 26,
					signal: 9,
				},
				subfield: 'histogram',
				timeframe,
			},
			right: {
				kind: 'CONSTANT',
				constant: { value: 0 },
			} as unknown as ConstantOperand,
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.macdCompare = createJson;
			} else {
				ref.current = {
					macdCompare: createJson,
				};
			}
		}
	}, [timeframe]);
	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				MACD 추세 강도 변화 감지
			</Block.subtitle>
			<div className="flex items-center gap-1">
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '1분봉', value: '1m' },
								{ label: '5분봉', value: '5m' },
								{ label: '15분봉', value: '15m' },
								{ label: '1시간봉', value: '1h' },
								{ label: '4시간봉', value: '4h' },
								{ label: '1일봉', value: '1d' },
							],
						},
					]}
					value={timeframe}
					onChange={handleChangeTimeframe}
					disabled={disabled}
				/>
				기준 MACD 히스토그램 값이
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '양수', value: '>' },
								{ label: '음수', value: '<' },
							],
						},
					]}
					value={rightValue}
					onChange={handleChangeRightValue}
					disabled={disabled}
				/>
				일 때
			</div>
		</Block>
	);
};

export default MACDCompare;
