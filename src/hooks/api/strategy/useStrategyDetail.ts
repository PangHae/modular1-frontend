import { useQuery } from '@tanstack/react-query';

import { getStrategyDetailById } from '@/services/strategies';

export const useStrategyDetail = (strategyId: number) => {
	return useQuery({
		queryKey: ['strategyDetail', strategyId],
		queryFn: () => getStrategyDetailById(strategyId),
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
		enabled: strategyId !== -1,
	});
};
