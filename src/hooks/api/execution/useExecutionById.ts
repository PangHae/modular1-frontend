import { useInfiniteQuery } from '@tanstack/react-query';

import { getExecutionById } from '@/services/execution';

export const useExecutionById = (executionId: number, size: number) => {
	return useInfiniteQuery({
		queryKey: ['execution', executionId],
		queryFn: ({ pageParam }) => getExecutionById(executionId, pageParam, size),
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
