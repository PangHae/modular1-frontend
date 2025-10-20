import { useQuery } from '@tanstack/react-query';

import { getAccountInfo } from '@/services/accounts';

export const useAccountInfo = () => {
	return useQuery({
		queryKey: ['account', 'info'],
		queryFn: getAccountInfo,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};
