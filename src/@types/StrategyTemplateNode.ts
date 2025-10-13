export type PriceType = 'high' | 'low' | 'close';
export type TradeMetricType = 'CUMULATIVE_VOLUME' | 'CUMULATIVE_AMOUNT';
export type ExecutionType = 'TRADE_VOLUME';
export type ChangeRateType = 'change_rate';
export type TimeframeType = 'tick' | '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
export type EMAPeriodType = '5' | '20' | '60' | '120';
export type DirectionType = 'UP' | 'DOWN';
export type ComparisonType = '>' | '<' | '>=' | '<=' | '==' | '!=';
export type RSIPeriodType = '7' | '14' | '21';
export type BollingerBandBaseLineType = 'upper' | 'lower';

export interface BlockProps {
	ref: React.RefObject<{ [key: string]: () => Node } | null>;
}

// 공통 필드
export interface BaseNode {
	type: string;
	label?: string;
}

// === GROUP 노드 ===
export interface GroupNode extends BaseNode {
	type: 'GROUP';
	logic: 'ALL' | 'ANY';
	children: Node[];
}

// === COMPARE 노드 ===
export interface CompareNode extends BaseNode {
	type: 'COMPARE';
	operator: ComparisonType;
	left: Operand;
	right: Operand;
}

// === CROSS 노드 ===
export interface CrossNode extends BaseNode {
	type: 'CROSS';
	direction: DirectionType;
	left: Operand;
	right: Operand;
}

// === HOLD 노드 ===
export interface HoldNode extends BaseNode {
	type: 'HOLD';
	condition: Node; // 내부 조건 노드
	period: string; // 예: "15m", "1h"
}

// === 가능한 피연산자 ===
export type Operand =
	| PriceOperand
	| IndicatorOperand
	| LevelOperand
	| ProfitLossOperand
	| ConstantOperand;

// === CONSTANT ===
export interface ConstantOperand {
	kind: 'CONSTANT';
	constant: { value: number; unit?: string };
}

// === PRICE ===
export interface PriceOperand {
	kind: 'PRICE';
	field: PriceType | TradeMetricType | ExecutionType | ChangeRateType;
	timeframe: string;
}

// === INDICATOR ===
export interface IndicatorOperand {
	kind: 'INDICATOR';
	name: string; // "EMA", "BOLLINGER_BANDS", "MACD" 등
	args?: Record<string, any>;
	subfield?: string; // upper, lower, signal 등
	timeframe: string;
}

// === LEVEL ===
export interface LevelOperand {
	kind: 'LEVEL';
	value: number;
}

// === PROFIT/LOSS ===
export interface ProfitLossOperand {
	kind: 'PROFIT_AND_LOSS';
	field: 'profit' | 'loss' | 'pnl';
	timeframe?: string;
}

// === 최종 Node 타입 (Union)
export type Node = GroupNode | CompareNode | CrossNode | HoldNode;
