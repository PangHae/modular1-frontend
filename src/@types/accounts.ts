import { StockProfitRate } from './stock';

export interface Accounts<T> {
	accountId: string;
	items: T[];
}

export interface StockRankingItem {
	rank: number;
	stockCode: string;
	stockName: string;
	qty: number;
	marketValue: number;
	costBasis: number;
	pnl: number; // profit and loss
	profitRate: number;
}

export interface Transactions {
	transactionId: string;
	executionTime: string;
	side: 'BUY' | 'SELL';
	stockCode: string;
	stockName: string;
	strategyInfo: {
		id: string;
		strategyName: string;
	};
	qty: number;
	price: number;
}

export interface AccountStocks<T> extends Accounts<T> {
	totalMarketValue: number;
}

export interface AccountStockProfitRatePerStock {
	accountId: string;
	asOf: string;
	stockData: StockProfitRate[];
}
