import { Stock } from './stock';
import { GroupNode } from './StrategyTemplateNode';

export interface StrategySummary {
	id: number;
	stockInfo: Stock;
	strategyName: string;
	activatedStatus: 'ACTIVATED' | 'PENDING';
	profitRate: number;
	profitAmount: number;
	avgPrice: number;
	currentPrice: number;
}

export interface StrategyDetail {
	stockInfo: Stock;
	strategyInfo: {
		id: number;
		strategyName: string;
	};
	strategyProfit: {
		allProfit: number;
		weekProfit: number;
	};
	strategyTemplate: StrategyTemplate;
	strategySummary: StrategyAiSummary;
	profitSeries: ProfitDataSeries;
	code: string;
}

export interface StrategyMetaData {
	universe: string[];
	enabled: boolean;
}

export interface StrategyTemplate {
	strategy_name: string;
	version: number;
	meta: StrategyMetaData;
	sell?: { orderQuantity: number; node: GroupNode };
	buy?: { orderQuantity: number; node: GroupNode };
}

export interface StrategyAiSummary {
	summaryOverview: string;
	summaryCondition: string;
	summaryRisk: string;
}

export interface ProfitDataSeries {
	oneMonth: ProfitData[];
	threeMonth: ProfitData[];
	sixMonth: ProfitData[];
	oneYear: ProfitData[];
	all: ProfitData[];
}

export interface ProfitData {
	date: string;
	profit: number;
}

export type ProfitDataKey = keyof ProfitDataSeries;

export interface ArrayTreeNode {
	blockId: string;
	index: number;
}

export interface CreateStrategyRequest {
	id: string;
	strategyName: string;
	version: number;
	meta: StrategyMetaData;
	strategyId: number;
	sell?: { node: GroupNode };
	buy?: { node: GroupNode };
	createdAt: string;
	updatedAt: string;
}
