import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import { CreateStrategyProvider } from '@/components/providers/CreateStrategyProvider';
import { getStocks } from '@/services/stocks';

import CreateStrategyClient from './CreateStrategy.client';

const CreateStrategy = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['stocks'],
		queryFn: getStocks,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CreateStrategyProvider>
				<CreateStrategyClient />
			</CreateStrategyProvider>
		</HydrationBoundary>
	);
};

export default CreateStrategy;
