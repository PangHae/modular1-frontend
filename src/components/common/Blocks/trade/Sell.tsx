import { FC, PropsWithChildren } from 'react';

import Block from '../Block';

const Sell: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Block className="flex-1 gap-2 p-4 border-2 border-shinhan-blue rounded-lg bg-shinhan-blue/10">
			<div className="flex items-center gap-2">
				<Block.title className="text-shinhan-blue!">매도</Block.title>
				<Block.input
					className="w-[200px] bg-white! focus-visible:border-shinhan-blue"
					placeholder="몇 주를 매도할까요?"
					value=""
					onChange={() => {}}
				/>
			</div>
			{children}
		</Block>
	);
};

export default Sell;
