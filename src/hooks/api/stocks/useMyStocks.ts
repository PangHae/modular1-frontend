import { useQuery } from '@tanstack/react-query';

import { getMyStocks } from '@/services/stocks';

export const useMyStocks = () => {
	return useQuery({
		queryKey: ['stocks', 'my'],
		queryFn: getMyStocks,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
