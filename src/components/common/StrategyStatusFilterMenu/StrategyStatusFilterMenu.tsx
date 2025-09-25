'use client';

import { useState } from 'react';

import StrategyStatusFilterChip from '../StrategyStatusFilterChip';

const StrategyStatusFilterRadioGroup = () => {
	const [value, setValue] = useState('all');

	const handleChangeValue = (value: string) => {
		setValue(value);
	};

	return (
		<menu className="flex gap-2">
			<li>
				<StrategyStatusFilterChip
					selected={value === 'all'}
					type="all"
					onChange={() => handleChangeValue('all')}
				/>
			</li>
			<li>
				<StrategyStatusFilterChip
					selected={value === 'running'}
					type="running"
					onChange={() => handleChangeValue('running')}
				/>
			</li>
			<li>
				<StrategyStatusFilterChip
					selected={value === 'pending'}
					type="pending"
					onChange={() => handleChangeValue('pending')}
				/>
			</li>
		</menu>
	);
};

export default StrategyStatusFilterRadioGroup;
