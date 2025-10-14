import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	DirectionType,
	Node,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

const MACDCross: FC<BlockProps> = ({ ref }) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>('1d');
	const [direction, setDirection] = useState<DirectionType>('UP');

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeDirection = (value: string) => {
		setDirection(value as DirectionType);
	};

	const createJson = () => {
		return {
			type: 'CROSS',
			label: 'macdCross',
			direction,
			left: {
				kind: 'INDICATOR',
				name: 'MACD',
				args: {
					fast: 12,
					slow: 26,
					signal: 9,
				},
				subfield: 'line',
				timeframe,
			},
			right: {
				kind: 'INDICATOR',
				name: 'MACD',
				args: {
					fast: 12,
					slow: 26,
					signal: 9,
				},
				subfield: 'signal',
				timeframe,
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.macdCross = createJson;
		} else {
			ref.current = {
				macdCross: createJson,
			};
		}
	}, []);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				MACD 매수, 매도 신호 감지
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
				기준 MACD선이 시그널선을
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '상향 돌파', value: 'UP' },
								{ label: '하향 돌파', value: 'DOWN' },
							],
						},
					]}
					value={direction}
					onChange={handleChangeDirection}
				/>
				할 때
			</div>
		</Block>
	);
};

export default MACDCross;
