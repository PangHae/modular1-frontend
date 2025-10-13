'use client';

import { FC, useEffect, useRef, useState } from 'react';

import {
	BlockProps,
	ConstantOperand,
	Node,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

const MACDCompare: FC<BlockProps> = ({ ref }) => {
	const rightValueRef = useRef<HTMLInputElement>(null);
	const [timeframe, setTimeframe] = useState<TimeframeType>('1d');

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const createJson = () => {
		if (!rightValueRef.current) {
			return {} as Node;
		}
		return {
			type: 'COMPARE',
			label: 'macd_compare',
			operator: '>',
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
				constant: { value: rightValueRef.current?.value },
			} as unknown as ConstantOperand,
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.macdCompare = createJson;
		} else {
			ref.current = {
				macdCompare: createJson,
			};
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
								{ label: '1분', value: '1m' },
								{ label: '5분', value: '5m' },
								{ label: '15분', value: '15m' },
								{ label: '1시간', value: '1h' },
								{ label: '4시간', value: '4h' },
								{ label: '1일', value: '1d' },
							],
						},
					]}
					value={timeframe}
					onChange={handleChangeTimeframe}
				/>
				간의 MACD 선이
				<Block.input
					ref={rightValueRef}
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
				/>
				보다 클 때
			</div>
		</Block>
	);
};

export default MACDCompare;
