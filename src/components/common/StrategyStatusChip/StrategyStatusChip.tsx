import { FC } from 'react';

import { cn } from '@/lib/utils';

interface Props {
	status: 'ACTIVATED' | 'PENDING';
}

const STATUS_MAP = {
	ACTIVATED: {
		bgColor: 'bg-status-running-bg',
		textColor: 'text-status-running-text',
		borderColor: 'border-status-running-text',
		dotColor: 'bg-status-running-text',
		text: '실행 중',
	},
	PENDING: {
		bgColor: 'bg-status-pending-bg',
		textColor: 'text-status-pending-text',
		borderColor: 'border-status-pending-text',
		dotColor: 'bg-status-pending-text',
		text: '대기 중',
	},
};

const StrategyStatusChip: FC<Props> = ({ status }) => {
	return (
		<div
			className={cn(
				STATUS_MAP[status].bgColor,
				STATUS_MAP[status].textColor,
				STATUS_MAP[status].borderColor,
				'flex items-center gap-1 rounded-full px-2 py-1 h-[22px] border'
			)}
		>
			<div
				className={cn(
					STATUS_MAP[status].dotColor,
					'w-[8px] h-[8px] rounded-full'
				)}
			/>
			{STATUS_MAP[status].text}
		</div>
	);
};

export default StrategyStatusChip;
