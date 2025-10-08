import { useQuery } from '@tanstack/react-query';

import { getExecutionById } from '@/services/execution';

export const useExecutionById = (executionId: number) => {
	return useQuery({
		queryKey: ['execution', executionId],
		queryFn: () => getExecutionById(executionId),
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
