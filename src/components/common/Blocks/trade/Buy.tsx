import { FC, PropsWithChildren } from 'react';

import Block from '../Block';

const Buy: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Block className="flex-1 gap-2 p-4 border-2 border-red-500 rounded-lg bg-red-500/10">
			<div className="flex items-center gap-2">
				<Block.title className="text-red-500!">매도</Block.title>
				<Block.input
					className="w-[200px] bg-white! focus-visible:border-red-500"
					placeholder="몇 주를 매수할까요?"
					value=""
					onChange={() => {}}
				/>
			</div>
			{children}
		</Block>
	);
};

export default Buy;
