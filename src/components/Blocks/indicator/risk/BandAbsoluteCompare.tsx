import { FC, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import {
	BlockProps,
	ComparisonType,
	Node,
	TimeframeType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface BandAbsoluteCompareProps extends BlockProps {
	initialTimeframe?: TimeframeType;
	initialRightComparison?: ComparisonType;
	initialBandAbsoluteCompareValue?: string;
}

const BandAbsoluteCompare: FC<BandAbsoluteCompareProps> = ({
	ref,
	initialTimeframe = '1d',
	initialRightComparison = '>=',
	initialBandAbsoluteCompareValue = '',
	disabled = false,
}) => {
	const bandAbsoluteCompareValueRef = useRef<HTMLInputElement>(null);

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
		if (!bandAbsoluteCompareValueRef.current?.value) {
			toast.error('볼린저밴드 폭 절대값 대비 변화 감지 값을 입력해주세요.');
			return null;
		}

		if (
			Number(bandAbsoluteCompareValueRef.current.value) < 2 ||
			Number(bandAbsoluteCompareValueRef.current.value) > 5
		) {
			toast.error(
				'볼린저밴드 폭 절대값 대비 변화 감지 값은 2부터 5 사이의 값을 입력해주세요.'
			);
			return null;
		}

		return {
			type: 'COMPARE',
			label: 'bandAbsoluteCompare',
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
				kind: 'CONSTANT',
				constant: {
					value: bandAbsoluteCompareValueRef.current?.value,
					unit: 'percent',
				},
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.bandAbsoluteCompare = createJson;
			} else {
				ref.current = {
					bandAbsoluteCompare: createJson,
				};
			}
		}
	}, [timeframe, rightComparison]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				볼린저밴드 폭 절대값 대비 변화 감지
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
				<Block.input
					ref={bandAbsoluteCompareValueRef}
					type="number"
					className="w-[100px]"
					placeholder="값 입력"
					disabled={disabled}
					defaultValue={initialBandAbsoluteCompareValue}
				>
					2부터 5 사이의 값을 입력해주세요.
				</Block.input>
				%
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

export default BandAbsoluteCompare;
