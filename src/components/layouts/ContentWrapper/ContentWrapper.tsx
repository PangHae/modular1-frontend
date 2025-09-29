import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const ContentWrapper: FC<PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	return (
		<main className={cn('w-full h-full p-10 bg-transparent', className)}>
			{children}
		</main>
	);
};

export default ContentWrapper;
