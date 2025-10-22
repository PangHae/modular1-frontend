import React, { FC, ReactNode } from 'react';

import Image from 'next/image';

import { ArrayTreeNode } from '@/@types/strategy';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

interface Props {
	renderArrayTree: (treeState: (ArrayTreeNode | null)[]) => ReactNode | null;
}

const OneClickTemplateInterface: FC<Props> = ({ renderArrayTree }) => {
	const { selectedTemplate, treeState, selectedStock } =
		useCreateStrategyContext();

	return (
		<div className="flex gap-4 flex-1 border-custom-gray-border/40 p-4 rounded-xl border shadow-sm bg-card flex-col h-full max-h-full overflow-hidden">
			<div className="flex items-center justify-end gap-4">
				<div className="flex items-center pl-4 px-6 py-1 bg-white rounded-lg border-2 border-custom-gray-border/40 h-[48px]">
					<div className="flex items-center space-x-3">
						{selectedStock.code && (
							<Image
								className="rounded-full"
								src={`https://images.tossinvest.com/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${selectedStock.code}.png?width=64&height=64`}
								alt={selectedStock.name}
								width={32}
								height={32}
							/>
						)}
						<h4 className="text-sub1 font-semibold text-gray-900">
							{selectedStock.name}
						</h4>
						<p className="text-button text-gray-500">{selectedStock.code}</p>
					</div>
				</div>
			</div>
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
