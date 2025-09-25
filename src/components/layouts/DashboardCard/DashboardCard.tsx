import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

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
		<section className={cn(className, 'p-4 bg-white rounded-xl')}>
			{title && <h3 className="text-md font-semibold pb-2">{title}</h3>}
			{children}
		</section>
	);
};

export default DashboardCard;
