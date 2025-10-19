'use client';

import {
	createContext,
	Dispatch,
	SetStateAction,
	useRef,
	useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
	ArrayTreeNode,
	CreateStrategyRequest,
	StrategyTemplate,
} from '@/@types/strategy';
import { GroupNode, Node } from '@/@types/StrategyTemplateNode';
import { FullScreenLoading } from '@/components/common/FullScreenLoading';
import { useCreateStrategy } from '@/hooks/api/strategy/useCreateStrategy';

type Step = 1 | 2;
type StrategyType = 'BUY' | 'SELL';

export const Context = createContext<{
	ref: React.RefObject<{ [key: string]: () => Node } | null>;
	currentStep: Step;
	strategyType: StrategyType;
	selectedStock: string;
	strategyNameRef: React.RefObject<HTMLInputElement | null>;
	setSelectedStock: (stock: string) => void;
	setStrategyType: (type: StrategyType) => void;
	handleNext: () => void;
	handlePrev: () => void;
	handleCreateStrategy: () => void;
	treeState: (ArrayTreeNode | null)[];
	handleChangeTreeState: Dispatch<SetStateAction<(ArrayTreeNode | null)[]>>;
	selectedTemplate: CreateStrategyRequest | null;
	handleSelectTemplate: (template: CreateStrategyRequest) => void;
} | null>(null);

export const CreateStrategyProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const strategyNameRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutate: createStrategy, isPending } = useCreateStrategy({
		onSuccess: (data) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ['strategies'] });
			router.push(`/strategies/${data.data.strategyId}`);
		},
		onError: (error) => {
			console.error(error);
			toast.error(error.message);
		},
	});
	const childRef = useRef<{ [key: string]: () => Node }>(null);
	const [currentStep, setCurrentStep] = useState<Step>(1);
	const [strategyType, setStrategyType] = useState<StrategyType>('BUY');
	const [selectedStock, setSelectedStock] = useState('');
	const [treeState, setTreeState] = useState<(ArrayTreeNode | null)[]>([
		{ blockId: 'buy', index: 0 },
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	]);
	const [selectedTemplate, setSelectedTemplate] =
		useState<CreateStrategyRequest | null>(null);

	const handleSelectTemplate = (template: CreateStrategyRequest) => {
		setSelectedTemplate(template);

		// 템플릿 JSON을 treeState 배열로 변환
		const convertTemplateToTreeState = (
			template: CreateStrategyRequest
		): (ArrayTreeNode | null)[] => {
			const treeState = new Array(8).fill(null);

			// 루트 노드 설정 (인덱스 0)
			if (template.buy) {
				treeState[0] = { blockId: 'buy', index: 0 };
			} else if (template.sell) {
				treeState[0] = { blockId: 'sell', index: 0 };
			}

			// 노드를 재귀적으로 treeState에 추가
			const addNodeToTreeState = (node: any, nodeIndex: number) => {
				if (!node || nodeIndex >= 8) return;

				// 현재 노드 정보 저장
				if (node.type === 'GROUP') {
					const blockId = node.logic === 'ALL' ? 'all' : 'any';
					treeState[nodeIndex] = { blockId, index: nodeIndex };

					// 자식 노드들 처리
					if (node.children && node.children.length > 0) {
						const leftChildIndex = nodeIndex === 0 ? 1 : 2 * nodeIndex;
						const rightChildIndex = nodeIndex === 0 ? -1 : 2 * nodeIndex + 1;

						// 첫 번째 자식
						if (node.children[0] && leftChildIndex < 8) {
							addNodeToTreeState(node.children[0], leftChildIndex);
						}

						// 두 번째 자식
						if (node.children[1] && rightChildIndex < 8) {
							addNodeToTreeState(node.children[1], rightChildIndex);
						}
					}
				} else if (node.type === 'COMPARE' || node.type === 'CROSS') {
					// 비교/크로스 노드는 해당 라벨을 blockId로 사용
					const blockId = node.label || 'priceCompare';
					treeState[nodeIndex] = { blockId, index: nodeIndex };
				}
			};

			// 루트 노드의 자식부터 시작
			const rootNode = template.buy?.node || template.sell?.node;
			if (rootNode) {
				addNodeToTreeState(rootNode, 1); // 루트의 자식은 인덱스 1
			}

			return treeState;
		};

		// treeState 업데이트
		const newTreeState = convertTemplateToTreeState(template);
		setTreeState(newTreeState);
	};

	const handleNext = () => {
		if (currentStep < 2) {
			setCurrentStep((prev) => (prev + 1) as Step);
		}
	};

	const handlePrev = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => (prev - 1) as Step);
		}
	};

	// treeState를 기반으로 JSON 구조 생성 (루트 노드 제외)
	const buildNodeFromTree = (nodeIndex: number): Node | null => {
		const node = treeState[nodeIndex];

		if (!node) return null;

		// 루트 노드(buy/sell)는 제외하고 자식 노드들만 처리
		if (nodeIndex === 0) {
			// 루트 노드의 자식은 인덱스 1에만 있음
			const childIndex = 1;

			const child =
				childIndex < treeState.length && treeState[childIndex]
					? buildNodeFromTree(childIndex)
					: null;

			// 자식이 있으면 그대로 반환 (추가 GROUP으로 감싸지 않음)
			return child;
		}

		// 논리 블록인 경우 children 배열 생성 (ref 호출보다 먼저 처리)
		if (node.blockId === 'all' || node.blockId === 'any') {
			let leftChildIndex: number;
			let rightChildIndex: number;

			// 루트 노드(인덱스 0)는 특별 처리: 자식이 인덱스 1에만 있음
			if (nodeIndex === 0) {
				leftChildIndex = 1;
				rightChildIndex = -1; // 오른쪽 자식 없음
			} else {
				// 다른 노드들은 일반적인 이진트리 인덱스 계산
				leftChildIndex = 2 * nodeIndex;
				rightChildIndex = 2 * nodeIndex + 1;
			}

			const leftChild =
				leftChildIndex < treeState.length &&
				leftChildIndex >= 0 &&
				treeState[leftChildIndex]
					? buildNodeFromTree(leftChildIndex)
					: null;
			const rightChild =
				rightChildIndex < treeState.length &&
				rightChildIndex >= 0 &&
				treeState[rightChildIndex]
					? buildNodeFromTree(rightChildIndex)
					: null;

			const children = [];
			if (leftChild) children.push(leftChild);
			if (rightChild) children.push(rightChild);

			const result = {
				type: 'GROUP',
				logic: node.blockId === 'all' ? 'ALL' : 'ANY',
				label: node.blockId,
				children,
			};
			return result as GroupNode;
		}

		// ref에서 해당 블록의 createJson 함수 호출 (일반 블록만)
		if (childRef.current && childRef.current[node.blockId]) {
			const refResult = childRef.current[node.blockId]();
			return refResult;
		}

		return null;
	};

	const handleCreateStrategy = () => {
		if (!childRef.current) {
			return;
		}

		if (!strategyNameRef.current?.value) {
			toast.error('전략 이름을 입력해주세요');
			return;
		}

		// 루트 노드(인덱스 0)의 자식들을 처리해서 트리 구조 생성
		const rootNode = buildNodeFromTree(0);

		const data: StrategyTemplate = {
			strategy_name: strategyNameRef.current.value,
			version: 1,
			meta: {
				universe: [selectedStock],
				enabled: true,
			},
		};

		if (strategyType === 'BUY') {
			// Buy 블록의 데이터 생성
			if (childRef.current?.buy) {
				const buyData = childRef.current.buy() as any;
				data.buy = {
					orderQuantity: buyData.orderQuantity || 0,
					node: rootNode as any,
				};
			} else {
				data.buy = {
					orderQuantity: 0,
					node: rootNode as any,
				};
			}
		} else {
			// Sell 블록의 데이터 생성
			if (childRef.current?.sell) {
				const sellData = childRef.current.sell() as any;
				data.sell = {
					orderQuantity: sellData.orderQuantity || 0,
					node: rootNode as any,
				};
			} else {
				data.sell = {
					orderQuantity: 0,
					node: rootNode as any,
				};
			}
		}
		createStrategy(data);
	};
	return (
		<Context.Provider
			value={{
				strategyNameRef: strategyNameRef,
				ref: childRef,
				currentStep,
				strategyType,
				selectedStock,
				setSelectedStock,
				setStrategyType,
				handleNext,
				handlePrev,
				handleCreateStrategy,
				selectedTemplate,
				treeState,
				handleChangeTreeState: setTreeState,
				handleSelectTemplate,
			}}
		>
			{children}
			{isPending && <FullScreenLoading message="전략을 생성하고 있습니다..." />}
		</Context.Provider>
	);
};
