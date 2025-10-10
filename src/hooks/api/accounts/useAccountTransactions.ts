import { useInfiniteQuery } from '@tanstack/react-query';

import { getAccountTransactions } from '@/services/accounts';

export const useAccountTransactions = (size: number) => {
	return useInfiniteQuery({
		queryKey: ['accounts', 'transactions'],
		queryFn: ({ pageParam }) => getAccountTransactions(pageParam, size),
		getNextPageParam: (lastPage) => {
			const nextPage = lastPage.data.pageInfo.currentPage + 1;
			if (nextPage === lastPage.data.pageInfo.totalPages) {
				return undefined;
			}
			return nextPage;
		},
		initialPageParam: 0,
	});
};
