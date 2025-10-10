import {
	Accounts,
	AccountStockProfitRatePerStock,
	AccountStocks,
	StockRankingItem,
	Transactions,
} from '@/@types/accounts';
import { Response } from '@/@types/service';
import { StockHolding } from '@/@types/stock';
import { ProfitDataSeries } from '@/@types/strategy';

const ACCOUNTS_API_URL = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/accounts`;

export const getAccountProfitRate = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/profit-rate`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<{ profitSeries: ProfitDataSeries }> =
			await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};

export const getAccountProfitRateRanking = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/profit-rate/ranking`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<Accounts<StockRankingItem>> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};

export const getAccountTransactions = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/transactions`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<Accounts<Transactions>> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};

export const getAccountStocks = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/stocks`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<AccountStocks<StockHolding>> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};

export const getAccountStockProfitRateByStockId = async (stockId: string) => {
	try {
		const response = await fetch(
			`${ACCOUNTS_API_URL}/stocks/${stockId}/profit-rate`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw response;
		}

		const res: Response<AccountStockProfitRatePerStock> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};
