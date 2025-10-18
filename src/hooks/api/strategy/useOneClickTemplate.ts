import { useQuery } from '@tanstack/react-query';

import { getOneClickTemplates } from '@/services/strategies';

const useOneClickTemplate = () => {
	return useQuery({
		queryKey: ['strategies', 'templates'],
		queryFn: getOneClickTemplates,
		retry: 2,
		retryDelay: (failureCount) => 1000 * 2 ** failureCount,
	});
};

export default useOneClickTemplate;
