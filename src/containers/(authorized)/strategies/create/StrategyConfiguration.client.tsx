'use client';

import React, { createElement, FC, ReactNode, useState } from 'react';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Cuboid, FileText, Shapes, X } from 'lucide-react';
import { toast } from 'sonner';

import { ArrayTreeNode } from '@/@types/strategy';
import SidePalette from '@/components/common/SidePalette/SidePalette';
import { BlockComponent } from '@/constants/blockComponent';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';
import {
	addNodeToArray,
	getLeftChildIndex,
	getRightChildIndex,
	MAX_TREE_SIZE,
} from '@/lib/binaryTree';

import BlockAccordion from './_view/BlockAccordion';
import BlockConfigureInterface from './_view/BlockConfigureInterface';
import MyStrategyItems from './_view/MyStrategyItems';
import OneClickTemplateInterface from './_view/OneClickTemplateInterface';
import OneClickTemplateItems from './_view/OneClickTemplateItems';
import StrategyConfigureInterface from './_view/StrategyConfigureInterface';

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

type TabType = 'strategy' | 'block' | 'template';

const StrategyConfigurationClient: FC = () => {
	const { ref, treeState, handleChangeTreeState } = useCreateStrategyContext();
	const [activeTab, setActiveTab] = useState<TabType>('block');
	const [activeComponent, setActiveComponent] = useState<{
		text: string;
		name: string;
	} | null>(null);

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
				if (event.active.id !== 'all' && event.active.id !== 'any') {
					toast.error('매수/매도 블록 위에는 논리 블록만 추가할 수 있습니다.');
					return;
				}

				// 루트 노드(인덱스 0)에는 1개의 자식만 허용 (인덱스 1)
				const currentTree = treeState;
				if (currentTree[1]) {
					toast.error('매수/매도 블록에는 논리 블록 1개만 추가할 수 있습니다.');
					return;
				}

				handleChangeTreeState((prev) => {
					const newArray = [...prev];
					newArray[1] = { blockId, index: 1 };
					return newArray;
				});
			}
			// 논리 블록 드롭 존 (all-drop-zone-*, any-drop-zone-*)
			else if (
				String(over.id).startsWith('all-drop-zone-') ||
				String(over.id).startsWith('any-drop-zone-')
			) {
				// 논리 블록의 자식으로 추가
				// 드롭 존 ID에서 해당 블록의 인덱스를 찾아서 자식으로 추가
				const findTargetIndex = (dropZoneId: string): number => {
					if (dropZoneId.startsWith('all-drop-zone-')) {
						// all-drop-zone-{nodeIndex} 형태에서 nodeIndex 추출
						const nodeIndex = parseInt(
							dropZoneId.replace('all-drop-zone-', '')
						);
						return nodeIndex;
					} else if (dropZoneId.startsWith('any-drop-zone-')) {
						// any-drop-zone-{nodeIndex} 형태에서 nodeIndex 추출
						const nodeIndex = parseInt(
							dropZoneId.replace('any-drop-zone-', '')
						);
						return nodeIndex;
					}
					return -1;
				};

				const targetIndex = findTargetIndex(String(over.id));

				// 리프노드(인덱스 4,5,6,7)에는 논리 블록 추가 불가
				if (targetIndex !== -1) {
					if (
						(targetIndex === 2 || targetIndex === 3) &&
						(blockId === 'all' || blockId === 'any')
					) {
						toast.error('논리 블록은 한 번까지만 중첩 할 수 있습니다.');
						return;
					}
					handleChangeTreeState((prev) =>
						addNodeToArray(prev, blockId, targetIndex)
					);
				}
			}
		}
		setActiveComponent(null);
	};

	// 노드 삭제 함수 (해당 노드와 모든 하위 노드들을 삭제)
	const handleDeleteNode = (nodeIndex: number) => {
		handleChangeTreeState((prev) => {
			const newArray = [...prev];

			// 재귀적으로 하위 노드들을 모두 삭제하는 함수
			const deleteNodeAndChildren = (index: number) => {
				if (index >= MAX_TREE_SIZE || !newArray[index]) {
					return;
				}

				// 현재 노드 삭제
				newArray[index] = null;

				// 왼쪽 자식 삭제
				const leftChildIndex = getLeftChildIndex(index);
				if (leftChildIndex < MAX_TREE_SIZE) {
					deleteNodeAndChildren(leftChildIndex);
				}

				// 오른쪽 자식 삭제
				const rightChildIndex = getRightChildIndex(index);
				if (rightChildIndex < MAX_TREE_SIZE) {
					deleteNodeAndChildren(rightChildIndex);
				}
			};

			deleteNodeAndChildren(nodeIndex);
			return newArray;
		});

		toast.success('블록이 삭제되었습니다.');
	};

	// 배열 기반 트리 렌더링 함수 (중첩 구조)
	const renderArrayTree = (array: (ArrayTreeNode | null)[]): ReactNode => {
		// 루트 노드(0번 인덱스)가 없으면 빈 상태
		if (!array[0]) return null;

		const renderNode = (node: ArrayTreeNode, nodeIndex: number): ReactNode => {
			const BlockComponentToRender =
				BlockComponent[node.blockId as keyof typeof BlockComponent];

			let leftChildIndex: number;
			let rightChildIndex: number;

			// 루트 노드(인덱스 0)는 특별 처리: 자식이 인덱스 1에만 있음
			if (nodeIndex === 0) {
				leftChildIndex = 1;
				rightChildIndex = -1; // 오른쪽 자식 없음
			} else {
				// 다른 노드들은 일반적인 이진트리 인덱스 계산
				leftChildIndex = getLeftChildIndex(nodeIndex);
				rightChildIndex = getRightChildIndex(nodeIndex);
			}

			// 자식 노드들 찾기
			const leftChild =
				leftChildIndex < MAX_TREE_SIZE && leftChildIndex >= 0
					? array[leftChildIndex]
					: null;
			const rightChild =
				rightChildIndex < MAX_TREE_SIZE && rightChildIndex >= 0
					? array[rightChildIndex]
					: null;

			// 자식 노드들을 children으로 렌더링
			const children = [];
			if (leftChild) {
				children.push(renderNode(leftChild, leftChildIndex));
			}
			if (rightChild) {
				children.push(renderNode(rightChild, rightChildIndex));
			}

			const blockElement = createElement(
				BlockComponentToRender as any,
				{
					disabled: false,
					ref: ref,
					key: `${node.blockId}-${nodeIndex}`,
					nodeIndex: nodeIndex,
				},
				children.length > 0 ? children : undefined
			);

			return (
				<div key={`${node.blockId}-${nodeIndex}`} className="relative">
					{blockElement}
					{nodeIndex !== 0 && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteNode(nodeIndex);
							}}
							className="absolute top-2 right-2 z-10 text-black p-1 w-6 h-6 flex items-center justify-center transition-colors duration-200 cursor-pointer"
							title="노드 삭제"
						>
							<X size={14} />
						</button>
					)}
				</div>
			);
		};

		return renderNode(array[0], 0);
	};

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="flex gap-4 p-6 h-full max-h-full overflow-hidden">
				<SidePalette>
					<SidePalette.menuList
						menus={[
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
							{
								title: '템플릿',
								item: (
									<button
										onClick={() => setActiveTab('template')}
										className="w-full"
									>
										<SidePalette.menuItem
											icon={<FileText strokeWidth={1} />}
											title="템플릿"
											isActive={activeTab === 'template'}
										/>
									</button>
								),
							},
							{
								title: '전략',
								item: (
									<button
										onClick={() => setActiveTab('strategy')}
										className="w-full"
									>
										<SidePalette.menuItem
											icon={<Cuboid strokeWidth={1} />}
											title="내 전략"
											isActive={activeTab === 'strategy'}
										/>
									</button>
								),
							},
						]}
					/>
					<div className="flex-1 p-4 overflow-y-auto max-h-full">
						{activeTab === 'block' && (
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">블록</h3>
								<BlockAccordion />
							</div>
						)}
						{activeTab === 'template' && (
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">원클릭 템플릿</h3>
								<OneClickTemplateItems />
							</div>
						)}
						{activeTab === 'strategy' && (
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">내 전략</h3>
								<MyStrategyItems />
							</div>
						)}
					</div>
				</SidePalette>
				{activeTab === 'block' && (
					<BlockConfigureInterface renderArrayTree={renderArrayTree} />
				)}
				{activeTab === 'template' && (
					<OneClickTemplateInterface renderArrayTree={renderArrayTree} />
				)}
				{activeTab === 'strategy' && (
					<StrategyConfigureInterface renderArrayTree={renderArrayTree} />
				)}
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
