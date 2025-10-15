import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	Node,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface BandRelativeCompareProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialRightComparison?: ComparisonType;
}

const BandRelativeCompare: FC<BandRelativeCompareProps> = ({
	ref,
	initialTimeframe = '1d',
	initialRightComparison = '>=',
	disabled = false,
}) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);
	const [rightComparison, setRightComparison] = useState<ComparisonType>(
		initialRightComparison
	);

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		return {
			type: 'COMPARE',
			label: 'bandRelativeCompare',
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
		if (ref) {
			if (ref.current) {
				ref.current.bandRelativeCompare = createJson;
			} else {
				ref.current = {
					bandRelativeCompare: createJson,
				};
			}
		} else {
		}
	}, [timeframe, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				볼린저밴드 폭 상대값 대비 변화 감지
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
				기준 볼린저밴드의 폭이 직전봉 폭
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

export default BandRelativeCompare;
