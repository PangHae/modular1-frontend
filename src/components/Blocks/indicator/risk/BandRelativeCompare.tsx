import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	Node,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

const BandRelativeCompare: FC<BlockProps> = ({ ref }) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>('1d');
	const [rightComparison, setRightComparison] = useState<ComparisonType>('>=');

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		return {
			type: 'COMPARE',
			label: 'band_relative_compare',
			operator: rightComparison,
			left: {
				kind: 'INDICATOR',
				name: 'BOLLINGER_BANDSWIDTH',
				args: {
					period: 20,
					stddev: 2,
				},
				timeframe,
			},
			right: {
				kind: 'INDICATOR',
				name: 'BOLLINGER_BANDSWIDTH',
				args: {
					period: 20,
				},
				timeframe,
				lookback: 1,
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.bandRelativeCompare = createJson;
		} else {
			ref.current = {
				bandRelativeCompare: createJson,
			};
		}
	}, [timeframe, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				볼린저밴드 폭 변화 감지
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
				기준 볼린저 밴드의 폭이 직전봉 폭보다
				<Block.dropdown
					placeholder="비교"
					items={[
						{
							category: '',
							options: [
								{ label: '클 때', value: '>=' },
								{ label: '작을 때', value: '<=' },
							],
						},
					]}
					value={rightComparison}
					onChange={handleChangeRightComparison}
				/>
			</div>
		</Block>
	);
};

export default BandRelativeCompare;
