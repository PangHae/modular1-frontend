import { FC } from 'react';

import { Button } from '@/components/ui/button';

interface Props {
	strategyName: string;
}

const StrategyItem: FC<Props> = ({ strategyName }) => {
	return (
		<div className="flex align-center justify-between px-6 py-4 border-b border-custom-gray-border">
			{strategyName}
			<Button
				className="bg-shinhan-blue cursor-pointer hover:bg-shinhan-blue/80"
				size="sm"
			>
				적용
			</Button>
		</div>
	);
};

export default StrategyItem;
