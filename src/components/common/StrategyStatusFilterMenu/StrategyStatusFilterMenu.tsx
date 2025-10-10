'use client';

import { FC } from 'react';

import StrategyStatusFilterChip from '../StrategyStatusFilterChip';

interface Props {
	value: 'all' | 'ACTIVATED' | 'PENDING';
	onChange: (status: 'all' | 'ACTIVATED' | 'PENDING') => void;
}

const StrategyStatusFilterRadioGroup: FC<Props> = ({ value, onChange }) => {
	return (
		<menu className="flex gap-2">
			<li>
				<StrategyStatusFilterChip
					selected={value === 'all'}
					type="all"
					onChange={() => onChange('all')}
				/>
			</li>
			<li>
				<StrategyStatusFilterChip
					selected={value === 'ACTIVATED'}
					type="ACTIVATED"
					onChange={() => onChange('ACTIVATED')}
				/>
			</li>
			<li>
				<StrategyStatusFilterChip
					selected={value === 'PENDING'}
					type="PENDING"
					onChange={() => onChange('PENDING')}
				/>
			</li>
		</menu>
	);
};

export default StrategyStatusFilterRadioGroup;
