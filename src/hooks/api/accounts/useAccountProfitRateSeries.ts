import { useQuery } from '@tanstack/react-query';

import { getAccountProfitRate } from '@/services/accounts';

export const useAccountProfitRateSeries = () => {
	return useQuery({
		queryKey: ['accounts', 'profit-rate', 'series'],
		queryFn: getAccountProfitRate,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
