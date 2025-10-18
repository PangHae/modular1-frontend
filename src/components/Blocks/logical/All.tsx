import { FC, PropsWithChildren, useEffect } from 'react';

import { useDroppable } from '@dnd-kit/core';

import { BlockProps, GroupNode, Node } from '@/@types/StrategyTemplateNode';

import Block from '../Block';

interface AllProps extends BlockProps {
	childrenNodes: Node[];
}

const All: FC<PropsWithChildren<AllProps>> = ({
	ref,
	children,
	childrenNodes,
}) => {
	const { setNodeRef } = useDroppable({
		id: 'all-drop-zone',
	});
	const createJson = () => {
		return {
			type: 'GROUP',
			logic: 'ALL',
			label: 'all',
			children: childrenNodes,
		} as GroupNode;
	};

	useEffect(() => {
		if (ref?.current) {
			(ref.current as any).all = createJson;
		} else if (ref) {
			ref.current = {
				all: createJson,
			} as any;
		}
	}, [childrenNodes]);

	return (
		<Block className="gap-2 border-2 border-purple-500 bg-purple-100 rounded-lg p-4">
			<Block.title className="text-purple-500!">
				만약 이 조건들을 모두 만족한다면
			</Block.title>
			<div className="space-y-2" ref={setNodeRef}>
				{children}
				{(!children || (Array.isArray(children) && children.length < 2)) && (
					<div className="text-sm text-gray-500 p-4 text-center border-2 border-dashed border-gray-300 rounded">
						드래그하여 블록을 추가하세요
					</div>
				)}
			</div>
		</Block>
	);
};

export default All;
