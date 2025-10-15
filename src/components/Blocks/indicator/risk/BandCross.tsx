import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	BollingerBandBaseLineType,
	DirectionType,
	Node,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface BandCrossProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialBaseLine?: BollingerBandBaseLineType;
	initialDirection?: DirectionType;
}

const BandCross: FC<BandCrossProps> = ({
	ref,
	initialTimeframe = '1d',
	initialBaseLine = 'upper',
	initialDirection = 'UP',
	disabled = false,
}) => {
	const [baseLine, setBaseLine] =
		useState<BollingerBandBaseLineType>(initialBaseLine);
	const [direction, setDirection] = useState<DirectionType>(initialDirection);
	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);

	const handleChangeBaseLine = (value: string) => {
		setBaseLine(value as BollingerBandBaseLineType);
	};

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeDirection = (value: string) => {
		setDirection(value as DirectionType);
	};

	const createJson = () => {
		return {
			type: 'CROSS',
			label: 'bandCross',
			direction,
			left: {
				kind: 'PRICE',
				field: 'close',
				timeframe,
			},
			right: {
				kind: 'INDICATOR',
				name: 'BOLLINGER_BANDS',
				args: {
					period: 20,
					stddev: 2,
				},
				subfield: baseLine,
				timeframe,
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.bandCross = createJson;
			} else {
				ref.current = {
					bandCross: createJson,
				};
			}
		}
	}, [baseLine, direction, timeframe]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				볼린저밴드 교차 감지
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
				기준 종가가 볼린저밴드의
				<Block.dropdown
					placeholder="기준"
					items={[
						{
							category: '',
							options: [
								{ label: '상단선', value: 'upper' },
								{ label: '하단선', value: 'lower' },
							],
						},
					]}
					value={baseLine}
					onChange={handleChangeBaseLine}
					disabled={disabled}
				/>
				을
				<Block.dropdown
					placeholder="추세"
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
					disabled={disabled}
				/>
				할 때
			</div>
		</Block>
	);
};

export default BandCross;
