import { ChangeEventHandler, FC } from 'react';

import { cn } from '@/lib/utils';

interface Props {
	selected: boolean;
	type: 'all' | 'my';
	onChange: ChangeEventHandler<HTMLInputElement>;
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
	my: '내 종목',
};

const StockFilterChip: FC<Props> = ({ selected, type, onChange }) => {
	const status = selected ? 'selected' : 'unSelected';
	return (
		<label
			className={cn(
				'flex items-center justify-center border rounded-full px-2 py-1 w-[80px] h-[36px] text-button! cursor-pointer',
				SELECTED_STATUS_MAP[status].textColor,
				SELECTED_STATUS_MAP[status].bgColor,
				SELECTED_STATUS_MAP[status].borderColor
			)}
		>
			<input
				type="radio"
				value={type}
				name="strategy-status-filter"
				checked={selected}
				onChange={onChange}
				className="hidden"
			/>
			{STATUS_TEXT_MAP[type]}
		</label>
	);
};

export default StockFilterChip;
