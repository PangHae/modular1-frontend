import { FC, PropsWithChildren } from 'react';

const CardGridLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="grid grid-cols-3 gap-4 pb-10 place-items-center">
			{children}
		</div>
	);
};

export default CardGridLayout;
