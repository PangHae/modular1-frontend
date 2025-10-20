import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	DirectionType,
	Node,
	EMAPeriodType,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface EMACompareProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialDirection?: DirectionType;
	initialRightValue?: EMAPeriodType;
}

const EMACompare: FC<EMACompareProps> = ({
	ref,
	initialTimeframe = '1d',
	initialDirection = 'UP',
	initialRightValue = '5',
	disabled = false,
}) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);
	const [direction, setDirection] = useState<DirectionType>(initialDirection);
	const [rightValue, setRightValue] =
		useState<EMAPeriodType>(initialRightValue);

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
			label: 'emaCompare',
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
		if (ref) {
			if (ref.current) {
				ref.current.emaCompare = createJson;
			} else {
				ref.current = {
					emaCompare: createJson,
				};
			}
		}
	}, [timeframe, direction, rightValue]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				지수이동평균선 종가 비교 감지
			</Block.subtitle>
			<div className="flex items-center gap-1 flex-wrap">
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '1분봉', value: '1m' },
								{ label: '5분봉', value: '5m' },
								{ label: '15분', value: '15m' },
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
				기준 종가가 EMA
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
					disabled={disabled}
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
					disabled={disabled}
				/>
				때
			</div>
		</Block>
	);
};

export default EMACompare;
