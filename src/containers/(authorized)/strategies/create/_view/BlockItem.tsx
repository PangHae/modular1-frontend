'use client';

import { FC } from 'react';

import { useDraggable } from '@dnd-kit/core';

import { BlockComponent } from '@/constants/blockComponent';

interface Props {
	id: keyof typeof BlockComponent;
	blockName: string;
	blockDescription: string;
}

const BlockItem: FC<Props> = ({ id, blockName, blockDescription }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
		data: {
			text: blockDescription,
			name: blockName,
		},
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				zIndex: 9999,
			}
		: undefined;

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
			id={id}
			style={style}
		>
			<div className="text-sm font-medium">{blockName}</div>
			<div className="text-xs text-gray-600">{blockDescription}</div>
		</div>
	);
};

export default BlockItem;
