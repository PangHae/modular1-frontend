import { FC } from 'react';

import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import { getStrategyDetailById } from '@/services/strategies';

import StrategyDetailClient from './StrategyDetail.client';

interface Props {
	params: Promise<{ strategyId: number }>;
}

const StrategyDetail: FC<Props> = async ({ params }) => {
	const { strategyId } = await params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['strategyDetail', strategyId],
		queryFn: () => getStrategyDetailById(strategyId),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<StrategyDetailClient strategyId={strategyId} />
		</HydrationBoundary>
	);
};

export default StrategyDetail;
