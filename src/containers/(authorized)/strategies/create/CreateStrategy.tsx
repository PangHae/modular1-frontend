import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import { CreateStrategyProvider } from '@/components/providers/CreateStrategyProvider';
import { getMyStocks, getStocks } from '@/services/stocks';
import { getOneClickTemplates } from '@/services/strategies';

import CreateStrategyClient from './CreateStrategy.client';

const CreateStrategy = async () => {
	const queryClient = new QueryClient();

	Promise.all([
		queryClient.prefetchQuery({
			queryKey: ['stocks'],
			queryFn: getStocks,
		}),
		queryClient.prefetchQuery({
			queryKey: ['stocks', 'my'],
			queryFn: getMyStocks,
		}),
		queryClient.prefetchQuery({
			queryKey: ['strategies', 'templates'],
			queryFn: getOneClickTemplates,
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CreateStrategyProvider>
				<CreateStrategyClient />
			</CreateStrategyProvider>
		</HydrationBoundary>
	);
};

export default CreateStrategy;
