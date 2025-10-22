import { Pageable } from './service';

export interface Execution {
	id: number;
	tradeExecutionType: 'BUY' | 'SELL';
	tradeExecutionQuantity: number;
	tradeExecutionPrice: number;
	executionTime: string;
}

export interface ExecutionList {
	tradeExecutionCount: number;
	pageInfo: Pageable;
	tradeExecutions: Execution[];
}
