import { cn } from '@/lib/utils';
import { FC } from 'react';

interface Props {
	selected: boolean;
	type: 'all' | 'running' | 'pending';
}

const SELECTED_STATUS_MAP = {
	selected: {
		textColor: 'text-white',
		bgColor: 'bg-shinhan-blue',
		borderColor: 'border-shinhan-blue',
	},
	unSelected: {
		textColor: 'text-black',
		bgColor: 'bg-shinhan-blue/8',
		borderColor: 'border-shinhan-blue/20',
	},
};

const STATUS_TEXT_MAP = {
	all: '전체',
	running: '실행 중',
	pending: '대기 중',
};

const StrategyStatusFilterChip: FC<Props> = ({ selected, type }) => {
	const status = selected ? 'selected' : 'unSelected';
	return (
		<button
			type="button"
			className={cn(
				'flex items-center justify-center border rounded-full px-2 py-1 w-[80px] h-[36px] text-button!',
				SELECTED_STATUS_MAP[status].textColor,
				SELECTED_STATUS_MAP[status].bgColor,
				SELECTED_STATUS_MAP[status].borderColor
			)}
		>
			{STATUS_TEXT_MAP[type]}
		</button>
	);
};

export default StrategyStatusFilterChip;
