import { useQuery } from '@tanstack/react-query';

import { getAccountHoldingStocks } from '@/services/accounts';

export const useHoldingStocks = () => {
	return useQuery({
		queryKey: ['accounts', 'holding-stocks'],
		queryFn: getAccountHoldingStocks,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
