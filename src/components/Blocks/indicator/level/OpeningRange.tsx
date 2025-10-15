'use client';

import { FC, useEffect, useState } from 'react';

import {
	BlockProps,
	DirectionType,
	Node,
	OpeningRangeSubfieldType,
} from '@/@types/StrategyTemplateNode';

import Block from '../../Block';

interface OpeningRangeProps extends BlockProps {
	initialSubfield?: OpeningRangeSubfieldType;
	initialDirection?: DirectionType;
}

const OpeningRange: FC<OpeningRangeProps> = ({
	ref,
	initialSubfield = 'high',
	initialDirection = 'UP',
	disabled = false,
}) => {
	const [subfield, setSubfield] =
		useState<OpeningRangeSubfieldType>(initialSubfield);
	const [direction, setDirection] = useState<DirectionType>(initialDirection);

	const handleChangeSubfield = (value: string) => {
		setSubfield(value as OpeningRangeSubfieldType);
	};

	const handleChangeDirection = (value: string) => {
		setDirection(value as DirectionType);
	};

	const createJson = () => {
		return {
			type: 'CROSS',
			label: 'openingRangeCross',
			direction,
			left: {
				kind: 'PRICE',
				field: 'close',
				timeframe: '1d',
			},
			right: {
				kind: 'INDICATOR',
				name: 'OPENING_RANGE',
				args: {
					period: 15,
				},
				subfield,
				timeframe: '1m',
			},
		} as unknown as Node;
	};

	useEffect(() => {
		if (ref) {
			if (ref.current) {
				ref.current.openingRangeCross = createJson;
			} else {
				ref.current = {
					openingRangeCross: createJson,
				};
			}
		}
	}, [subfield, direction]);

	return (
		<Block className="flex gap-2 p-4 border-2 border-papaya-orange rounded-lg bg-papaya-orange-bg">
			<Block.subtitle className="text-papaya-orange">
				장시작 15분 동안의 고점 또는 저점 감지
			</Block.subtitle>
			<div className="flex items-center gap-1">
				장 시작 15분 동안의
				<Block.dropdown
					placeholder="지점"
					items={[
						{
							category: '',
							options: [
								{ label: '고점', value: 'high' },
								{ label: '저점', value: 'low' },
							],
						},
					]}
					value={subfield}
					onChange={handleChangeSubfield}
					disabled={disabled}
				/>
				보다 종가가
				<Block.dropdown
					placeholder="비교"
					items={[
						{
							category: '',
							options: [
								{ label: '높아', value: 'UP' },
								{ label: '낮아', value: 'DOWN' },
							],
						},
					]}
					value={direction}
					onChange={handleChangeDirection}
					disabled={disabled}
				/>
				질 때
			</div>
		</Block>
	);
};

export default OpeningRange;
