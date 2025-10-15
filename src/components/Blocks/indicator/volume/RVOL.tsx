import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	ComparisonType,
	Node,
	RVOLThreshold,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';
interface RVOLProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialRightValue?: RVOLThreshold;
	initialRightComparison?: ComparisonType;
}

const RVOL: FC<RVOLProps> = ({
	ref,
	initialTimeframe = '1d',
	initialRightValue = '0.8',
	initialRightComparison = '>=',
	disabled = false,
}) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>(initialTimeframe);
	const [rightValue, setRightValue] =
		useState<RVOLThreshold>(initialRightValue);
	const [rightComparison, setRightComparison] = useState<ComparisonType>(
		initialRightComparison
	);

	const handleChangeTimeframe = (value: string) => {
		setTimeframe(value as TimeframeType);
	};

	const handleChangeRightValue = (value: string) => {
		setRightValue(value as RVOLThreshold);
	};

	const handleChangeRightComparison = (value: string) => {
		setRightComparison(value as ComparisonType);
	};

	const createJson = () => {
		return {
			type: 'COMPARE',
			label: 'rvolCompare',
			operator: rightComparison,
			left: {
				kind: 'INDICATOR',
				name: 'RELATIVE_VOLUME',
				args: { period: 20 },
				timeframe,
			},
			right: {
				kind: 'CONSTANT',
				constant: { value: Number(rightValue) },
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.rvolCompare = createJson;
			} else {
				ref.current = {
					rvolCompare: createJson,
				};
			}
		}
	}, [timeframe, rightValue]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				RVOL(상대 거래량) 대비 상대 거래량 비교 감지
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
				기준 상대 거래량이
				<Block.dropdown
					placeholder="임계값"
					items={[
						{
							category: '',
							options: [
								{ label: '0.8', value: '0.8' },
								{ label: '1.0', value: '1.0' },
								{ label: '1.5', value: '1.5' },
								{ label: '2.0', value: '2.0' },
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

export default RVOL;
