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

		if (!response.ok) {
			throw response;
		}

		const res: Response<ExecutionList> = await response.json();

		return res.data;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw error;
	}
};
