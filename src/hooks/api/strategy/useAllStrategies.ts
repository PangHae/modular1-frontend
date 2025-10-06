import { useQuery } from '@tanstack/react-query';

import { getStrategies } from '@/services/strategies';

export const useAllStrategies = () => {
	return useQuery({
		queryKey: ['strategies'],
		queryFn: getStrategies,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
