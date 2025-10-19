import React, { FC, ReactNode } from 'react';

import { ArrayTreeNode } from '@/@types/strategy';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

interface Props {
	renderArrayTree: (treeState: (ArrayTreeNode | null)[]) => ReactNode | null;
}

const OneClickTemplateInterface: FC<Props> = ({ renderArrayTree }) => {
	const { selectedTemplate, treeState } = useCreateStrategyContext();

	return (
		<div className="flex gap-4 flex-1 border-custom-gray-border/40 p-4 rounded-xl border shadow-sm bg-card flex-col h-full max-h-full overflow-hidden">
			{selectedTemplate ? (
				<div className="flex-1 overflow-auto">{renderArrayTree(treeState)}</div>
			) : (
				<div className="flex items-center justify-center h-full">
					<div className="text-sm text-gray-500">템플릿을 선택해주세요.</div>
				</div>
			)}
		</div>
	);
};

export default OneClickTemplateInterface;
