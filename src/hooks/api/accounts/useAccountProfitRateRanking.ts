import { useQuery } from '@tanstack/react-query';

import { getAccountProfitRateRanking } from '@/services/accounts';

export const useAccountProfitRateRanking = () => {
	return useQuery({
		queryKey: ['accounts', 'profit-rate', 'ranking'],
		queryFn: getAccountProfitRateRanking,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
