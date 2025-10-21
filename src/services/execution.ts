import { ExecutionList } from '@/@types/execution';
import { Response } from '@/@types/service';

const EXECUTION_API_URL = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/trade`;

export const getExecutionById = async (
	executionId: number,
	page: number,
	size: number
) => {
	try {
		const response = await fetch(
			`${EXECUTION_API_URL}/execution/${executionId}?page=${page}&size=${size}`,
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

		const res: Response<ExecutionList> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.error(errorRes);
		throw error;
	}
};
