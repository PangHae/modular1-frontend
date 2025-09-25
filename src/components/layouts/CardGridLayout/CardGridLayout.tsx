import { FC, PropsWithChildren } from 'react';

const CardGridLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="grid grid-cols-[repeat(3,420px)] gap-4 place-items-center pb-10">
			{children}
		</div>
	);
};

export default CardGridLayout;
