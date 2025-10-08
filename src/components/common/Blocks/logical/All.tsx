import { FC, PropsWithChildren } from 'react';

import Block from '../Block';

const All: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Block className="gap-2 border-2 border-purple-500 bg-purple-500/10 rounded-lg p-4">
			<Block.title className="text-purple-500!">
				만약 이 조건들을 모두 만족한다면
			</Block.title>
			{children}
		</Block>
	);
};

export default All;
