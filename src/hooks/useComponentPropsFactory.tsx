import {
	CompareNode,
	ConstantOperand,
	CrossNode,
	IndicatorOperand,
	LevelOperand,
	PriceOperand,
	GroupNode,
	Node,
} from '@/@types/StrategyTemplateNode';

interface ComponentPropsFactory {
	getProps: (node: CompareNode | CrossNode) => Record<string, any>;
}

interface GroupComponentPropsFactory {
	getProps: (node: GroupNode) => Record<string, any>;
}

// 컴포넌트별 props 팩토리 함수들
export const componentPropsFactories: Record<string, ComponentPropsFactory> = {
	// Exit 컴포넌트들
	exitWithProfit: {
		getProps: (node): Record<string, any> => ({
			ref: { current: {} },
			initialValue: (node.right as ConstantOperand).constant.value,
		}),
	},

	exitWithLoss: {
		getProps: (node) => ({
			ref: { current: {} },
			// ExitWithLoss 특화 props
			initialValue: (node.right as ConstantOperand).constant.value,
		}),
	},

	// EMA 관련 컴포넌트들
	emaCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// EMA 특화 props
			initialTimeframe: (node.left as PriceOperand).timeframe,
			initialDirection: (node as CrossNode).direction,
			initialRightValue: (
				node.right as IndicatorOperand
			).args?.period.toString(),
		}),
	},

	emaCross: {
		getProps: (node) => ({
			ref: { current: {} },
			// EMA Cross 특화 props
			initialLeftEMA: (node.left as IndicatorOperand).args?.period.toString(),
			initialRightEMA: (node.right as IndicatorOperand).args?.period.toString(),
		}),
	},

	// MACD 관련 컴포넌트들
	macdCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// MACD 특화 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialRightValue: (node as CompareNode).operator,
		}),
	},

	macdCross: {
		getProps: (node) => ({
			ref: { current: {} },
			// MACD Cross 특화 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialDirection: (node as CrossNode).direction,
		}),
	},

	// RSI 관련 컴포넌트들
	rsiCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// RSI 특화 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialRightValue: (
				node.left as IndicatorOperand
			).args!.period.toString(),
			initialRightComparison: (node as CompareNode).operator,
			initialRSICompareValue: (node.right as ConstantOperand).constant.value,
		}),
	},

	rsiCross: {
		getProps: (node) => ({
			ref: { current: {} },
			// RSI Cross 특화 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialRightValue: (
				node.left as IndicatorOperand
			).args!.period.toString(),
			initialRightComparison: (node as CrossNode).direction,
			initialRSICrossValue: (node.right as ConstantOperand).constant.value,
		}),
	},

	// Price 관련 컴포넌트
	price: {
		getProps: (node) => ({
			ref: { current: {} },
			// Price 특화 props
			initialValueType:
				(node.right as ConstantOperand).kind === 'CONSTANT'
					? 'constant'
					: 'reference',
			initialComparison: (node as CompareNode).operator,
			initialTimeframe: (node.left as PriceOperand).timeframe,
			initialPriceType: (node.left as PriceOperand).field,
			initialPriceValue: (node.right as ConstantOperand)?.constant.value || '',
		}),
	},

	// Execution 관련 컴포넌트
	execution: {
		getProps: (node) => ({
			ref: { current: {} },
			// Execution 특화 props
			initialValueType:
				(node.right as ConstantOperand).kind === 'CONSTANT'
					? 'constant'
					: 'reference',
			initialValue: (node.right as ConstantOperand)?.constant.value || '',
			initialComparison: (node as CompareNode).operator,
		}),
	},

	// Bollinger Bands 관련
	bandAbsoluteCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// Bollinger Bands 특화 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialRightComparison: (node as CompareNode).operator,
			initialBandAbsoluteCompareValue:
				(node.right as ConstantOperand).constant.value || '',
		}),
	},

	bandRelativeCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// Bollinger Bands 상대 비교 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialRightComparison: (node as CompareNode).operator,
		}),
	},

	bandCross: {
		getProps: (node) => ({
			ref: { current: {} },
			// Bollinger Bands Cross 특화 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialBaseLine: (node.right as IndicatorOperand).subfield,
			initialDirection: (node as CrossNode).direction,
		}),
	},

	// Volume 관련
	rvolCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// RVOL 특화 props
			initialTimeframe: (node.left as IndicatorOperand).timeframe,
			initialRightValue: (
				node.right as ConstantOperand
			).constant.value.toString(),
			initialRightComparison: (node as CompareNode).operator,
		}),
	},

	vwapCross: {
		getProps: (node) => ({
			ref: { current: {} },
			// VWAP 특화 props
			initialTimeframe: (node.left as PriceOperand).timeframe,
			initialDirection: (node as CrossNode).direction,
		}),
	},

	// ChangeRate 관련
	changeRate: {
		getProps: (node) => ({
			ref: { current: {} },
			// ChangeRate 특화 props
			initialValue: (node.right as ConstantOperand).constant.value,
			initialComparison: (node as CompareNode).operator,
		}),
	},

	// Level 관련 컴포넌트들
	openingRangeCross: {
		getProps: (node) => ({
			ref: { current: {} },
			// Opening Range 특화 props
			initialSubfield: (node.right as IndicatorOperand).subfield,
			initialDirection: (node as CrossNode).direction,
		}),
	},

	previousHighLowCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// 전일 고저 비교 특화 props
			initialTimeframe: (node.left as PriceOperand).timeframe,
			initialRightValue: (node.right as LevelOperand).level_name,
			initialRightComparison: (node as CompareNode).operator,
		}),
	},

	yearHighLowCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// 52주 고저 비교 특화 props
			initialTimeframe: (node.left as PriceOperand).timeframe,
			initialRightValue: (node.right as LevelOperand).level_name,
			initialRightComparison: (node as CompareNode).operator,
		}),
	},

	tradeMetricCompare: {
		getProps: (node) => ({
			ref: { current: {} },
			// 거래 지표 특화 props
			initialValueType: (node.left as PriceOperand).field,
			initialComparison: (node as CompareNode).operator,
			initialVolumeValueType:
				(node.right as IndicatorOperand).name === 'SMA'
					? 'average'
					: 'reference',
		}),
	},
};

// 그룹 컴포넌트용 팩토리
export const groupComponentPropsFactories: Record<
	string,
	GroupComponentPropsFactory
> = {
	all: {
		getProps: (node) => ({
			ref: { current: {} },
			childrenNodes: node.children,
		}),
	},

	any: {
		getProps: (node) => ({
			ref: { current: {} },
			childrenNodes: node.children,
		}),
	},
};

// 컴포넌트별 props를 가져오는 함수
export const getComponentProps = (node: Node, label: string) => {
	// 그룹 컴포넌트인 경우
	if (label === 'all' || label === 'any') {
		const factory = groupComponentPropsFactories[label];
		return factory.getProps(node as GroupNode);
	}

	// 기존 컴포넌트들
	const factory = componentPropsFactories[label];
	if (!factory) {
		return { ref: { current: {} } };
	}
	return factory.getProps(node as CompareNode | CrossNode);
};
