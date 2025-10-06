import { Response } from '@/@types/service';
import { Strategy } from '@/@types/strategy';

const STRATEGIES_API_URL = `${process.env.API_SERVICE_URL}/api/v1/strategies`;

export const getStrategies = async () => {
	try {
		const response = await fetch(`${STRATEGIES_API_URL}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const res: Response<{ items: Strategy[] }> = await response.json();

		if (!response.ok) {
			throw res;
		}

		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
