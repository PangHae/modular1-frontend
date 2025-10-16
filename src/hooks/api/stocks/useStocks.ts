import { useQuery } from '@tanstack/react-query';

import { getStocks } from '@/services/stocks';

export const useStocks = () => {
	return useQuery({
		queryKey: ['stocks'],
		queryFn: getStocks,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
