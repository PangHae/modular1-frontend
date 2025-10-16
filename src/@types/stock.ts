export interface Stock {
	stockCode: string;
	image: string;
	stockName: string;
}

export interface StockHolding {
	stockCode: string;
	stockName: string;
	marketValue: number;
	qty: number;
	weight: number; // 비중
}

export interface StockProfitRate {
	stockCode: string;
	stockName: string;
	qty: number;
	avgBuyPrice: number;
	amount: number;
	profitRate: number;
}
