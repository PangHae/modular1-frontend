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

import { ArrayTreeNode, StrategyTemplate } from '@/@types/strategy';
import { GroupNode, Node } from '@/@types/StrategyTemplateNode';
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
} | null>(null);

export const CreateStrategyProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const strategyNameRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutate: createStrategy } = useCreateStrategy({
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

		// 일반 블록인 경우 - ref에서 데이터를 가져오지 못한 경우 기본 구조
		return {
			label: node.blockId,
			type: 'COMPARE',
			operator: 'GT' as any,
			left: {
				kind: 'PRICE',
				field: 'close',
				timeframe: '1d',
			},
			right: {
				kind: 'PRICE',
				field: 'close',
				timeframe: '1d',
			},
		};
	};

	const handleCreateStrategy = () => {
		if (!childRef.current) {
			return;
		}

		if (!strategyNameRef.current) {
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
				treeState,
				handleChangeTreeState: setTreeState,
			}}
		>
			{children}
		</Context.Provider>
	);
};
