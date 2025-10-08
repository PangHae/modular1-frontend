import { ExecutionList } from '@/@types/execution';
import { Response } from '@/@types/service';

const EXECUTION_API_URL = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/trade`;

export const getExecutionById = async (executionId: number) => {
	try {
		const response = await fetch(
			`${EXECUTION_API_URL}/execution/${executionId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const res: Response<ExecutionList> = await response.json();

		if (!response.ok) {
			throw res;
		}

		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
