import { Stock } from './stock';

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
}

export interface StrategyMetaData {
	universe: string[];
	enabled: boolean;
}

export interface StrategyTemplate {
	id: string;
	strategyName: string;
	version: number;
	strategyId: number;
	ownerId: string;
	meta: StrategyMetaData;
	sell: Node | null;
	buy: Node | null;
	createdAt: string;
	updatedAt: string;
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
