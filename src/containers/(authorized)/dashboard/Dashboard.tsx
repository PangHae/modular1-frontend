import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import {
	getAccountHoldingStocks,
	getAccountProfitRate,
	getAccountProfitRateRanking,
	getAccountStockProfitRate,
} from '@/services/accounts';

import DashboardClient from './Dashboard.client';

const Dashboard = async () => {
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ['accounts', 'profit-rate', 'series'],
			queryFn: getAccountProfitRate,
		}),
		queryClient.prefetchQuery({
			queryKey: ['accounts', 'profit-rate', 'ranking'],
			queryFn: getAccountProfitRateRanking,
		}),
		queryClient.prefetchQuery({
			queryKey: ['accounts', 'holding-stocks'],
			queryFn: getAccountHoldingStocks,
		}),
		queryClient.prefetchQuery({
			queryKey: ['accounts', 'stocks', 'profit-rate'],
			queryFn: getAccountStockProfitRate,
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardClient />
		</HydrationBoundary>
	);
};

export default Dashboard;
