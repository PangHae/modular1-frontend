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
	getAccountTransactions,
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
		queryClient.prefetchInfiniteQuery({
			queryKey: ['accounts', 'transactions'],
			queryFn: ({ pageParam }) => getAccountTransactions(pageParam, 10),
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.data.pageInfo.currentPage + 1,
			pages: 1,
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardClient />
		</HydrationBoundary>
	);
};

export default Dashboard;
