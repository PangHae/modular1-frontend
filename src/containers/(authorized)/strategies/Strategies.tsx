import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import { getStrategies } from '@/services/strategies';

import StrategiesClient from './Strategies.client';

const Strategies = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['strategies'],
		queryFn: getStrategies,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<StrategiesClient />
		</HydrationBoundary>
	);
};

export default Strategies;
