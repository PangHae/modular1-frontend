import { Response } from '@/@types/service';
import { Stock } from '@/@types/stock';

const STOCKS_API_URL = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/stocks`;

export const getStocks = async () => {
	try {
		const response = await fetch(`${STOCKS_API_URL}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<{ stocks: Stock[] }> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};

export const getMyStocks = async () => {
	try {
		const response = await fetch(`${STOCKS_API_URL}/my-stocks`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<{ stocks: Stock[] }> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};
