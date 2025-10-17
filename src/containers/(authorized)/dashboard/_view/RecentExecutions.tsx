'use client';

import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import TradeExecutionItem from '@/components/common/TradeExecutionItem';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAccountTransactions } from '@/hooks/api/accounts/useAccountTransactions';

const RecentExecutions = () => {
	const { ref, inView } = useInView();
	const { data, fetchNextPage, hasNextPage } = useAccountTransactions(10);

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	return (
		<Card className="flex-1 flex flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>최근 체결 내역</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
				{!data && (
					<div className="flex items-center justify-center h-64">
						<div className="text-lg text-gray-500">No data</div>
					</div>
				)}
				{data?.pages.map((page) =>
					page.data.items.map((item) => (
						<TradeExecutionItem
							key={item.transactionId}
							type={item.side}
							stockName={item.stockName}
							strategyName={item.strategyInfo.strategyName}
							dateTime={item.executionTime}
							amount={item.price * item.qty}
						/>
					))
				)}
				<div ref={ref} />
			</CardContent>
		</Card>
	);
};

export default RecentExecutions;
