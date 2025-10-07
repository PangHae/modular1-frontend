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

		const res: Response<{ items: StrategySummary[] }> = await response.json();

		if (!response.ok) {
			throw res;
		}

		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getStrategyDetailById = async (strategyId: number) => {
	try {
		const response = await fetch(`${STRATEGIES_API_URL}/${strategyId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const res: Response<StrategyDetail> = await response.json();

		if (!response.ok) {
			throw res;
		}

		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
