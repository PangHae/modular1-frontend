'use client';

import { FC, useEffect, useRef, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	Node,
	RSIPeriodType,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface RSICompareProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialRightValue?: RSIPeriodType;
	initialRightComparison?: ComparisonType;
	initialRSICompareValue?: string;
}

const RSICompare: FC<RSICompareProps> = ({
	ref,
	initialTimeframe = '1d',
	initialRightValue = '14',
	initialRightComparison = '>=',
	initialRSICompareValue = '',
	disabled = false,
}) => {
	const rsiCompareValueRef = useRef<HTMLInputElement>(null);

	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);
	const [rightValue, setRightValue] =
		useState<RSIPeriodType>(initialRightValue);
	const [rightComparison, setRightComparison] = useState<ComparisonType>(
		initialRightComparison
	);

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightValue = (value: string) => {
		setRightValue(value as RSIPeriodType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		return {
			type: 'COMPARE',
			label: 'rsiCompare',
			operator: rightComparison,
			left: {
				kind: 'INDICATOR',
				name: 'RSI',
				args: {
					period: Number(rightValue),
				},
				timeframe,
			},
			right: {
				kind: 'CONSTANT',
				constant: { value: rsiCompareValueRef.current?.value },
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.rsiCompare = createJson;
			} else {
				ref.current = {
					rsiCompare: createJson,
				};
			}
		}
	}, [timeframe, rightValue, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				RSI 과매수/과매도 감지
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
				기준 RSI
				<Block.dropdown
					placeholder="일자"
					items={[
						{
							category: '',
							options: [
								{ label: '7', value: '7' },
								{ label: '14', value: '14' },
								{ label: '21', value: '21' },
							],
						},
					]}
					value={rightValue}
					onChange={handleChangeRightValue}
					disabled={disabled}
				/>
				가
				<Block.input
					ref={rsiCompareValueRef}
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
					defaultValue={initialRSICompareValue}
					disabled={disabled}
				>
					0부터 100 사이의 값을 입력해주세요.
				</Block.input>
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

export default RSICompare;
