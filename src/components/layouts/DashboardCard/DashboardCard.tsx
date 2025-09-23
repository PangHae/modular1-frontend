import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

interface Props {
	className?: string;
}

const DashboardCard: FC<PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	return (
		<section className={cn(className, 'p-4 bg-white rounded-xl')}>
			{children}
		</section>
	);
};

export default DashboardCard;
