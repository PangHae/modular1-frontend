'use client';

import React, { FC, ReactNode, useState } from 'react';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	Cuboid,
	Shapes,
} from 'lucide-react';

import { ArrayTreeNode } from '@/@types/strategy';
import SidePalette from '@/components/common/SidePalette/SidePalette';
import { BlockComponent } from '@/constants/blockComponent';
import { useAllStrategies } from '@/hooks/api/strategy/useAllStrategies';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';
import {
	addNodeToArray,
	getLeftChildIndex,
	getRightChildIndex,
	MAX_TREE_SIZE,
} from '@/lib/binaryTree';
import { cn } from '@/lib/utils';

import BlockAccordion from './_view/BlockAccordion';

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

interface Props {
	strategyType: 'BUY' | 'SELL';
	onStrategyTypeChange: (type: 'BUY' | 'SELL') => void;
}

type TabType = 'strategy' | 'block';

const StrategyConfigurationClient: FC<Props> = ({
	strategyType,
	onStrategyTypeChange,
}) => {
	const { treeState, handleChangeTreeState } = useCreateStrategyContext();
	const { ref } = useCreateStrategyContext();
	const [activeTab, setActiveTab] = useState<TabType>('strategy');
	const [activeComponent, setActiveComponent] = useState<{
		text: string;
		name: string;
	} | null>(null);

	const { data: strategiesData, isLoading: isStrategiesLoading } =
		useAllStrategies();

	const handleDragStart = (event: DragStartEvent) => {
		setActiveComponent({
			text: event.active.data.current?.text as string,
			name: event.active.data.current?.name as string,
		});
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over) {
			const blockId = active.id as string;

			// 루트 드롭 존 (buy-drop-zone, sell-drop-zone)
			if (over.id === 'buy-drop-zone' || over.id === 'sell-drop-zone') {
				// Buy/Sell 블록의 자식으로 추가 (루트 인덱스 0의 자식으로)
				handleChangeTreeState((prev) => addNodeToArray(prev, blockId, 0));
			}
			// 논리 블록 드롭 존 (all-drop-zone, any-drop-zone)
			else if (over.id === 'all-drop-zone' || over.id === 'any-drop-zone') {
				// 논리 블록의 자식으로 추가
				// 드롭 존 ID에서 해당 블록의 인덱스를 찾아서 자식으로 추가
				const findTargetIndex = (dropZoneId: string): number | undefined => {
					if (dropZoneId === 'all-drop-zone') {
						// all 블록의 인덱스 찾기
						return treeState.findIndex((node) => node?.blockId === 'all');
					} else if (dropZoneId === 'any-drop-zone') {
						// any 블록의 인덱스 찾기
						return treeState.findIndex((node) => node?.blockId === 'any');
					}
					return undefined;
				};

				const targetIndex = findTargetIndex(over.id);
				if (targetIndex !== -1) {
					handleChangeTreeState((prev) =>
						addNodeToArray(prev, blockId, targetIndex)
					);
				}
			}
		}
		setActiveComponent(null);
	};

	// 배열 기반 트리 렌더링 함수 (중첩 구조)
	const renderArrayTree = (array: (ArrayTreeNode | null)[]): ReactNode => {
		// 루트 노드(0번 인덱스)가 없으면 빈 상태
		if (!array[0]) return null;

		const renderNode = (node: ArrayTreeNode, nodeIndex: number): ReactNode => {
			const BlockComponentToRender =
				BlockComponent[node.blockId as keyof typeof BlockComponent];
			const leftChildIndex = getLeftChildIndex(nodeIndex);
			const rightChildIndex = getRightChildIndex(nodeIndex);

			// 자식 노드들 찾기
			const leftChild =
				leftChildIndex < MAX_TREE_SIZE ? array[leftChildIndex] : null;
			const rightChild =
				rightChildIndex < MAX_TREE_SIZE ? array[rightChildIndex] : null;

			// 자식 노드들을 children으로 렌더링
			const children = [];
			if (leftChild) {
				children.push(renderNode(leftChild, leftChildIndex));
			}
			if (rightChild) {
				children.push(renderNode(rightChild, rightChildIndex));
			}

			return React.createElement(
				BlockComponentToRender as any,
				{
					disabled: false,
					ref: ref,
					key: `${node.blockId}-${nodeIndex}`,
				},
				children.length > 0 ? children : undefined
			);
		};

		return renderNode(array[0], 0);
	};

	const handleChangeStrategyType = (type: 'BUY' | 'SELL') => {
		if (type === 'SELL') {
			handleChangeTreeState([
				{ blockId: 'sell', index: 0 },
				null,
				null,
				null,
				null,
				null,
				null,
			]);
		} else {
			handleChangeTreeState([
				{ blockId: 'buy', index: 0 },
				null,
				null,
				null,
				null,
				null,
				null,
			]);
		}
		onStrategyTypeChange(type);
	};

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="flex gap-4 p-6 h-full max-h-full overflow-hidden">
				<SidePalette>
					<SidePalette.menuList
						menus={[
							{
								title: '전략',
								item: (
									<button
										onClick={() => setActiveTab('strategy')}
										className="w-full"
									>
										<SidePalette.menuItem
											icon={<Cuboid strokeWidth={1} />}
											title="전략"
											isActive={activeTab === 'strategy'}
										/>
									</button>
								),
							},
							{
								title: '블록',
								item: (
									<button
										onClick={() => setActiveTab('block')}
										className="w-full"
									>
										<SidePalette.menuItem
											icon={<Shapes strokeWidth={1} />}
											title="블록"
											isActive={activeTab === 'block'}
										/>
									</button>
								),
							},
						]}
					/>
					<div className="flex-1 p-4 overflow-y-auto max-h-full">
						{activeTab === 'strategy' && (
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">내 전략</h3>
								{isStrategiesLoading ? (
									<div className="flex items-center justify-center py-8">
										<div className="text-sm text-gray-500">
											전략 목록을 불러오는 중...
										</div>
									</div>
								) : strategiesData?.data?.items?.length ? (
									<div className="space-y-2">
										{strategiesData.data.items.map((strategy) => (
											<div
												key={strategy.id}
												className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
											>
												<div className="font-medium">
													{strategy.strategyName}
												</div>
												<div className="text-sm text-gray-600 mt-1">
													{strategy.stockInfo.stockName}
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="flex items-center justify-center py-8">
										<div className="text-sm text-gray-500">
											등록된 전략이 없습니다.
										</div>
									</div>
								)}
							</div>
						)}

						{activeTab === 'block' && (
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">블록</h3>
								<BlockAccordion />
							</div>
						)}
					</div>
				</SidePalette>
				<div className="flex gap-4 flex-1 border-custom-gray-border/40 p-4 rounded-xl border shadow-sm bg-card flex-col h-full max-h-full overflow-hidden">
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => handleChangeStrategyType('BUY')}
							className={cn(
								'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer',
								strategyType === 'BUY'
									? 'border-red-500 bg-red-50 shadow-lg shadow-red-200'
									: 'border-gray-300 bg-white hover:border-red-300 hover:bg-red-25'
							)}
						>
							<input
								type="radio"
								name="strategyType"
								value="buy"
								checked={strategyType === 'BUY'}
								onChange={() => handleChangeStrategyType('BUY')}
								className="sr-only"
							/>
							<div className="flex items-center gap-2">
								<BanknoteArrowDown
									className={cn(
										'w-5 h-5 transition-colors duration-200',
										strategyType === 'BUY' ? 'text-red-600' : 'text-gray-500'
									)}
								/>
								<span
									className={cn(
										'text-sm font-medium transition-colors duration-200',
										strategyType === 'BUY' ? 'text-red-700' : 'text-gray-600'
									)}
								>
									매수 전략
								</span>
							</div>
						</button>
						<button
							type="button"
							onClick={() => handleChangeStrategyType('SELL')}
							className={cn(
								'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer',
								strategyType === 'SELL'
									? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200'
									: 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-25'
							)}
						>
							<input
								type="radio"
								name="strategyType"
								value="sell"
								checked={strategyType === 'SELL'}
								onChange={() => handleChangeStrategyType('SELL')}
								className="sr-only"
							/>
							<div className="flex items-center gap-2">
								<BanknoteArrowUp
									className={cn(
										'w-5 h-5 transition-colors duration-200',
										strategyType === 'SELL' ? 'text-blue-600' : 'text-gray-500'
									)}
								/>
								<span
									className={cn(
										'text-sm font-medium transition-colors duration-200',
										strategyType === 'SELL' ? 'text-blue-700' : 'text-gray-600'
									)}
								>
									매도 전략
								</span>
							</div>
						</button>
					</div>
					<div className="flex-1 overflow-y-auto">
						{renderArrayTree(treeState)}
					</div>
				</div>
			</div>
			<DragOverlay>
				{activeComponent ? (
					<div className="p-2 border border-gray-200 rounded cursor-pointer bg-white shadow-lg">
						<div className="text-sm font-medium">{activeComponent.name}</div>
						<div className="text-xs text-gray-600">{activeComponent.text}</div>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default StrategyConfigurationClient;
