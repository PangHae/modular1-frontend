import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	Node,
	TimeframeType,
	YearHighLowType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface YearHighLowCompareProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialRightValue?: YearHighLowType;
	initialRightComparison?: ComparisonType;
}

const YearHighLowCompare: FC<YearHighLowCompareProps> = ({
	ref,
	initialTimeframe = '1d',
	initialRightValue = '52_WEEK_HIGH',
	initialRightComparison = '>=',
	disabled = false,
}) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);
	const [rightValue, setRightValue] =
		useState<YearHighLowType>(initialRightValue);
	const [rightComparison, setRightComparison] = useState<ComparisonType>(
		initialRightComparison
	);

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightValue = (value: string) => {
		setRightValue(value as YearHighLowType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		return {
			type: 'COMPARE',
			label: 'yearHighLowCompare',
			operator: rightComparison,
			left: {
				kind: 'PRICE',
				field: 'close',
				timeframe,
			},
			right: {
				kind: 'LEVEL',
				level_name: rightValue,
				args: { period: 252 },
				timeframe: '1d',
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.yearHighLowCompare = createJson;
			} else {
				ref.current = {
					yearHighLowCompare: createJson,
				};
			}
		}
	}, [timeframe, rightValue, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				52주 고점/저점 대비 종가 비교 감지
			</Block.subtitle>
			<div className="flex items-center gap-1">
				<Block.dropdown
					placeholder="지점"
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
				기준 종가가 52주
				<Block.dropdown
					placeholder="기준가"
					items={[
						{
							category: '',
							options: [
								{ label: '고가', value: '52_WEEK_HIGH' },
								{ label: '저가', value: '52_WEEK_LOW' },
							],
						},
					]}
					value={rightValue}
					onChange={handleChangeRightValue}
					disabled={disabled}
				/>
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

export default YearHighLowCompare;
