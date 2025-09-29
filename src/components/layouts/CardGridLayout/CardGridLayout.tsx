import { FC, PropsWithChildren } from 'react';

const CardGridLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-4 pb-10 place-items-center">
			{children}
		</div>
	);
};

export default CardGridLayout;
