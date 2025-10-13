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

const RSICross: FC<BlockProps> = ({ ref }) => {
	const rightValueRef = useRef<HTMLInputElement>(null);

	const [timeframe, setTimeframe] = useState<TimeframeType>('1d');
	const [rightValue, setRightValue] = useState<RSIPeriodType>('14');
	const [rightComparison, setRightComparison] = useState<DirectionType>('UP');

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
		if (!rightValueRef.current) {
			return {} as Node;
		}

		return {
			type: 'CROSS',
			label: 'rsi-cross',
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
				constant: { value: rightValueRef.current?.value },
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.rsiCross = createJson;
		} else {
			ref.current = {
				rsiCross: createJson,
			};
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
				/>
				기준
				<Block.dropdown
					placeholder="일자"
					items={[
						{
							category: '',
							options: [
								{ label: '7봉', value: '7' },
								{ label: '14봉', value: '14' },
								{ label: '21봉', value: '21' },
							],
						},
					]}
					value={rightValue}
					onChange={handleChangeRightValue}
				/>
				RSI가
				<Block.input
					ref={rightValueRef}
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
				/>
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
				/>
				할 때
			</div>
		</Block>
	);
};

export default RSICross;
