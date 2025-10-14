import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	Node,
	PreviousPriceType,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

const PreviousHighLowCompare: FC<BlockProps> = ({ ref }) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>('1d');
	const [rightValue, setRightValue] =
		useState<PreviousPriceType>('PREVIOUS_HIGH');
	const [rightComparison, setRightComparison] = useState<ComparisonType>('>=');

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightValue = (value: string) => {
		setRightValue(value as PreviousPriceType);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		return {
			type: 'COMPARE',
			label: 'previous_high_low_compare',
			operator: rightComparison,
			left: {
				kind: 'PRICE',
				field: 'close',
				timeframe,
			},
			right: {
				kind: 'LEVEL',
				level_name: rightValue,
				timeframe: '1d',
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.previousHighLowCompare = createJson;
		} else {
			ref.current = {
				previousHighLowCompare: createJson,
			};
		}
	}, []);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				전일 가격 대비 현재 시가 비교 감지
			</Block.subtitle>
			<div className="flex items-center gap-1">
				<Block.dropdown
					placeholder="비교"
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
				기준 현재 시가가 전일
				<Block.dropdown
					placeholder="비교값"
					items={[
						{
							category: '',
							options: [
								{ label: '고가', value: 'PREVIOUS_HIGH' },
								{ label: '저가', value: 'PREVIOUS_LOW' },
								{ label: '시가', value: 'PREVIOUS_OPEN' },
								{ label: '종가', value: 'PREVIOUS_CLOSE' },
							],
						},
					]}
					value={rightValue}
					onChange={handleChangeRightValue}
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
				/>
				일 때
			</div>
		</Block>
	);
};

export default PreviousHighLowCompare;
