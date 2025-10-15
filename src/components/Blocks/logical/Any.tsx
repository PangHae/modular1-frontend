import { FC, PropsWithChildren, useEffect } from 'react';

import { BlockProps, GroupNode, Node } from '@/@types/StrategyTemplateNode';

import Block from '../Block';

interface AnyProps extends BlockProps {
	childrenNodes: Node[];
}

const Any: FC<PropsWithChildren<AnyProps>> = ({
	ref,
	children,
	childrenNodes,
}) => {
	const createJson = () => {
		return {
			type: 'GROUP',
			logic: 'ANY',
			label: 'any',
			children: childrenNodes,
		} as GroupNode;
	};

	useEffect(() => {
		if (ref?.current) {
			(ref.current as any).any = createJson;
		} else if (ref) {
			ref.current = {
				any: createJson,
			} as any;
		}
	}, [childrenNodes]);

	return (
		<Block className="gap-2 border-2 border-purple-500 bg-purple-100 rounded-lg p-4">
			<Block.title className="text-purple-500!">
				만약 이 조건 중 하나라도 만족한다면
			</Block.title>
			{children}
		</Block>
	);
};

export default Any;
