import { Response } from '@/@types/service';
import { StrategyDetail, StrategySummary } from '@/@types/strategy';

const STRATEGIES_API_URL = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/strategies`;

export const getStrategies = async () => {
	try {
		const response = await fetch(`${STRATEGIES_API_URL}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<{ items: StrategySummary[] }> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};

export const getStrategyDetailById = async (strategyId: number) => {
	try {
		const response = await fetch(`${STRATEGIES_API_URL}/${strategyId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<StrategyDetail> = await response.json();

		return res.data;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw error;
	}
};

export const deleteStrategyById = async (strategyId: number) => {
	try {
		const response = await fetch(`${STRATEGIES_API_URL}/${strategyId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<null> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};
