import { Stock } from './stock';

export interface Strategy {
	id: number;
	stockInfo: Stock;
	strategyName: string;
	activatedStatus: 'ACTIVATED' | 'PENDING';
	profitRate: number;
	profitAmount: number;
	avgPrice: number;
	currentPrice: number;
}
