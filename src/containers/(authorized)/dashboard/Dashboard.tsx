import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import { getAccountProfitRate } from '@/services/accounts';

import DashboardClient from './Dashboard.client';

const Dashboard = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['accounts', 'profit-rate', 'series'],
		queryFn: getAccountProfitRate,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardClient />
		</HydrationBoundary>
	);
};

export default Dashboard;
