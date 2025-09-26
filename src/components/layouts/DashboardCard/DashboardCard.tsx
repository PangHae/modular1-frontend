import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface Props {
	className?: string;
	title?: string;
}

const DashboardCard: FC<PropsWithChildren<Props>> = ({
	className,
	title,
	children,
}) => {
	return (
		<section className={cn(className, 'p-4 bg-white rounded-xl relative')}>
			{title && (
				<h3 className="text-md font-semibold pb-2 flex-shrink-0">{title}</h3>
			)}
			{children}
		</section>
	);
};

export default DashboardCard;
