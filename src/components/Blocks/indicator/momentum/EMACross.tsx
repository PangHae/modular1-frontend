import { FC, useEffect, useState } from 'react';

import { Node } from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface Props {
	ref: React.RefObject<{ [key: string]: () => Node } | null>;
}

const EMACross: FC<Props> = ({ ref }) => {
	const [leftEMA, setLeftEMA] = useState<string>('5');
	const [rightEMA, setRightEMA] = useState<string>('60');

	const handleChangeLeftEMA = (value: string) => {
		setLeftEMA(value);
	};

	const handleChangeRightEMA = (value: string) => {
		setRightEMA(value);
	};

	const createJson = () => {
		return {
			type: 'CROSS',
			label: 'ema_cross',
			direction: 'UP',
			left: {
				kind: 'INDICATOR',
				name: 'EMA',
				args: {
					period: Number(leftEMA),
				},
				timeframe: '1d',
			},
			right: {
				kind: 'INDICATOR',
				name: 'EMA',
				args: {
					period: Number(rightEMA),
				},
				timeframe: '1d',
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref?.current) {
			ref.current.emaCross = createJson;
		} else {
			ref.current = {
				emaCross: createJson,
			};
		}
	}, [leftEMA, rightEMA]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				지수이동평균선 교차 감지
			</Block.subtitle>
			<div className="flex items-center gap-1">
				EMA
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
					value={leftEMA}
					onChange={handleChangeLeftEMA}
				/>
				이(가) EMA
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
					value={rightEMA}
					onChange={handleChangeRightEMA}
				/>
				을 돌파할 때
			</div>
		</Block>
	);
};

export default EMACross;
