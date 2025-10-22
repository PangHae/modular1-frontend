import {
	Accounts,
	AccountStockProfitRate,
	AccountStocks,
	PageableAccounts,
	StockRankingItem,
	Transactions,
} from '@/@types/accounts';
import { Response } from '@/@types/service';
import { StockHolding } from '@/@types/stock';
import { ProfitDataSeries } from '@/@types/strategy';

const ACCOUNTS_API_URL = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/accounts`;

export const getAccountInfo = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}`, {
			headers: {
				'Content-Type': 'application/json',
				credentials: 'include',
			},
			next: {
				revalidate: 60,
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<{
			memberName: string;
			accountNumber: string;
			orderPossibleCash: string;
		}> = await response.json();

		return res.data;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.error(errorRes);
		throw errorRes;
	}
};

export const getAccountProfitRate = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/profit-rate`, {
			headers: {
				'Content-Type': 'application/json',
				credentials: 'include',
			},
			next: {
				revalidate: 60,
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
		console.error(errorRes);
		throw errorRes;
	}
};

export const getAccountProfitRateRanking = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/profit-rate/ranking`, {
			headers: {
				'Content-Type': 'application/json',
				credentials: 'include',
			},
			next: {
				revalidate: 60,
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<Accounts<StockRankingItem>> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.error(errorRes);
		throw errorRes;
	}
};

export const getAccountTransactions = async (page: number, size: number) => {
	try {
		const response = await fetch(
			`${ACCOUNTS_API_URL}/transactions?page=${page}&size=${size}`,
			{
				headers: {
					'Content-Type': 'application/json',
					credentials: 'include',
				},
			}
		);

		if (!response.ok) {
			throw response;
		}

		const res: Response<PageableAccounts<Transactions>> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.error(errorRes);
		throw errorRes;
	}
};

export const getAccountHoldingStocks = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/stocks`, {
			headers: {
				'Content-Type': 'application/json',
				credentials: 'include',
			},
			next: {
				revalidate: 60,
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<AccountStocks<StockHolding>> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.error(errorRes);
		throw errorRes;
	}
};

export const getAccountStockProfitRate = async () => {
	try {
		const response = await fetch(`${ACCOUNTS_API_URL}/stocks/profit-rate`, {
			headers: {
				'Content-Type': 'application/json',
				credentials: 'include',
			},
			next: {
				revalidate: 60,
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<AccountStockProfitRate> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.error(errorRes);
		throw errorRes;
	}
};
