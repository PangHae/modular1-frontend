import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	DirectionType,
	Node,
	EMAPeriodType,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

const EMACompare: FC<BlockProps> = ({ ref }) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>('1d');
	const [direction, setDirection] = useState<DirectionType>('UP');
	const [rightValue, setRightValue] = useState<EMAPeriodType>('5');

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeDirection = (value: string) => {
		setDirection(value as DirectionType);
	};

	const handleChangeRightValue = (value: string) => {
		setRightValue(value as EMAPeriodType);
	};

	const createJson = () => {
		return {
			type: 'CROSS',
			label: 'EMA-COMPARE-WITH_CLOSE',
			direction,
			left: {
				kind: 'PRICE',
				field: 'close',
				timeframe,
			},
			right: {
				kind: 'INDICATOR',
				name: 'EMA',
				args: {
					period: Number(rightValue),
				},
				timeframe,
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.emaCompare = createJson;
		} else {
			ref.current = {
				emaCompare: createJson,
			};
		}
	}, [timeframe, direction, rightValue]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				지수이동평균선 종가 비교
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
				전 종가가 EMA
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '5', value: '5' },
								{ label: '20', value: '20' },
								{ label: '60', value: '60' },
								{ label: '120', value: '120' },
							],
						},
					]}
					value={rightValue}
					onChange={handleChangeRightValue}
				/>
				보다
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '높을', value: 'UP' },
								{ label: '낮을', value: 'DOWN' },
							],
						},
					]}
					value={direction}
					onChange={handleChangeDirection}
				/>
				때
			</div>
		</Block>
	);
};

export default EMACompare;
