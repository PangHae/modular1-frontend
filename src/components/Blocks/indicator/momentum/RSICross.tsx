'use client';

import { FC, useEffect, useRef, useState } from 'react';

import {
	BlockProps,
	DirectionType,
	Node,
	RSIPeriodType,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface RSICrossProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialRightValue?: RSIPeriodType;
	initialRightComparison?: DirectionType;
	initialRSICrossValue?: string;
}

const RSICross: FC<RSICrossProps> = ({
	ref,
	initialTimeframe = '1d',
	initialRightValue = '14',
	initialRightComparison = 'UP',
	initialRSICrossValue = '',
	disabled = false,
}) => {
	const rsiCrossValueRef = useRef<HTMLInputElement>(null);

	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);
	const [rightValue, setRightValue] =
		useState<RSIPeriodType>(initialRightValue);
	const [rightComparison, setRightComparison] = useState<DirectionType>(
		initialRightComparison
	);

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightValue = (value: string) => {
		setRightValue(value as RSIPeriodType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as DirectionType);
	};

	const createJson = () => {
		if (!rsiCrossValueRef.current) {
			return {} as Node;
		}

		return {
			type: 'CROSS',
			label: 'rsiCross',
			direction: rightComparison,
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
				constant: { value: rsiCrossValueRef.current?.value },
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.rsiCross = createJson;
			} else {
				ref.current = {
					rsiCross: createJson,
				};
			}
		}
	}, [timeframe, rightValue, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				RSI 교차 감지
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
					ref={rsiCrossValueRef}
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
					disabled={disabled}
					defaultValue={initialRSICrossValue}
				>
					0부터 100 사이의 값을 입력해주세요.
				</Block.input>
				를
				<Block.dropdown
					placeholder="비교"
					items={[
						{
							category: '',
							options: [
								{ label: '상향 돌파', value: 'UP' },
								{ label: '하향 돌파', value: 'DOWN' },
							],
						},
					]}
					value={rightComparison}
					onChange={handleChangeRightComparison}
					disabled={disabled}
				/>
				할 때
			</div>
		</Block>
	);
};

export default RSICross;
