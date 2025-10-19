import { ArrayTreeNode } from '@/@types/strategy';

// 최대 깊이 3의 이진트리 = 배열 길이 7 (2^3 - 1 = 7)
export const MAX_TREE_SIZE = 8;

// 배열 기반 이진트리 유틸리티 함수들
export const getLeftChildIndex = (index: number): number => 2 * index;
export const getRightChildIndex = (index: number): number => 2 * index + 1;
export const getParentIndex = (index: number): number =>
	Math.floor((index - 1) / 2);
export const getDepth = (index: number): number => {
	if (index === 0) return 0;
	if (index === 1) return 1;
	if (index === 2 || index === 3) return 2;
	if (index >= 4 && index <= 7) return 3;
	return 4; // 최대 깊이 초과
};

// 배열에 노드 추가 함수
export const addNodeToArray = (
	array: (ArrayTreeNode | null)[],
	blockId: string,
	targetIndex?: number
): (ArrayTreeNode | null)[] => {
	const newArray = [...array];

	if (targetIndex !== undefined && targetIndex < MAX_TREE_SIZE) {
		// 특정 노드의 자식으로 추가
		const targetNode = array[targetIndex];
		if (targetNode && getDepth(targetIndex) < 3) {
			// 최대 높이 4 (depth 0, 1, 2, 3)
			const leftChildIndex = getLeftChildIndex(targetIndex);
			const rightChildIndex = getRightChildIndex(targetIndex);

			// 왼쪽 자식이 비어있으면 왼쪽에 추가
			if (leftChildIndex < MAX_TREE_SIZE && !array[leftChildIndex]) {
				const newNode: ArrayTreeNode = {
					blockId,
					index: leftChildIndex,
				};
				newArray[leftChildIndex] = newNode;
			}
			// 오른쪽 자식이 비어있으면 오른쪽에 추가
			else if (rightChildIndex < MAX_TREE_SIZE && !array[rightChildIndex]) {
				const newNode: ArrayTreeNode = {
					blockId,
					index: rightChildIndex,
				};
				newArray[rightChildIndex] = newNode;
			}
		}
	} else {
		// 루트에 추가 (0번 인덱스)
		const newNode: ArrayTreeNode = {
			blockId,
			index: 0,
		};
		newArray[0] = newNode;
	}

	return newArray;
};

export const removeNodeFromArray = (
	array: (ArrayTreeNode | null)[],
	nodeIndex: number
): (ArrayTreeNode | null)[] => {
	if (nodeIndex >= MAX_TREE_SIZE || !array[nodeIndex]) return array;

	const newArray = [...array];

	// 해당 노드와 모든 자식 노드들을 제거
	const removeNodeAndChildren = (index: number) => {
		if (index >= MAX_TREE_SIZE || !newArray[index]) return;

		const leftChildIndex = getLeftChildIndex(index);
		const rightChildIndex = getRightChildIndex(index);

		// 자식 노드들 먼저 제거
		removeNodeAndChildren(leftChildIndex);
		removeNodeAndChildren(rightChildIndex);

		// 현재 노드 제거
		newArray[index] = null;
	};

	removeNodeAndChildren(nodeIndex);

	return newArray;
};
