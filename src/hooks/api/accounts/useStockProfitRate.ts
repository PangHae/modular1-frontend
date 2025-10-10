import { useQuery } from '@tanstack/react-query';

import { getAccountStockProfitRate } from '@/services/accounts';

export const useStockProfitRate = () => {
	return useQuery({
		queryKey: ['accounts', 'stocks', 'profit-rate'],
		queryFn: getAccountStockProfitRate,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
